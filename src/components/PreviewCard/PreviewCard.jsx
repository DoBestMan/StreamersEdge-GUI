// TODO: if a stream has been "loaded" and viewed already, cache it. Persist the data on application/browser refresh.
// demo
import demoThumb from '../../assets/images/demo-thum.jpg';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {PreviewTypes, LoadingTypes} from '../../constants';
import {GenUtil} from '../../utility';
import {StreamActions} from '../../actions';
import {CircularProgress} from '@material-ui/core';
import Avatar from '../Avatar';
const translate = GenUtil.translate;
const previewTypeValues = Object.values(PreviewTypes);

class PreviewCard extends Component {
  state = {
    hasDescription: false,
    hasPreview: false,
    hasStatus: false
  }

  isFetching = () => this.props.loadingStatus.findIndex((s) => {
    return s === LoadingTypes.FETCHING.TWITCH.STREAM + this.props.id;
  });

  componentDidMount() {
    this.props.fetchStream(this.props.id);
    this.hasStatus();
    this.hasDescription();
  }

  hasStatus = () => {
    const validTypeForStatus = previewTypeValues.indexOf((type) => {
      return type === PreviewTypes.MAIN || type === PreviewTypes.STREAMS || PreviewTypes.CHALLENGES;
    });

    if (validTypeForStatus) {
      this.setState({hasStatus: true});
    }
  }

  hasDescription = () => {
    if (this.props.type === PreviewTypes.MAIN) {
      this.setState({hasDescription: true});
    }
  }

  renderStatus = () => {
    let content;

    if (this.state.hasStatus) {
      let [status, className] = [null, null];

      switch (this.props.type) {
        case PreviewTypes.MAIN:
        case PreviewTypes.STREAMS:
          status = translate('previewCard.status.live');
          className = '-live';
          break;
        case PreviewTypes.CHALLENGES:
          status = translate('previewCard.status.challenge');
          className = '-join';
          break;
        // no default
      }

      if (!!status && !!className) {
        content =
          <div className='preview-card__status'>
            <div className={ 'preview-card__status' + className }>
              <span className='preview-card__status-blt' />
              {status}
            </div>
          </div>;
      }

      return content;
    }
  };

  renderDesc = () => {
    if (this.state.hasDescription) {
      const {stream} = this.props;

      // TODO: handle null values. ie: use defaults. Do this in a reducer/action.

      return (
        <div className='preview-card__desc'>
          <div className='preview-card__desc-content'>
            <div className='preview-card__desc-content profile'>
              <Avatar avatar={ stream.avatar } user={ stream.user }/>
              <div className='profile__data'>
                <p className='profile__username'>{stream.channelId}</p>
                <p className='profile__game'>{stream.game || 'ashdjfghasd'}</p>
                <p className='profile__views'>{stream.views}</p>
              </div>
            </div>
            <div className='preview-card__desc-content description'>
              <span>{translate('dashboard.featured.desc')}</span>
            </div>
          </div>
        </div>
      );
    }
  };

  renderHeader = () => {
    return (
      <div className='preview-card__header'>
        <div className='preview-card__header-viewers'></div>
      </div>
    );
  };

  render() {
    // TODO: consider error display for streams that cannot be fetched.
    if (this.isFetching() >= 0) {
      return (
        <div className='preview-card'><CircularProgress className='preview-card--loading' size='100px'/></div>
      );
    } else {
      const {stream} = this.props;
      const thumbnail = stream && stream.thumbnailUrl;
      const bg = !!thumbnail ? thumbnail : demoThumb;
      return (
        <div className='preview-card' style={ {backgroundImage: `url(${bg})`} }>
          {this.renderDesc()}
          {this.renderHeader()}
          {this.renderStatus()}
        </div>
      );
    }
  };
}

PreviewCard.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const loadingStatus = state.getIn(['app', 'loading']);
  let stream = state.getIn(['streams', ownProps.id.toString()]);

  if (stream) {
    stream = stream.toJS();
  }

  return {
    stream, loadingStatus
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchStream: StreamActions.fetchStream
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewCard);
