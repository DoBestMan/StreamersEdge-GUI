import {push, replace} from 'connected-react-router';

class NavigateActions {
  static navigateTo(path) {
    return (dispatch) => {
      if (path) {
        dispatch(push(path));
      } else {
        console.error('Unimplemented path', path);
      }
    };
  }

  static navigateToDashboard() {
    return (dispatch) => {
      dispatch(push('/'));
    };
  }
  static navigateToSignUp() {
    return (dispatch) => {
      dispatch(push('/sign-up'));
    };
  }

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