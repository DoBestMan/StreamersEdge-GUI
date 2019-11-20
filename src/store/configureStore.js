import {applyMiddleware, createStore} from 'redux';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import Immutable from 'immutable';
import {loadTranslations, setLocale, I18n} from 'react-redux-i18n';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {translationObject} from '../assets/locales/translations';
import createRootReducer from '../reducers';

// Session history
export const history = createBrowserHistory();

const syncImmutableTranslationWithStore = (store) => {
  I18n.setTranslationsGetter(() => {
    try {
      return store.getState().getIn(['i18n', 'translations']);
    } catch (e) {
      console.error('Error getting translations from store!');
    }
  });
  I18n.setLocaleGetter(() => {
    try {
      return store.getState().getIn(['i18n', 'locale']);
    } catch (e) {
      console.error('Error getting locale from store!');
    }
  });
};

export default () => {
  // For typescript, this may need tweaking...
  let initialState = Immutable.Map();

  // Define var for filtering actions when debugging redux to reduce clutter and increase performance.
  let actionsWhitelist = [];

  // Configure enhancer for redux dev tools extensions (if available)
  const composeEnhancers = composeWithDevTools({
    features: {
      dispatch: true
    },
    // Option for immutable
    serialize: {immutable: Immutable},
    actionsWhitelist: actionsWhitelist
  });

  // Construct enhancer
  const enhancer = composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history))
  );
  const store = createStore(
    createRootReducer(history),
    initialState,
    enhancer
  );

  // Set translation
  syncImmutableTranslationWithStore(store);
  store.dispatch(loadTranslations(translationObject));
  store.dispatch(setLocale('en'));

  return store;
};