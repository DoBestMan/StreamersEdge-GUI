import Config from '../constants/Config';
import AuthService from '../services/AuthService';
import StorageUtil from '../utility/StorageUtil';

const AuthUtil = {
  /**
   * A wrapper for the 3rd party authentication service
   * Handles fetching of redirect URL, all redirect activities, and storing of session.
   * @param {string} platform - the platform to authenticate on
   * @param {string} page - the name of the page in which the authentication is happening on - this is a workaround
   * to only having one callback URL.
   */
  authVia(platform, page) {
    const supportedPlatforms = Config.supportedPlatforms;
    StorageUtil.set('se-platform', platform);
    StorageUtil.set('se-page', page);

    console.log('Redirecting from - ' + page);

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