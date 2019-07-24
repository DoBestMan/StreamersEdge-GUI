import {combineReducers} from 'redux-immutable';
import {connectRouter} from 'connected-react-router';
import ImmutableI18nReduxer from './ImmutableI18nReduxer';
import AppReducer from './AppReducer';
import ModalReducer from './ModalReducer';
import AccountReducer from './AccountReducer';
import StreamReducer from './StreamReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  i18n: ImmutableI18nReduxer,
  app: AppReducer,
  modal: ModalReducer,
  profiles: AccountReducer,
  streams: StreamReducer
});