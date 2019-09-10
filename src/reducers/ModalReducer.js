import ActionTypes from '../actions/ActionTypes';
import {fromJS} from 'immutable';

let initialState = fromJS({
  isOpen: false,
  previous: '',
  type: ''
});

export default (state = initialState, action) => {
  switch (action.type) {
    // If modal is already open, and intent is to open a modal, do not toggle
    case ActionTypes.MODAL_TOGGLE: {
      return state.merge({
        isOpen: state.get('isOpen') ? false : true
      });
    }

    case ActionTypes.MODAL_SET_TYPE: {
      return state.merge({
        previous: state.get('type'),
        type: action.modalType
      });
    }

    default:
      return state;
  }
};
