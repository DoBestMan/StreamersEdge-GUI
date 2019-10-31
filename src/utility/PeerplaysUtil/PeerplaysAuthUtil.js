import {PeerplaysService} from '../../services';
import {AuthService} from '../../services';
class PeerplaysAuthPrivateUtil {
  /**
   * Attempts to retrieve the account from the blockchain as per the provided form username.
   * Authenticated via @PeerplaysService authAcount function.
   *
   * @static
   * @param {string} accountName - The Peerplays account name.
   * @param {string} password - The Peerplays accounts login/signing password/key.
   * @returns {object} - Success object if auth passes, error string if fails (tweak along with TODO: error handling in html markup).
   * @memberof PeerplaysAuthPrivateActions
   */
  static processLogin(accountName, password) {
    // TODO: proper dispatching as required on use-case where this component is used.
    return () => PeerplaysService.getFullAccount(accountName).then((fullAccount) => {
      const account = fullAccount && fullAccount.get('account');
      const isAuth = PeerplaysService.authAccount(account, password);

      if (isAuth) {
        return {
          message: `${accountName} is authenticated.`,
          isAuth
        };
      } else {
        throw new Error(`${accountName} 'is not authenticated.`);
      }
    });
  }
}

/**
 * Use for implementing Peerplays blockchain authentication.
 *
 * @class PeerplaysAuthActions
 */
class PeerplaysAuthActions {
  /**
   * Receive @PeerplaysLogin form submitted parameters.
   *
   * @static
   * @param {string} accountName - From @PeerplaysLogin submitted form.
   * @param {string} password - From @PeerplaysLogin submitted form.
   * @returns {Promise} - Async promise for use in form submission.
   * @memberof PeerplaysAuthActions
   */
  static peerplaysLogin(accountName, password) {
    return async (dispatch) => {
      // eslint-disable-next-line jsdoc/require-jsdoc
      function onSuccess(success) {
        return success;
      }

      // eslint-disable-next-line jsdoc/require-jsdoc
      function onError(error) {
        return error;
      }

      try {
        const success = await dispatch(PeerplaysAuthPrivateUtil.processLogin(accountName, password));
        await AuthService.linkPeerplaysAccount(accountName);
        return onSuccess(success);
      } catch (error) {
        return onError(error);
      }
    };
  }
}

export default PeerplaysAuthActions;
