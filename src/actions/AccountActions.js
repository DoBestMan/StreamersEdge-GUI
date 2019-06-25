import ActionTypes from '../constants/ActionTypes';

/**
 * Public actions
 */
class AccountActions {

  static setIsLoggedInAction(isLoggedIn) {
    return { 
      type: ActionTypes.ACCOUNT_SET_IS_LOGGED_IN,
      isLoggedIn
    };
  }

  static setAccountAction(account) {
    return {
      type: ActionTypes.ACCOUNT_SET_ACCOUNT,
      payload: {
        account: account
      }
    };
  }
}

export default AccountActions;
