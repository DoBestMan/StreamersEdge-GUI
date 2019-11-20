import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon
} from 'react-share';

import {GenUtil} from '../../../utility';
import {ModalActions} from '../../../actions';
import Config from '../../../utility/Config';
import {Copylink} from '../../../assets/images/challenge';

const trans = GenUtil.translate;

class ChallengeSuccess extends Component {
  state = {
    leftSecond: 10,
    shareUrl: `${Config.baseRoute}/challenge/${this.props.challengeId}`
  };

  componentDidMount() {
    setTimeout(() => {
      this.timeId = setInterval(() => {
        if (this.state.leftSecond > 1) {
          this.setState({
            leftSecond: this.state.leftSecond - 1
          });
        } else {
          clearInterval(this.timeId);
          this.props.toggleModal();
          this.props.history.push('/challenge-grid');
        }
      }, 1000);
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  handleCopy  = () => {
    navigator.clipboard.writeText(this.state.shareUrl);
  }

  render() {
    return (
      <>
        <div className='challenge-success'>
          <p className='challenge-success__header'>{trans('createChallenge.success.header')}</p>
          <p className='challenge-success__subHeader'>{trans('createChallenge.success.subHeader')}</p>
          <div className='challenge-success__share'>
            <FacebookShareButton url={ this.state.shareUrl }>
              <FacebookIcon size={ 88 } borderRadius={ 11 } />
            </FacebookShareButton>
            <TwitterShareButton url={ this.state.shareUrl }>
              <TwitterIcon size={ 88 } borderRadius={ 11 } />
            </TwitterShareButton>
            <WhatsappShareButton url={ this.state.shareUrl }>
              <WhatsappIcon size={ 88 } borderRadius={ 11 } />
            </WhatsappShareButton>
            <TelegramShareButton url={ this.state.shareUrl }>
              <TelegramIcon size={ 88 } borderRadius={ 11 } />
            </TelegramShareButton>
          </div>
          <div className='challenge-success__link'>
            <p className='challenge-success__link-label'>{trans('createChallenge.success.link.label')}</p>
            <div className='challenge-success__link-box'>
              {this.state.shareUrl}
              <img className='challenge-success__link-copy' src={ Copylink } onClick={ this.handleCopy } alt='' />
            </div>
          </div>
          <div className='challenge-success__redirect'>
            {`${trans('createChallenge.success.redirect.text1')} ${this.state.leftSecond} ${trans('createChallenge.success.redirect.text2')}`}
            <a className='challenge-success__redirect-link' href='/challenge-grid'>{trans('createChallenge.success.redirect.here')}</a>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  challengeId: state.getIn(['modal', 'data'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengeSuccess);