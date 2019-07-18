import {push, replace} from 'connected-react-router';
import {RouteConstants as Routes} from '../constants';
import {Dispatch} from 'redux';

/**
 * Handles all navigation within the application.
 *
 * @class NavigateActions
 */
class NavigateActions {
  /**
   * Since we render the Home component if no existing URL/Route exists, we cleanup the browser address bar.
   * Alter the URl to be the root. Used when a manually entered URL by the end user does not exist.
   *
   * @static
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static noValidPathRedirect() {
    return (dispatch) => {
      dispatch(replace(Routes.ROOT));
    };
  }

  /**
   * Navigate the user to the dashboard page.
   *
   * @static
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToDashboard() {
    return (dispatch) => {
      dispatch(push('/'));
    };
  }

  /**
   * Navigate the user to the sign up page.
   *
   * @static
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToSignUp() {
    return (dispatch) => {
      dispatch(push('/sign-up'));
    };
  }

  /**
   * If the user attempts to view a page they need authentication for, redirect them to the sign in page and then to the page they initially tried to view after authenticated.
   *
   * @static
   * @param {string} [redirectAfterLogin=null] - The destination to redirect to after the user has logged in.
   * @param {boolean} [withReplace=true] - Replace the url rather than push a new one.
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToSignIn(redirectAfterLogin = null, withReplace = true) {
    return (dispatch) => {
      let url = redirectAfterLogin ? `/login?next=${redirectAfterLogin}` : '/login';

      if (withReplace) {
        dispatch(replace(url));
      } else {
        dispatch(push(url));
      }
    };
  }
}

export default NavigateActions;