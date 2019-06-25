/* eslint-disable */
import ActionTypes from '../constants/ActionTypes';
import NavigateActions from '../actions/NavigateActions';
import AuthService from '../services/AuthService';
import AccountActions from '../actions/AccountActions';
import StorageUtil from '../utility/StorageUtil';

class AppPrivateActions {
  /**
   *  Private Redux Action Creator (ACCOUNT_LOGOUT)
   *  User Logout
   *
   * @returns {{type, payload: {isLogin: boolean, account: null, accountId: null}}}
   */
  static logoutAction() {
    StorageUtil.remove('se-user');

    return {
      type: ActionTypes.ACCOUNT_LOGOUT,
      payload: {
        isLoggedin: false,
        account: null,
      }
    };
  }

  /**
   * Log the user in given account name and password
   * This is internal action that is used for the exposed login and signup function
   * @param {object} account
   */

  static processLogin(account) {
    return (dispatch) => AuthService.login(account).then((fullAccount) => {
      // Save account information
      dispatch(AccountActions.setAccountAction(fullAccount));
      // Set is logged in
      dispatch(AccountActions.setIsLoggedInAction(true));
      // Persistence
      StorageUtil.set('se-user', JSON.stringify(fullAccount));
    }).catch((e) => {
      throw e;
    });
  }

}

class AppActions {
  /**
 * login in app-Reducer
 *
 * @param {Object} account {name: String, id: String}
 * @returns Navigate action
 */
  static login(account, next = null) {
    return (dispatch) => {
      dispatch(AppPrivateActions.processLogin(account)).then(() => {
        console.log('Login succeeded'); //TODO: need to error handle this
          dispatch(NavigateActions.navigateTo('/dashboard'));
      }).catch((err) => {
        console.error(err);
      });

      // if (next) {
      //   dispatch(NavigateActions.navigateTo(next)); 
      // } else {
      //   dispatch(NavigateActions.navigateToDashboard());
      // }
    };
  }

  /**
 *  Reducer: APP Logout action
 *
 * @returns {Function}
 */
  static logout() {
    return (dispatch) => {
      dispatch(AppPrivateActions.logoutAction());
      dispatch(NavigateActions.navigateToSignIn());

    };
  }
}

export default AppActions;