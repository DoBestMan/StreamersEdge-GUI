import Config from '../constants/Config';
import AuthService from '../services/AuthService';

const AuthUtil = {
  // 3rd Party Auth function that redirects the user to their auth portal.
  authVia(platform) {
    const supportedPlatforms = Config.supportedPlatforms;

    if (supportedPlatforms.includes(platform.toLowerCase())) {
      switch (platform) {
        case 'twitch':
          AuthService.getRedirect('twitch').then((response) => {
            window.location.assign(response);
          }).catch((error) => {
            console.warn(error);
          });
          break;
        case 'google':
          AuthService.getRedirect('google').then((response) => {
            window.location.assign(response);
          }).catch((error) => {
            console.warn(error);
          });
          break;
        case 'facebook':
          break;
        default:
          console.warn('Error');
          break;
      }
    }
  }
};

export default AuthUtil;