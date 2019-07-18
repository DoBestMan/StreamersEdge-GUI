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
  }
};

export default Config;
