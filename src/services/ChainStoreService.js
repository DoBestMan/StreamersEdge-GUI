import {PeerplaysService} from '../services';

let ChainStore;
let ReduxStore;

/**
 * This service is used for page updates on constants from LocationConstants.js.
 *
 * It's listen to ChainStore and call a updateChainStore fnc.
 *
 */

/**
 * Gets called every heartbeat by listenChainStore once subscribed.
 * Currently calls get profile if the user is logged in.
 */
function updateChainStore() {
  let currentState = ReduxStore.getState();

  if(currentState.getIn(['profiles','isLoggedIn'])) {
    const account = currentState.getIn(['profiles','currentAccount','peerplaysAccountName']);
    PeerplaysService.getBalance(account);
  }
}

/**
 * @param {object} chainStore - Instance of chain store.
 * @param {object} reduxStore - Instance of redux store.
 */
export function listenChainStore(chainStore, reduxStore) {
  ChainStore = chainStore;
  ReduxStore = reduxStore;

  if(chainStore.subscribers.has(updateChainStore) === false) {
    ChainStore.subscribe(updateChainStore);
  } else {
    ChainStore.unsubscribe(updateChainStore);
    ChainStore.subscribe(updateChainStore);
  }
}
