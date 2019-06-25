import ActionTypes from '../constants/ActionTypes';


const initialState = {
  accountId: null
};

export default function(state=initialState, action) {
  switch (action.type) {
    // login to app
    case ActionTypes.APP_LOGIN:
      return Object.assign({}, state, {
        isLogin: action.payload.isLogin,
        account: action.payload.account,
        accountId: action.payload.accountId
      });
    // logout from app
    case ActionTypes.APP_LOGOUT:
      return Object.assign({}, state, {
        isLogin: action.payload.isLogin,
        account: action.payload.account,
        accountId: action.payload.accountId
      });
    default:
      return state;
  }
}