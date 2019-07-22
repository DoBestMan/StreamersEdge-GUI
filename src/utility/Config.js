import {version} from '../../package.json';

/**
 * @namespace Config
 */
const Config = {
  /**
   * @type {boolean}
   * @memberof Config
   */
  isDev: true,
  /**
   * The current version of the app pulled from package.json.
   *
   * @type {string}
   */
  version,
  /**
   * The root endpoint to hit for development.
   *
   * @type {string}
   * @memberof Config
   */
  devApiRoute: 'http://localhost:3000/',
  /**
   * The root endpoint to hit for production.
   *
   * @type {string}
   * @memberof Config
   */
  prodApiRoute: '',
  /**
   * Toggles the requirement for authenticated routes needing a logged in user.
   *
   * @type {boolean}
   * @memberof Config
   */
  requireAuthentication: true,
  /**
   * List of platforms supported for OAuth.
   *
   * @type {string[]}
   * @memberof Config
   */
  supportedPlatforms: ['twitch', 'google', 'facebook'],
  /**
   * Image upload file limitations.
   *
   * @type {Blob}
   */
  imageUpload: {
    sizeLimit: 1024000, // 1mb
    validTypes: ['image/png', 'image/jpeg'] // array of valid file upload types
  },
  /**
   * Specifies how many results are returned when calling get all users.
   *
   * @type {number}
   * @memberof Config
   */
  userSearchLimit: 100
};

export default Config;