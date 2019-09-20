import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {AuthUtil, GenUtil} from '../../../utility';
import {
  youtubeImgBlue,
  facebookImg,
  youtubeImg,
  twitchImgBlue,
  peerplaysImg,
  facebookImgBlue,
  twitchImg,
  peerplaysImgBlue
} from '../../../assets/images/socials';
import ModalTypes from '../../../constants/ModalTypes';
import {ModalActions} from '../../../actions';

const translate = GenUtil.translate;

class LoginFooter extends Component {
  render() {
    return (
      <div className='login-footer'>
        <p className='login-footer-title'>{translate('login.orLoginWith')}</p>
        <div className='login-footer__icons'>
          <div className='login-twitch'>
            <img
              src={ twitchImgBlue }
              alt='twitch'
              onMouseOut={ (e) => (e.currentTarget.src = twitchImgBlue) }
              onMouseOver={ (e) => (e.currentTarget.src = twitchImg) }
              onClick={ () => AuthUtil.authVia('twitch', this.props.location.pathname) }
            />
          </div>
          <div className='login-facebook'>
            <img
              src={ facebookImgBlue }
              alt='facebook'
              onMouseOut={ (e) => (e.currentTarget.src = facebookImgBlue) }
              onMouseOver={ (e) => (e.currentTarget.src = facebookImg) }
              onClick={ () => AuthUtil.authVia('facebook', this.props.location.pathname) }
            />
          </div>
          <div className='login-youtube'>
            <img
              src={ youtubeImgBlue }
              alt='youtube'
              onMouseOut={ (e) => (e.currentTarget.src = youtubeImgBlue) }
              onMouseOver={ (e) => (e.currentTarget.src = youtubeImg) }
              onClick={ () => AuthUtil.authVia('google', this.props.location.pathname) }
            />
          </div>
          <div className='login-peerplays'>
            <img
              src={ peerplaysImgBlue }
              alt='peerplays'
              onMouseOut={ (e) => (e.currentTarget.src = peerplaysImgBlue) }
              onMouseOver={ (e) => (e.currentTarget.src = peerplaysImg) }
              onClick={ () => this.props.setModalType(ModalTypes.PEERPLAYS_LOGIN) }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setModalType: ModalActions.setModalType
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LoginFooter));
