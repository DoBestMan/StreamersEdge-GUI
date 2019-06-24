import PeerplaysService from '../services/PeerplaysService';

class AuthPrivateActions {
  /**
   * Attempts to retrieve the account from the blockchain as per the provided form username.
   * Authenticated via @PeerplaysService authAcount function.
   *
   * @static
   * @param {*} accountName
   * @param {*} password
   * @returns success object if auth passes, error string if fails (tweak along with TODO: error handling in html markup).
   * @memberof AuthPrivateActions
   */
  static processLogin(accountName, password) {
    // TODO: proper dispatching as required on use-case where this component is used.
    return (dispatch) => PeerplaysService.getFullAccount(accountName).then((fullAccount) => { // eslint-disable-line
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

class AuthActions {
  /**
   * Receive @PeerplaysLogin form submitted parameters.
   *
   * @static
   * @param {string} accountName: from @PeerplaysLogin submitted form.
   * @param {string} password: from @PeerplaysLogin submitted form.
   * @returns async promise for use in form submission.
   * @memberof AuthActions
   */
  static peerplaysLogin(accountName, password) {
    return async (dispatch) => {
      function onSuccess(success) {
        return success;
      }

      function onError(error) {
        return error;
      }

      try {
        const success = await dispatch(AuthPrivateActions.processLogin(accountName, password));
        return onSuccess(success);
      } catch (error) {
        return onError(error);
      }
    };
  }
}

export default AuthActions;