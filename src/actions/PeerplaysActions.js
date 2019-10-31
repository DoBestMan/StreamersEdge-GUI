import ActionTypes from './ActionTypes';
import {Action} from 'redux';

/**
 * Public actions related to Peerplays actions.
 *
 * @class PeerplaysActions
 */
class PeerplaysActions {
  /**
   * Public Redux action creator.
   * Call to update redux with a boolean to define the user as logged in or not.
   *
   * @static
   * @param {boolean} isLoggedIn - True/false.
   * @memberof AccountActions
   * @returns {Action}
   */

  static setPeerplaysConnected(connected) {
    return {
      type: ActionTypes.PEERPLAYS_SET_IS_CONNECTED,
      payload: {
        connected: connected
      }
    };
  }

  static setPeerplaysAccount(account) {
    return {
      type: ActionTypes.PEERPLAYS_SET_ACCOUNT,
      payload: {
        account: account
      }
    };
  }

  static setPeerplaysPrecision(balancePrecision) {
    return {
      type: ActionTypes.PEERPLAYS_SET_PRECISION,
      payload: {
        balancePrecision: balancePrecision
      }
    };
  }
}

export default PeerplaysActions;