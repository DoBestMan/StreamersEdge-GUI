import ActionTypes from '../actions/ActionTypes';
import Immutable from 'immutable';

let initialState = Immutable.fromJS({
  isOpen: false,
  type: ''
});

export default function(state = initialState, action) {
  switch (action.type) {
    // If modal is already open, and intent is to open a modal, do not toggle
    case ActionTypes.MODAL_TOGGLE: {
      return state.merge({
        isOpen: state.get('isOpen') ? false : true
      });
    }

    case ActionTypes.MODAL_SET_TYPE: {
      return state.merge({
        type: action.modalType
      });
    }

    default:
      return state;
  }
}
