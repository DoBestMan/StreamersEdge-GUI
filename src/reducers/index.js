import {combineReducers} from 'redux-immutable';
import {connectRouter} from 'connected-react-router';
import ImmutableI18nReduxer from './ImmutableI18nReduxer';
import AppReducer from '../reducers/AppReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  i18n: ImmutableI18nReduxer,
  app: AppReducer
});