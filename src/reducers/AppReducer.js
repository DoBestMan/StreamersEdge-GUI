/* eslint-disable jsdoc/require-jsdoc */
import ActionTypes from '../actions/ActionTypes';
import {fromJS} from 'immutable';

const initialState = fromJS({
  accountId: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.APP_LOGIN:
    case ActionTypes.APP_LOGOUT:
      return state.merge({
        isLogin: action.payload.isLogin,
        account: action.payload.account,
        accountId: action.payload.accountId
      });
    default:
      return state;
  }
};