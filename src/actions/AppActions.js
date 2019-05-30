import ActionTypes from '../constants/ActionTypes';
import NavigateActions from '../actions/NavigateActions';

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
        isLogin: false,
        account: null,
        accountId: null
      }
    };
  }

  /**
   * Private Redux Action Creator (APP_LOGIN)
   * Account Login in app
   *
   * @param {String} account
   * @param {String} accountId
   * @returns {{type, payload: {isLogin: boolean, account: String, accountId: String}}}
   */
  static loginAction(account, accountId) {
    return {
      type: ActionTypes.APP_LOGIN,
      payload: {
        isLogin: true,
        account: account,
        accountId: accountId
      }
    };
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
      dispatch(AppPrivateActions.loginAction(account.name, account.id));

      if (next) {
        dispatch(NavigateActions.navigateTo(next)); 
      } else {
        dispatch(NavigateActions.navigateToDashboard());
      }
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