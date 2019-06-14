/* eslint-disable */
import ActionTypes from '../constants/ActionTypes';
import NavigateActions from '../actions/NavigateActions';
import AuthService from '../services/AuthService';
import AccountActions from '../actions/AccountActions';

class AppPrivateActions {
  /**
   *  Private Redux Action Creator (APP_LOGOUT)
   *  User Logout
   *
   * @returns {{type, payload: {isLogin: boolean, account: null, accountId: null}}}
   */
  static logoutAction() {
    return {
      type: ActionTypes.APP_LOGOUT,
      payload: {
        isLoggedin: false,
        account: null,
        password: null
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
      console.log(fullAccount);
      // Save account information
      dispatch(AccountActions.setAccountAction(fullAccount));
      // Save password
      dispatch(AccountActions.setPasswordAction(account.password));
      // Set is logged in
      dispatch(AccountActions.setIsLoggedInAction(true));
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
 * @returns {function(*)}
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