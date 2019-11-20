import {
  Apis,
  Login,
  ChainStore,
  ConnectionManager,
  TransactionBuilder
} from 'peerplaysjs-lib';
import BigNumber from 'bignumber.js';
import {listenChainStore} from './ChainStoreService';
import PeerplaysActions from '../actions/PeerplaysActions';
import ChainStoreHeartbeater from '../utility/PeerplaysUtil/ChainStoreHeartbeater';
import Config from '../utility/Config';
import Immutable from 'immutable';
import log from 'loglevel';
import BlockchainUtils from '../utility/PeerplaysUtil/BlockchainUtils';

const MAX_RECURSION_ATTEMPTS = 10;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const endpointsGist = 'https://api.github.com/gists/024a306a5dc41fd56bd8656c96d73fd0';

/**
 * Contains functions required to init, connect, reconnect, and obtain data from the Peerplays blockchain.
 *
 * @class PeerplaysService
 */
class PeerplaysService {
  constructor() {
    this.store = null;

    this.connectionStatusCallback = () => {};

    this.blockchainUrlIndex = 0;
    this.sortedList = [];
    this.peerplaysURLs = [];
    this.balancePrecision = 0;
    this.blockInterval = 0;
    this.asset = {};
  }

  /**
   * Initializes the connection and sets up a heartbeater.
   *
   * @param {object} store - Redux store.
   * @memberof PeerplaysService
   */
  init(store) {
    const ConnectionCallback = () => {
      this.setDefaultRpcConnectionStatusCallback((value) => {
        switch (value) {
          case 'error':
          case 'open':
            break;
          case 'reconnected':
          case 'closed':
            ChainStore.resetCache();
            this.init(store);
            break;
          // no default
        }
      });
    };

    this.store = store;
    let beater = new ChainStoreHeartbeater();

    beater.setHeartBeatChainStore(() => {
      store.dispatch(PeerplaysActions.setPeerplaysConnected(false));
    });

    ChainStore.setDispatchFrequency(this.blockInterval);//set the frequency of pulling blockchain data
    this.connectToBlockchain(ConnectionCallback, store).then(() => {

      // Init the chainstore after we connect so that we can request object data from
      // the blockchain.
      ChainStore
        .init()
        .then(() => {
          listenChainStore(ChainStore, store);
        })
        .catch((err) => {
          console.error('error: ',err);//TODO: real error handling for production
        });

    }).then(() => {
      // sync with blockchain
      this.syncWithBlockchain().then((synced) => {

        if(synced === false) {
          console.warn('Sync failed: clock desync.');
          this.closeConnectionToBlockchain();
          this.delayedInit();
          return;
        }

        store.dispatch(PeerplaysActions.setPeerplaysConnected(true));
        store.dispatch(PeerplaysActions.setPeerplaysPrecision(this.balancePrecision));
      }).catch(() => {
        //disconnect since we are not synced
        this.closeConnectionToBlockchain();
        this.delayedInit();
      });
    }).catch((error) => {
      // Fail to connect/ sync/ listen to software update, close connection to the blockchain
      console.error('Failed to connect to blockchain', error, (new Error()).stack);
      store.dispatch(PeerplaysActions.setPeerplaysConnected(false));
      this.closeConnectionToBlockchain();
      this.delayedInit();
    });
  }

  delayedInit() {
    setTimeout(() => {
      this.init(this.store);
    },10000);
  }

  /**
   * Obtainis the full account of the user along with the balance.
   *
   * @param {string} accountName - Peerplays account name/id of the user.
   * @memberof PeerplaysService
   */
  getBalance(accountName) {
    this.getFullAccount(accountName).then((account) => {

      if(account) {
        this.store.dispatch(PeerplaysActions.setPeerplaysAccount(account));
        this.store.dispatch(PeerplaysActions.setPeerplaysConnected(true));
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  /**
   * Obtain list of active witnesses or testnet endpoints if in development mode.
   *
   * @returns {Promise} - Resolves promise if succesful, otherwise reject.
   * @memberof PeerplaysService
   */
  async getActiveWitnessEndpoints() {
    const clean = (values) => {
      let cleanedValues = values;

      for (let i = 0; i < values.length; i++) {
        cleanedValues[i] = cleanedValues[i].trim();
      }

      return cleanedValues;
    };

    return new Promise(async(resolve, reject) => {
      try {
        if (!Config.isDev) {
          const res = await fetch(endpointsGist);
          const data = await res.json();
          let keys = Object.keys(data.files);

          // Loop over the keys, extract the endpoints and convert to an array.
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let content = data.files[key].content;
            this.peerplaysURLs = clean(content.replace('const endpoints = [', '').replace('];', '').replace(/'/g, '').split(','));
            resolve();
          }

        } else {
          this.peerplaysURLs = Config.elizabethEndpoints;
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Reconnect to blockchain in case of a disconnect.
   *
   * @returns {Apis.instance}
   * @memberof PeerplaysService
   */
  reconnectToBlockchain() {
    // Increment the index for the next connection attempt
    if(this.sortedList.length > 1) {
      this.blockchainUrlIndex++;
    }

    const connectionString = this.sortedList[this.blockchainUrlIndex];
    return Apis
      .instance(connectionString, true)
      .init_promise
      .then(() => {
        console.info(`%cConnected to: ${connectionString}.`, 'background: #222 color: green; font-size: large');
      })
      .catch(() => {
        console.info(`%cConnection to: ${connectionString} failed.`, 'background: #222; color: red; font-size: large');

        return Promise.reject();
      });
  }

  /**
   * Connecting to Peerplays blockchain and initializing chainstore.
   *
   * @param {Function} connectionStatusCallback - Connection status callback function.
   * @returns {Function} Returns connection status callback function.
   * @memberof PeerplaysService
   */
  connectToBlockchain(connectionStatusCallback) {
    // Set connection status callback
    this.connectionStatusCallback = connectionStatusCallback;

    if (this.sortedList.length > 1) {
      return this.reconnectToBlockchain();
    } else {
      return this.getActiveWitnessEndpoints().then(() => {
        const wsConnectionManager = new ConnectionManager({urls: this.peerplaysURLs});
        return wsConnectionManager;
      }).then((connectionManager) => {
        return connectionManager.sortNodesByLatency();
      }).then((list) => {
        this.sortedList = list;
        const connectionString = list[this.blockchainUrlIndex];
        return Apis.instance(connectionString, true).init_promise.then((res) => {
          this.connectionStatusCallback(true);

          // Print out which blockchain we are connecting to
          log.debug('Connected to:', res[0]
            ? res[0].network_name
            : 'Undefined Blockchain');
        })
          .catch((err) => {
            this.connectionStatusCallback(false);
            console.error('closing blockchain: ', err);
            // Close residue connection to blockchain
            this.closeConnectionToBlockchain();
            return Promise.reject();
          });
      });
    }
  }

  /**
   * Close connection to blockchain and remove any related callbacks.
   *
   * @memberof PeerplaysService
   */
  closeConnectionToBlockchain() {
    // Close connection
    Apis.close();

    // Reset the index if we've gone past the end.
    if (this.blockchainUrlIndex >= this.peerplaysURLs.length) {
      this.blockchainUrlIndex = 0;
    }
  }

  /**
   * Request data from the Peerplays blockchain based on provided parameters required for the various calls.
   *
   * @param {string} apiPluginName - One of the apis that exist: `connect`, `close`, `db_api`, `network_api`, `history_api`, `crypto_api`, `bookie_api`, `setRpcConnectionStatusCallback`.
   * @param {string} methodName - Public methods available on Peerplays blockchain.
   * @param {Array} [params=[]] - Params required for different blockchain methods.
   * @returns {Immutable.Map} Of data retrieved.
   * @memberof PeerplaysService
   */
  callBlockchainApi(apiPluginName, methodName, params = []) {
    let apiPlugin;

    if (apiPluginName === 'db_api') {
      apiPlugin = Apis
        .instance()
        .db_api();

      return apiPlugin
        .exec(methodName, params)
        .then((result) => {
          return Immutable.fromJS(result);
        })
        .catch((err) => {
          // Intercept and log
          log.error(`Error in calling ${apiPluginName}\nMethod: ${methodName}\nParams: ${JSON.stringify(params)}\nError: `, err);
          // Return an empty response rather than throwing an error.
          return Immutable.fromJS({});
        });
    }
  }

  /**
   * Call the Peerplays blockchain `db_api` for information.
   * Route every call to blockchain db api through this function, so we can see the logging.
   *
   * @param {*} methodName - Public methods available on Peerplays blockchain.
   * @param {*} [params=[]] - Params required for different blockchain methods.
   * @returns {Immutable.Map}
   * @memberof PeerplaysService
   */
  callBlockchainDbApi(methodName, params = []) {
    return this.callBlockchainApi('db_api', methodName, params);
  }

  /**
   * Request information on the Peerplays blockchain by id.
   *
   * @param {string} id - ID of the peerplays blockchain to retrieve @example '1.3.1'.
   * @param {boolean} [force=false] - Force a result. TODO: check blockchain for certainty on this.
   * @param {number} [numRecursion=0] - Number of times to retry requesting.
   * @returns {Immutable.Map}
   * @memberof PeerplaysService
   */
  getObject(id, force = false, numRecursion = 0) {
    let num = numRecursion;
    return new Promise((resolve, reject) => {
      if (num > MAX_RECURSION_ATTEMPTS) {
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
        num = num + 1;
        this
          .getObject(id, force, ++num)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }, 100);
    });
  }

  /**
   * Get the account data from the blockchain for the provided account name or account ID.
   *
   * @param {string} accountNameOrId - @example 'jibber232' or '1.2.334'.
   * @returns {Immutable.Map} FullAccount: contains user data retrieved from blockchain if it exists.
   * @memberof PeerplaysService
   */
  getFullAccount(accountNameOrId) {
    return this.callBlockchainDbApi('get_full_accounts', [[accountNameOrId], true]).then((result) => {
      const fullAccount = result.getIn([0, 1]);
      // Return the full account
      return fullAccount;
    });
  }

  /**
   * Using provided paramters, retrieves key auths from blockchain account data passed in and then checks for a match with form generated keys with aid from peerplaysjs-lib against blockchain keys.
   *
   * @param {*} fullAccount - Received from @AuthActions processLogin.
   * @param {*} password - Received from @AuthActions processLogin.
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

  /**
   * Create transaction with logged user's ppyAccountName and password.
   *
   * @param {string} peerplaysAccountUsername - Username for peerplays account.
   * @param {string} peerplaysAccountPassword - Password for peerplays account.
   * @param {number} ppyAmount - Total transaction fee.
   * @returns {string} Stringify of transaction.
   * @memberof PeerplaysService
   */
  async createTransaction(peerplaysAccountUsername, peerplaysAccountPassword, ppyAmount) {
    const x = new BigNumber(ppyAmount);
    const amount = x.shiftedBy(this.balancePrecision || 8);
    const peerplaysAccount = await this.getFullAccount(peerplaysAccountUsername);
    const peerplaysAccountId = peerplaysAccount.getIn(['account', 'id']);
    const tr = new TransactionBuilder();
    const keys = Login.generateKeys(
      peerplaysAccountUsername,
      peerplaysAccountPassword,
      ['owner', 'active'],
      IS_PRODUCTION ? 'PPY' : this.asset.symbol
    );

    try {
      tr.add_type_operation('transfer', {
        fee: {
          amount: 0,
          asset_id: Config.sUSd
        },
        from: peerplaysAccountId,
        to: Config.escrow,
        amount: {
          amount: amount.toNumber(),
          asset_id: Config.sUSD
        }
      });

      await tr.set_required_fees();
      tr.add_signer(keys.privKeys.active, keys.pubKeys.active);
    } catch (err) {
      throw err;
    }

    await tr.serialize();
    await tr.finalize();
    await tr.sign();

    return JSON.stringify(tr.toObject());
  }

  setDefaultRpcConnectionStatusCallback(callback) {
    return Apis
      .instance()
      .setRpcConnectionStatusCallback(callback);
  }

  /**
   * Checks to see if the users system clocks matches the timestamp of the blockchain.
   *
   * @returns {boolean} - Boolean stating weather or not the users is synced.
   * @memberof PeerplaysService
   */
  syncWithBlockchain() {
    // Check if db api is ready
    let db_api = Apis.instance().db_api();

    if (!db_api) {
      return Promise.reject(
        new Error('Api not found, please ensure Apis from peerplaysjs-lib.ws is initialized first')
      );
    }

    // Request object 2.1.0, 2.0.0, and the asset object.
    return this.callBlockchainDbApi('get_objects', [['2.1.0', '2.0.0', Config.sUSD]])
      .then((result) => {
        let isBlockchainTimeDifferenceAcceptable = false;
        const blockchainDynamicGlobalProperty = result.get(0);
        const heartBeatInterval = result.get(1);
        this.blockInterval = heartBeatInterval.getIn(['parameters','block_interval']) * 1000;
        this.asset = result.get(2);
        this.balancePrecision = this.asset.get('precision');
        const now = new Date().getTime();
        const headTime = BlockchainUtils.blockchainTimeStringToDate(
          blockchainDynamicGlobalProperty.get('time')
        ).getTime();
        const delta = (now - headTime) / 1000;
        // Continue only if delta of computer current time and the blockchain time is less than a minute
        isBlockchainTimeDifferenceAcceptable = Math.abs(delta) < 60;

        return isBlockchainTimeDifferenceAcceptable;
      }).catch((err) => {
        return Promise.reject(err);
      });
  }
}

export default new PeerplaysService();