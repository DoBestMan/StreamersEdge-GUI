// TODO: document
import ActionTypes from './ActionTypes';
import StreamService from '../services/StreamService';
import {GenUtil} from '../utility';
import {LoadingTypes} from '../constants';
import AppActions from './AppActions';
const translate = GenUtil.translate;

class StreamPrivateActions {
  static fetchStream(id) {
    return (dispatch) => StreamService.fetchStream(id).then((streamData) => {
      dispatch(StreamPrivateActions.addStream(streamData));
    }).catch((e) => {
      throw e;
    });
  }

  static addStream(streamData) {
    return {
      type: ActionTypes.STREAMS_ADD_STREAM,
      payload: {
        stream: streamData
      }
    };
  }

  static addStreamError(err) {
    return {
      type: ActionTypes.STREAMS_ADD_ERROR,
      payload: {
        error: err
      }
    };
  }
}

class StreamActions {
  static fetchStream(id) {
    return (dispatch) => {
      dispatch(AppActions.addAppLoadingStatus(LoadingTypes.FETCHING.TWITCH.STREAM + id));
      dispatch(StreamPrivateActions.fetchStream(id)).then(() => {
        setTimeout(() => dispatch(AppActions.removeLoadingStatus(LoadingTypes.FETCHING.TWITCH.STREAM + id)), 3000);
      }).catch(() => {
        dispatch(StreamPrivateActions.addStreamError(translate('errors.streams.addError', {id})));
        // throw e;
      });
    };
  }
}

export default StreamActions;
