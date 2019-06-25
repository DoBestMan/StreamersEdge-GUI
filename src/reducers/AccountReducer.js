import ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';
import StorageUtil from '../utility/StorageUtil';

let initialState = Immutable.fromJS({
  isLoggedIn: StorageUtil.get('se-user') ? true : false,
  account: JSON.parse(StorageUtil.get('se-user'))
});

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ACCOUNT_SET_IS_LOGGED_IN: {
      return state.merge({
        isLoggedIn: action.isLoggedIn
      });
    }

    case ActionTypes.ACCOUNT_SET_ACCOUNT: {
      return state.merge({
        account: action.payload.account
      });
    }

    case ActionTypes.ACCOUNT_SET_PASSWORD: {
      return state.merge({
        password: action.payload.password
      });
    }

    case ActionTypes.ACCOUNT_SET_STATISTICS: {
      return state.merge({
        statistics: action.statistics
      });
    }

    case ActionTypes.AUTH_RESET_AUTO_LOGIN_INFO: {
      return initialState;
    }

    case ActionTypes.ACCOUNT_LOGOUT: {
      return state.merge({
        isLoggedIn: action.payload.isLoggedIn,
        account: action.payload.account
      });
    }

    default:
      return state;
  }
}
