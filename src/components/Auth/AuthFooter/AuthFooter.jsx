import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {AuthUtil, GenUtil} from '../../../utility';
import {
  youtubeImg,
  youtubeImgBlue,
  facebookImg,
  facebookImgBlue,
  twitchImg,
  twitchImgBlue,
  peerplaysImg,
  peerplaysImgBlue
} from '../../../assets/images/socials';


const translate = GenUtil.translate;

// Auth footer component, contains third party auth services banner
// TODO: refactor, remove inline functions
class AuthFooter extends Component {
  render() {
    return (
      <div className='auth-footer'>
        <p className='auth-footer-title'>{translate('login.orLoginWith')}</p>
        <div className='auth-footer__icons'>
          <div className='twitch'>
            <img
              src={ twitchImgBlue }
              alt='twitch'
              onMouseOver={ (e) => (e.currentTarget.src = twitchImg) }
              onMouseOut={ (e) => (e.currentTarget.src = twitchImgBlue) }
              onClick={ () => AuthUtil.authVia('twitch', this.props.location.pathname) } // TODO: refactor to use redux path.
            />
          </div>
          <div className='facebook'>
            <img
              src={ facebookImgBlue }
              alt='facebook'
              onMouseOver={ (e) => (e.currentTarget.src = facebookImg) }
              onMouseOut={ (e) => (e.currentTarget.src = facebookImgBlue) }
              onClick={ () => AuthUtil.authVia('facebook', this.props.location.pathname) } // TODO: refactor to use redux path.
            />
          </div>
          <div className='youtube'>
            <img
              src={ youtubeImgBlue }
              alt='youtube'
              onMouseOver={ (e) => (e.currentTarget.src = youtubeImg) }
              onMouseOut={ (e) => (e.currentTarget.src = youtubeImgBlue) }
              onClick={ () => AuthUtil.authVia('google', this.props.location.pathname) } // TODO: refactor to use redux path.
            />
          </div>
          <div className='peerplays'>
            <img
              src={ peerplaysImgBlue }
              alt='peerplays'
              onMouseOver={ (e) => (e.currentTarget.src = peerplaysImg) }
              onMouseOut={ (e) => (e.currentTarget.src = peerplaysImgBlue) }
              onClick={ () => AuthUtil.authVia('peerplays', this.props.location.pathname) } // TODO: refactor to use redux path.
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AuthFooter);
