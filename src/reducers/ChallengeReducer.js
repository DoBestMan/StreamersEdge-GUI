import ActionTypes from '../actions/ActionTypes';
import Immutable, {fromJS} from 'immutable';

let initialState = fromJS({
  1: new Immutable.Map()
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHALLENGE_SET_CHALLENGES: {
      return state.merge({
        [action.payload.challenges.id]: action.payload.challenges
      });
    }

    default:
      return state;
  }
};