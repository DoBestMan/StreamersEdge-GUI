import {version} from '../../package.json';

const isDev = true;
const [devApiRoute, prodApiRoute] = ['http://localhost:3000/', ''];

/**
 * @namespace Config
 */
const Config = {
  /**
   * @type {boolean}
   * @memberof Config
   */
  isDev: isDev,
  /**
   * If set to true the app will use a set of dummy data. Use this when APIs are not working.
   *
   * @type {boolean}
   */
  useDummy: false,
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
  devApiRoute: devApiRoute,
  /**
   * The root endpoint to hit for production.
   *
   * @type {string}
   * @memberof Config
   */
  prodApiRoute: prodApiRoute,
  apiRoute: isDev ? devApiRoute : prodApiRoute,
  /**
   * Toggles the requirement for authenticated routes needing a logged in user.
   *
   * @type {boolean}
   * @memberof Config
   */
  requireAuthentication: false,
  /**
   * List of platforms supported for OAuth.
   *
   * @type {string[]}
   * @memberof Config
   */
  supportedPlatforms: ['twitch', 'google', 'facebook', 'peerplays'],
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
