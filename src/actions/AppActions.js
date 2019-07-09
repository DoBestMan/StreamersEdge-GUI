import ActionTypes from './ActionTypes';
import NavigateActions from '../actions/NavigateActions';
import AuthService from '../services/AuthService';
import AccountActions from '../actions/AccountActions';
import StorageUtil from '../utility/StorageUtil';
import ModalActions from '../actions/ModalActions';
import {translate} from '../utility/GeneralUtils';

class AppPrivateActions {
  /**
   *  Private Redux Action Creator (ACCOUNT_LOGOUT)
   *  User Logout
   *
   * @returns {{type, payload: {isLogin: boolean, account: null, accountId: null}}}
   */
  static logoutAction() {
    StorageUtil.remove('se-user');
    AuthService.logout();

    return {
      type: ActionTypes.ACCOUNT_LOGOUT,
      payload: {
        isLoggedin: false,
        account: null
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
  static login(account) {
    return (dispatch) => {
      dispatch(AppPrivateActions.processLogin(account)).then(() => {
        dispatch(ModalActions.toggleModal());
        dispatch(NavigateActions.navigateTo('/dashboard'));
      }).catch(() => {
        dispatch(AppActions.setLoginError(translate('login.invalidPassword')));
      });
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

  // Set error text in Login modal
  static setLoginError(text) {
    return {
      type: ActionTypes.ACCOUNT_LOGIN_SET_ERROR,
      payload: {
        loginErrorText: text
      }
    };
  }
}

export default AppActions;