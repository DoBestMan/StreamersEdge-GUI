import {LOAD_TRANSLATIONS, SET_LOCALE} from 'react-redux-i18n';
import {fromJS} from 'immutable';

const initialState = fromJS({});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRANSLATIONS:
      return state.set('translations', action.translations);
    case SET_LOCALE:
      return state.set('locale', action.locale);
    default:
      return state;
  }
};
