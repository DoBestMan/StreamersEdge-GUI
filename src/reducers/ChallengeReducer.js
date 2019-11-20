import ActionTypes from '../actions/ActionTypes';
import Immutable, {fromJS} from 'immutable';
import {Config} from '../utility';

const dummyState = fromJS({
  1: {
    'name': 'Test name',
    'startDate': '2019-04-04T08:32:19.818Z',
    'endDate': '2019-04-04T08:32:19.818Z',
    'game': 'pubg',
    'accessRule': 'anyone',
    'ppyAmount': 100,
    'invitedAccounts': [],
    'conditionsText': [],
    'conditions': [{
      'param': 'resultPlace',
      'operator': '>',
      'value': 1,
      'join': 'END'
    }]
  }
});

let initialState = Config.useDummy ? dummyState : fromJS({
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