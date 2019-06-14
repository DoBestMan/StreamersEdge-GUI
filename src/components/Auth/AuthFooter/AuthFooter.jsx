import React, {Component} from 'react';
import youtubeImg from '../../../assets/images/signup/youtube.svg';
import facebookImg from '../../../assets/images/signup/facebook.svg';
import twitchImg from '../../../assets/images/signup/twitch.svg';
import AuthUtil from '../../../utility/AuthUtil';
import {withRouter} from 'react-router-dom';

class AuthFooter extends Component {

  render() {
    return(
      <div className='auth-footer'>
        <p>Or Login with</p>
        <div className='auth-footer__icons'>
          <img className='auth-twitch' src={ twitchImg } alt='twitch' onClick={ () => AuthUtil.authVia('twitch', this.props.location.pathname) }/>
          <img className='auth-facebook' src={ facebookImg } alt='facebook' onClick={ () => AuthUtil.authVia('facebook', this.props.location.pathname) } />
          <img className='auth-youtube' src={ youtubeImg } alt='youtube' onClick={ () => AuthUtil.authVia('google', this.props.location.pathname) } />
        </div>
      </div>
    );
  }
}

export default withRouter(AuthFooter);
