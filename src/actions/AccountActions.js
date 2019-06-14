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
      account
    };
  }

  static setPasswordAction(password) {
    return {
      type: ActionTypes.ACCOUNT_SET_PASSWORD,
      password
    };
  }
}

export default AccountActions;
