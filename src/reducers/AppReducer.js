/* eslint-disable jsdoc/require-jsdoc */
import ActionTypes from '../actions/ActionTypes';
import Immutable, {fromJS} from 'immutable';
import {Config} from '../utility';

const dummyState = fromJS({
  accountId: 1,
  loading: Immutable.List([])
});

const mergeDummyAccountState = {
  isLogin: true,
  account: {
    'user': {
      'id': 10,
      'username': 'jotprabh',
      'email': 'pbsa_dev@gmail.com',
      'twitchUserName': null,
      'googleName': null,
      'youtube': null,
      'facebook': null,
      'peerplaysAccountName': null,
      'bitcoinAddress': '1NbhnkGbiaRxNUvKnTNfEomH1Nk1dVUxAR',
      'userType': 'gamer'
    }
  },
  accountId: 10
};

const initialState = Config.useDummy ? dummyState : fromJS({
  accountId: null,
  loading: Immutable.List([]),
  leftMenuCategory: 'Fortnite'
});

export default (state = initialState, action) => {
  const loading = state.get('loading');

  switch (action.type) {
    case ActionTypes.APP_LOGIN:
    case ActionTypes.APP_LOGOUT:
      return Config.useDummy ? state.merge({mergeDummyAccountState}) : state.merge({
        isLogin: action.payload.isLogin,
        account: action.payload.account,
        accountId: action.payload.accountId
      });

    case ActionTypes.APP_ADD_LOADING_STATUS:
      const newLoadingState = fromJS(action.payload.status);

      // Check that the loading status is not already active.
      const indexNew = loading && loading.findIndex((l) => {
        return l === newLoadingState;
      });

      // If already in loading state, ignore. Only push new entries.
      if (indexNew < 0) {
        // Append the new loading state
        return state.merge({
          loading: loading.push(newLoadingState)
        });
      } else {
        return state;
      }

    case ActionTypes.APP_REMOVE_LOADING_STATUS:
      const statusToRemove = action.payload.status;
      let newLoading = loading;

      // Check that the loading status is not already active.
      const indexExisting = loading && loading.findIndex((s) => {
        return s === statusToRemove;
      });

      if (indexExisting >= 0) {
        newLoading = newLoading.filterNot((s) => s === statusToRemove);
      }

      return state.merge({loading: newLoading});

    case ActionTypes.APP_RESET_LOADING_STATUS:
      return state.merge({loading: initialState.get('loading')});
    case ActionTypes.APP_SET_LEFT_MENU_CATEGORY:
      return state.merge({leftMenuCategory: action.payload.category});
    default:
      return state;
  }
};
