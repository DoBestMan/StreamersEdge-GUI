import React, {Component} from 'react';
import youtubeImg from '../../../assets/images/signup/youtube.svg';
import facebookImg from '../../../assets/images/signup/facebook.svg';
import twitchImg from '../../../assets/images/signup/twitch.svg';
import AuthUtil from '../../../utility/AuthUtil';

class RegisterFooter extends Component {

  render() {
    return(
      <div className='register-footer'>
        <p>Or Login with</p>
        <div className='register-footer__icons'>
          <img className='register-twitch' src={ twitchImg } alt='twitch' onClick={ () => AuthUtil.authVia('twitch') }/>
          <img className='register-facebook' src={ facebookImg } alt='facebook' onClick={ () => AuthUtil.authVia('facebook') } />
          <img className='register-youtube' src={ youtubeImg } alt='youtube' onClick={ () => AuthUtil.authVia('google') } />
        </div>
      </div>
    );
  }
}

export default (RegisterFooter);
