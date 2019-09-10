import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {AuthUtil, GenUtil} from '../../../utility';
import youtubeImg from '../../../assets/images/socials/YouTube.png';
import facebookImg from '../../../assets/images/socials/Facebook.png';
import twitchImg from '../../../assets/images/socials/Twitch.png';
import youtubeImgBlue from '../../../assets/images/socials/YouTube_1.png';
import facebookImgBlue from '../../../assets/images/socials/Facebook_1.png';
import twitchImgBlue from '../../../assets/images/socials/Twitch_1.png';
const translate = GenUtil.translate;

// Auth footer component, contains third party auth services banner
// TODO: refactor, remove inline functions
class AuthFooter extends Component {
  render() {
    return (
      <div className='auth-footer'>
        <p className='auth-footer-title'>{translate('login.orLoginWith')}</p>
        <div className='auth-footer__icons'>
          <img
            className='twitch'
            src={ twitchImgBlue }
            alt='twitch'
            onMouseOver={ (e) => (e.currentTarget.src = twitchImg) }
            onMouseOut={ (e) => (e.currentTarget.src = twitchImgBlue) }
            onClick={ () => AuthUtil.authVia('twitch', this.props.location.pathname) } // TODO: refactor to use redux path.
          />
          <img
            className='facebook'
            src={ facebookImgBlue }
            alt='facebook'
            onMouseOver={ (e) => (e.currentTarget.src = facebookImg) }
            onMouseOut={ (e) => (e.currentTarget.src = facebookImgBlue) }
            onClick={ () => AuthUtil.authVia('facebook', this.props.location.pathname) } // TODO: refactor to use redux path.
          />
          <img
            className='youtube'
            src={ youtubeImgBlue }
            alt='youtube'
            onMouseOver={ (e) => (e.currentTarget.src = youtubeImg) }
            onMouseOut={ (e) => (e.currentTarget.src = youtubeImgBlue) }
            onClick={ () => AuthUtil.authVia('google', this.props.location.pathname) } // TODO: refactor to use redux path.
          />
        </div>
      </div>
    );
  }
}

export default withRouter(AuthFooter);
