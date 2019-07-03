import {Apis, Login, ChainStore, ConnectionManager} from 'peerplaysjs-lib';
import Immutable from 'immutable';
import log from 'loglevel';

const MAX_RECURSION_ATTEMPTS = 10;
const endpointsGist = 'https://api.github.com/gists/024a306a5dc41fd56bd8656c96d73fd0';
// const witness_object_type  = parseInt(ChainTypes.object_type.witness, 10);
// const witness_prefix = '1.' + witness_object_type + '.';

class PeerplaysService {
  constructor() {
    // Default callback so we don't have to to validity checking everytime we call the callback.
    this.connectionStatusCallback = () => {};

    this.blockchainUrlIndex = 0;
    this.sortedList = [];
    this.peerplaysURLs = [];
  }

  async getActiveWitnesses() {
    const results = await Promise.all([
      this.getObject('2.0.0')
    ]);
    const object200 = results[0];
    const activeWitnesses = object200.get('active_witnesses');
    let list = [];
    // Get the witness object from the blockchain by id.
    let promise = activeWitnesses.map((witnessId) => {
      return this.getObject(witnessId).then((res) => {
        console.log(res.toJS());
      });
    });
    await Promise.all(promise);
    return {
      activeWitnessObjects: Immutable.List(list)
    };
  }

  async getActiveWitnessEndpoints() {
    // return this.getActiveWitnesses();
    // TODO: When the blockchain has been modified to provide witness node urls in the witness object, update this and grab their node via blockchain.

    // Grab the endpoints from peerplays-network gist.
    const clean = (values) => {
      let cleanedValues = values;

      for (let i = 0; i < values.length; i++) {
        cleanedValues[i] = cleanedValues[i].trim();
      }

      return cleanedValues;
    };
    
    try {
      const res = await fetch(endpointsGist);
      const data = await res.json();
      let keys = Object.keys(data.files);

      // Loop over the keys, extract the endpoints and convert to an array.
      for (let i_1 = 0; i_1 < keys.length; i_1++) {
        let key = keys[i_1];
        let content = data.files[key].content;
        this.peerplaysURLs = clean(content.replace('const endpoints = [', '')
          .replace('];', '')
          .replace(/'/g, '')
          .split(','));
      }
    } catch (err) {
      return console.log(err);
    }
  }

  /**
   * reconnect to blockchain in case of disconnect
   *
   * @memberof PeerplaysService
   */
  reconnectToBlockchain() {
    // Increment the index for the next connection attempt
    this.blockchainUrlIndex++;
    const connectionString = this.sortedList[this.blockchainUrlIndex];

    return Apis.instance(connectionString, true).init_promise.then(() => {
      console.log(`%cConnected to: ${connectionString}.`,
        'background: #222 color: green; font-size: large');
    }).catch(() => {
      console.error(`%cConnection to: ${connectionString} failed.`,
        'background: #222; color: red; font-size: large');

      return Promise.reject();
    });
  }

  /**
   * Open websocket connection to blockchain
   *
   * @param {function} connectionStatusCallback
   * @returns A promise that resolves when the connection is establised.
   * @memberof ConnectionService
   */
  connectToBlockchain(connectionStatusCallback) {
    // Set connection status callback
    this.connectionStatusCallback = connectionStatusCallback;

    this.getActiveWitnessEndpoints().then(() => {
      let wsConnectionManager = new ConnectionManager({urls: this.peerplaysURLs});
        
      if (this.sortedList.length > 1) {
        return this.reconnectToBlockchain();
      } else {
        return wsConnectionManager.sortNodesByLatency().then((list) => {
          console.log(list);
          return list;
        }).then((list) => {
          this.sortedList = list;
          const connectionString = list[this.blockchainUrlIndex];

          return Apis.instance(connectionString, true)
            .init_promise.then((res) => {
              this.connectionStatusCallback(false);
              // Print out which blockchain we are connecting to
              log.debug('Connected to:', res[0] ? res[0].network_name : 'Undefined Blockchain');

              // Init the chainstore after we connect so that we can request object data from the blockchain.
              ChainStore.init().then(() => {
              }).catch((err) => {
                console.error(err);
              });
            })
            .catch(() => {
            // Close residue connection to blockchain
              this.closeConnectionToBlockchain();
            });
        });
      }
    });
  }

  /**
   * Close connection to blockchain and remove any related callbacks
   *
   * @memberof ConnectionService
   */
  closeConnectionToBlockchain() {
    // Close connection
    Apis.close();
    console.log('Disconnected from blockchain.');

    // Reset the index if we've gone past the end.
    if (this.blockchainUrlIndex >= this.peerplaysURLs.length) {
      this.blockchainUrlIndex = 0;
    }
  }

  /**
   * Request data from the peerplays blockchain based on provided parameters required for the various calls.
   *
   * @param {string} apiPluginName
   * @param {string} methodName
   * @param {array} [params=[]]
   * @returns {Immutable.Map} of data retrieved.
   * @memberof PeerplaysService
   */
  callBlockchainApi(apiPluginName, methodName, params = []) {
    let apiPlugin;
    
    if (apiPluginName === 'db_api') {
      apiPlugin = Apis.instance().db_api();

      return apiPlugin
        .exec(methodName, params)
        .then((result) => {
          return Immutable.fromJS(result);
        }).catch((err) => {
          // Intercept and log
          log.error(
            `Error in calling ${apiPluginName}\nMethod: ${methodName}\nParams: ${JSON.stringify(
              params
            )}\nError: `,
            err
          );
          // Return an empty response rather than throwing an error.
          return Immutable.fromJS({});
        });
    }
  }

  /**
   * Call blokchain db api
   * Route every call to blockchain db api through this function, so we can see the logging
   * 
   * @memberof PeerplaysService
   */
  callBlockchainDbApi(methodName, params = []) {
    return this.callBlockchainApi('db_api', methodName, params);
  }

  getObject(id, force = false, numRecursion = 0) {
    return new Promise((resolve, reject) => {
      if (numRecursion > MAX_RECURSION_ATTEMPTS) {
        console.warn('[APP] MAX_RECURSION_ATTEMPTS Repository.getObject()');
        return resolve(null);
      }

      let object = ChainStore.getObject(id, force);

      if (object === null) {
        return resolve(object);
      }

      if (object) {
        return resolve(object);
      }

      setTimeout(() => {
        this.getObject(id, force, ++numRecursion)
          .then((res) => resolve(res)).catch((err) => reject(err));
      }, 100);
    });
  }

  /**
   * Get the account data from the blockchain for the provided account name or account ID.
   *
   * @param {string} accountNameOrId
   * @returns {Immutable.Map} fullAccount: contains user data retrieved from blockchain if it exists.
   * @memberof PeerplaysService
   */
  getFullAccount(accountNameOrId) {
    return this.callBlockchainDbApi('get_full_accounts', [[accountNameOrId], true]).then(
      (result) => {
        const fullAccount = result.getIn([0, 1]);
        // Return the full account
        return fullAccount;
      }
    );
  }

  /**
   * Using provided paramters, retrieves key auths from blockchain account data passed in and then checks for a match with form generated keys with aid from peerplaysjs-lib against blockchain keys.
   *
   * @param {Immutable.Map} fullAccount: received from @AuthActions processLogin
   * @param {string} password: received from @AuthActions processLogin
   * @returns {boolean}: Represents account as true: is authenticated or false: is not authenticated
   * @memberof PeerplaysService
   */
  authAccount(fullAccount, password) {
    let isAuth = false;

    // If missing form data, skip processing and early return false authentication.
    if (!fullAccount || !password) {
      return isAuth;
    }

    const accountName = fullAccount.get('name');
    // Auths comes from the account info retrieved from the blockchain.
    const activeKeyAuths = fullAccount.getIn(['active', 'key_auths']);
    const ownerKeyAuths = fullAccount.getIn(['owner', 'key_auths']);
    const auths = {
      active: activeKeyAuths.toJS(),
      owner: ownerKeyAuths.toJS()
    };
    isAuth = Login.checkKeys({accountName, password, auths});
    
    return isAuth;
  }
}

export default new PeerplaysService();