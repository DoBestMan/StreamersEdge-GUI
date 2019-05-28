import {combineReducers} from 'redux-immutable';
import {connectRouter} from 'connected-react-router';
import ImmutableI18nReduxer from './ImmutableI18nReduxer';

export default (history) => combineReducers({
  router: connectRouter(history),
  i18n: ImmutableI18nReduxer
});