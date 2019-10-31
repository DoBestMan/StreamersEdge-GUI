import ActionTypes from '../actions/ActionTypes';
import {fromJS} from 'immutable';

let initialState = fromJS({
  connected: false,
  account: null,
  balancePrecision: 0
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PEERPLAYS_SET_IS_CONNECTED: {
      return state.merge({
        connected: action.payload.connected
      });
    }

    case ActionTypes.PEERPLAYS_SET_ACCOUNT: {
      return state.merge({
        account: action.payload.account
      });
    }

    case ActionTypes.PEERPLAYS_SET_PRECISION: {
      return state.merge({
        balancePrecision: action.payload.balancePrecision
      });
    }

    default:
      return state;
  }
};
