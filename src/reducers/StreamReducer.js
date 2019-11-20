import ActionTypes from '../actions/ActionTypes';
import Immutable, {fromJS} from 'immutable';
import {Config} from '../utility';
/**
 * @private
 * Sample stream entry vanilla js object:
 **/
const dummyState = fromJS({
  streams: {
    'id': 1,
    'name': 'TSM chocoTaco | today\'s weather: thirsty',
    'game': 'fortnite',
    'sourceName': 'twitch',
    'embedUrl': '',
    'channelId': '34608843376',
    'views': 3536,
    'isLive': true,
    'startTime': '2019-06-21T00:09:40.000Z',
    'thumbnailUrl': 'https://some-url.jpg',
    'user': {
      'id': 10,
      'username': 'jotprabh',
      'email': 'prabhjot.narula@gmail.com',
      'twitchUserName': null,
      'googleName': null,
      'youtube': '',
      'facebook': '',
      'peerplaysAccountName': '',
      'bitcoinAddress': '',
      'userType': null
    }
  },
  errors: Immutable.List()
});

let initialState = Config.useDummy ? dummyState : fromJS({
  streams: Immutable.Map(),
  errors: Immutable.List()
});

export default (state = initialState, action) => {
  const errors = state.get('errors');

  switch (action.type) {
    case ActionTypes.STREAMS_ADD_STREAM: {
      const newStream = fromJS(action.payload.stream);
      return state.merge({
        [newStream.get('id')]: newStream
      });
    }

    case ActionTypes.STREAMS_ADD_ERROR: {
      if (errors === null) {
        // Add new error
        return state.merge({
          errors: action.payload.error
        });
      } else {
        // Append new error
        return state.merge({
          errors: errors.push(action.payload.error)
        });
      }
    }

    default:
      return state;
  }
};
