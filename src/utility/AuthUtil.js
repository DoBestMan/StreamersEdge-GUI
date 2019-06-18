import Config from '../constants/Config';
import StorageUtil from '../utility/StorageUtil';

const apiRoot = Config.isDev ? Config.devApiRoute : Config.prodApiRoute;


const AuthUtil = {
  /**
   * A wrapper for the 3rd party authentication service
   * Handles fetching of redirect URL, all redirect activities, and storing of session.
   * @param {string} platform - the platform to authenticate on
   * @param {string} page - the name of the page in which the authentication is happening on - this is a workaround
   * to only having one callback URL.
   * NOTE: The redirect URL after success/failed auth is set on the BACKEND, it cannot be controlled from the client.
   */
  authVia(platform, page) {
    const supportedPlatforms = Config.supportedPlatforms;
    StorageUtil.set('se-platform', platform);
    StorageUtil.set('se-page', page);

    console.log('Redirecting from - ' + page);

    if (supportedPlatforms.includes(platform.toLowerCase())) {
      let authUrl;

      switch (platform) {
        case 'twitch':
          authUrl = `${apiRoot}api/v1/auth/twitch`;
          window.location.assign(authUrl);
          break;
        case 'google':
          authUrl = `${apiRoot}api/v1/auth/google`;
          window.location.assign(authUrl);
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