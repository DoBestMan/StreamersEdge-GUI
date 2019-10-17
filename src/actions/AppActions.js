import ActionTypes from './ActionTypes';
import {NavigateActions, AccountActions, ModalActions} from '../actions';
import {AuthService} from '../services';
import {StorageUtil} from '../utility';
import {Action, Dispatch} from 'redux';
import ModalTypes from '../constants/ModalTypes';

class AppPrivateActions {
  /**
   * Private Redux action creator.
   * Call to update redux and local storage with logged out user once logged out.
   *
   * @memberof AppPrivateActions
   * @returns {Action}
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
   * Log the user in given account name and password.
   * Updates local storage.
   * This is internal action that is used for the exposed login and signup function.
   *
   * @param {object} account - User object:
   * {
      "id": 7,
      "username": "test",
      "email": "test@email.com",
      "twitchUserName": "",
      "googleName": "",
      "youtube": "",
      "facebook": "",
      "twitch": "",
      "peerplaysAccountName": "",
      "bitcoinAddress": "",
      "userType": "viewer",
      "avatar": ""
   * }.
   * @memberof AppPrivateActions
   * @returns {Dispatch}
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

  static addAppLoadingStatus(status) {
    return {
      type: ActionTypes.APP_ADD_LOADING_STATUS,
      payload: {
        status: status
      }
    };
  }

  static resetAppLoadingStatus() {
    return {
      type: ActionTypes.APP_RESET_LOADING_STATUS,
      payload: {
        loading: ''
      }
    };
  }

  static removeLoadingStatus(status) {
    return {
      type: ActionTypes.APP_REMOVE_LOADING_STATUS,
      payload: {
        status
      }
    };
  }
}


/**
 * Public actions related to Application wide actions.
 *
 * @class AppActions
 */
class AppActions {
  /**
   * Public Redux Action Creator.
   *
   * @param {object} account - {name: String, id: String}.
   * @memberof AppActions
   * @returns {Dispatch}
   */
  static login(account) {
    return (dispatch) => {
      dispatch(AppPrivateActions.processLogin(account)).then(() => {
        dispatch(ModalActions.toggleModal());
        dispatch(NavigateActions.navigateToDashboard());
      }).catch((err) => {
        if(err.status === 403){
          dispatch(ModalActions.toggleModal());
          dispatch(ModalActions.setModalType(ModalTypes.BAN));
          dispatch(ModalActions.toggleModal());
        } else {
          dispatch(AppActions.setLoginError(err.data.error));
        }

      });
    };
  }

  /**
   * Public Redux Action Creator.
   *
   * @static
   * @memberof AppActions
   * @returns {Dispatch}
   */
  static logout() {
    return (dispatch) => {
      dispatch(AppPrivateActions.logoutAction());
      dispatch(NavigateActions.navigateToStreamersEdgeWebsite());
    };
  }

  /**
   * Public Redux Action Creator.
   * Set error text in Login modal.
   *
   * @static
   * @param {string} text - The error string.
   * @memberof AppActions
   * @returns {Action}
   */
  static setLoginError(text) {
    return {
      type: ActionTypes.ACCOUNT_LOGIN_SET_ERROR,
      payload: {
        loginErrorText: text
      }
    };
  }

  static addAppLoadingStatus(status) {
    return (dispatch) => {
      dispatch(AppPrivateActions.addAppLoadingStatus(status));
    };
  }

  static removeLoadingStatus(status) {
    return (dispatch) => {
      dispatch(AppPrivateActions.removeLoadingStatus(status));
    };
  }

  static resetLoadingStatus() {
    return (dispatch) => {
      dispatch(AppPrivateActions.resetAppLoadingStatus());
    };
  }
}

export default AppActions;
