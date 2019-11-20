import ActionTypes from '../actions/ActionTypes';
import {fromJS} from 'immutable';

let initialState = fromJS({
  visibility: false,
  validationConditions: null,
  position: null,
  type: ''
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ERRORBOX_SET_ERRORBOX: {
      return state.merge({
        visibility: true,
        validationConditions: action.payload.validationConditions,
        position: action.payload.position
      });
    }

    case ActionTypes.ERRORBOX_HIDE_ERRORBOX: {
      return state.merge({
        visibility:false
      });
    }

    default:
      return state;
  }
};
