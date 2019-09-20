import axios from 'axios';
import querystring from 'query-string';
import {Config, GenUtil} from '../utility';
const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

/**
 * Private class used to wrap functions with dummy data wrapper.
 *
 * @class PrivateAuthService
 */
class PrivateAuthService {
  /**
   * Login via Username and Password.
   *
   * @static
   * @param {object} account - Account object:
   * {
      login: 'username',
      password: 'password
   * }.
   * @returns {Promise}
   * @memberof PrivateAuthService
   */
  static login(account) {
    let response;
    const query = `${apiRoot}api/v1/auth/sign-in`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const body = {
        login: account.login,
        password: account.password
      };

      try {
        response = await ApiHandler.post(query, querystring.stringify(body), headers);
        return resolve(response.data.result);
      } catch (err) {
        return reject(err.response);
      }
    });
  }

  /**
   * Logout the currently authenticated user.
   *
   * @static
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAuthService
   */
  static logout() {
    let response;
    const query = `${apiRoot}api/v1/auth/logout`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      try {
        response = await ApiHandler.post(query, headers);

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.toString());
      }
    });
  }

  /**
   * Sign up via email.
   *
   * @static
   * @param {object} account - User credentials object: {email, username, password, repeatPassword}.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAuthService
   */
  static register(account) {
    let response;
    const query = `${apiRoot}api/v1/auth/sign-up`;
    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const body = {
        email: account.email,
        username: account.username,
        password: account.password,
        repeatPassword: account.repeatPassword
      };

      try {
        response = await ApiHandler.post(query, querystring.stringify(body), headers);
        return resolve(response.data.result);
      } catch (err) {
        let errorObj = err.response.data.error;

        if (typeof errorObj === 'string') {
          return reject(errorObj);
        }

        return reject(errorObj[Object.keys(errorObj)[0]]);
      }

    });
  }

  /**
   * Confirms the user's email.
   *
   * @static
   * @param {string} token - Token generated from the backend api.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAuthService
   */
  static confirmEmail(token) {
    let response;
    const query = `${apiRoot}api/v1/auth/confirm-email/${token}`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      try {
        response = await ApiHandler.get(query, headers);

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.toString());
      }
    });
  }

  /**
   * Send an email that contains a password reset token.
   *
   * @static
   * @param {string} email - The email of the account.
   * @returns {Promise} A promise that indicates success or failure.
   * @memberof PrivateAuthService
   */
  static forgotPassword(email) {
    let response;
    const query = `${apiRoot}api/v1/auth/forgot-password`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const body = {
        email: email
      };

      try {
        response = await ApiHandler.post(query, querystring.stringify(body), headers);

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.toString());
      }
    });

  }

  /**
   * Reset the user's password.
   *
   * @static
   * @param {string} token - Token generated from the backend api.
   * @param {string} newPassword - The user's new password.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAuthService
   */
  static resetPassword(token, newPassword) {
    let response;
    const query = `${apiRoot}api/v1/auth/reset-password`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const body = {
        token,
        password: newPassword,
        repeatPassword: newPassword
      };

      try {
        response = await ApiHandler.post(query, querystring.stringify(body), headers);

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.toString());
      }
    });
  }

  /**
   *
   *
   * @static
   * @param {object} account - User object:
   * {
      "id": 7,
      "username": "test",
      "email": "test@email.com",
      "twitchUserName": "",
      "googleName": "",
      "youtube": "",
      "facebook": "",
      "twitch": "",
      "peerplaysAccountName": "",
      "bitcoinAddress": "",
      "userType": "viewer",
      "avatar": ""
   * }.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAuthService
   */
  static linkPeerplaysAccount(account) {
    let response;
    const query = `${apiRoot}api/v1/profile`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const body = {
        peerplaysAccountName: account.peerplaysAccountName
      };

      try {
        response = await ApiHandler.patch(query, querystring.stringify(body), headers);

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.toString());
      }
    });
  };

  /**
   * Calls the users API to obtain a full list of every user in the app, up to the limit parameter provided.
   *
   * @static
   * @returns {number} A promise indicating success by listing user objects.
   * @memberof PrivateAuthService
   */
  static getUserList() {
    let response;
    const query = `${apiRoot}api/v1/users`;
    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const parameters = {params:
        {
          search: '',
          limit: Config.userSearchLimit
        }
      };

      try {
        response = await ApiHandler.get(query, parameters, headers);
        return resolve(response.data.result);

      } catch(err) {
        return reject(err.toString());
      }

    });
  }
}

/**
 * Handles all server calls related to Streamers Edge accounts.
 *
 * @class AuthService
 */
class AuthService {
  /**
   *
   *
   * @static
   * @param {object} account - Account object.
   * @returns {Promise} Returns login promise wrapped in dummy data wrapper function.
   * @memberof AuthService
   */
  static login(account) {
    return GenUtil.dummyDataWrapper(PrivateAuthService.login(account));
  }

  /**
   *
   *
   * @static
   * @returns {Promise} Returns logout promise wrapped in dummy data wrapper function.
   * @memberof AuthService
   */
  static logout() {
    return GenUtil.dummyDataWrapper(PrivateAuthService.logout());
  }

  /**
   *
   * @static
   * @param {object} account
   * @returns Returns register promise wrapped in dummy data wrapper function.
   * @memberof AuthService
   */

  static register(account) {
    return GenUtil.dummyDataWrapper(PrivateAuthService.register(account));
  }

  /**
   *
   *
   * @static
   * @param {string} token - Token generated from the backend api.
   * @returns {Promise} Returns confirmEmail promise wrapped in dummy data wrapper function.
   * @memberof AuthService
   */
  static confirmEmail(token) {
    return GenUtil.dummyDataWrapper(PrivateAuthService.confirmEmail(token));
  }

  /**
   * Send an email that contains a password reset token.
   *
   * @static
   * @param {string} email - The email of the account.
   * @returns {Promise} Returns forgotPassword promise wrapped in dummy data wrapper function.
   * @memberof AuthService
   */
  static forgotPassword(email) {
    return GenUtil.dummyDataWrapper(PrivateAuthService.forgotPassword(email));
  }

  /**
   * Reset the user's password.
   *
   * @static
   * @param {string} token - Token generated from the backend api.
   * @param {string} newPassword - The user's new password.
   * @returns {Promise} - Returns resetPassword promise wrapped in dummy data wrapper function.
   * @memberof AuthService
   */
  static resetPassword(token, newPassword) {
    return GenUtil.dummyDataWrapper(PrivateAuthService.resetPassword(token, newPassword));
  }

  /**
   *
   *
   * @static
   * @param {object} account - User object.
   * @returns {Promise} - Returns linkPeerplaysAccount promise wrapped in dummy data wrapper function.
   * @memberof AuthService
   */
  static linkPeerplaysAccount(account) {
    return GenUtil.dummyDataWrapper(PrivateAuthService.linkPeerplaysAccount(account));
  }

  /**
   * Calls the users API to obtain a full list of every user in the app, up to the limit parameter provided.
   *
   * @static
   * @returns {number} Returns getUserList promise wrapped in dummy data wrapper function.
   * @memberof AuthService
   */
  static getUserList() {
    return GenUtil.dummyDataWrapper(PrivateAuthService.getUserList());
  }

  /**
   * Donate Stream_USD.
   * TODO: Update once backend is ready.
   *
   * @static
   * @param {string} account - The account name to donate to.
   * @param {string} value - The amount of Stream_USD to send.
   * @returns {Promise}
   * @memberof AuthService
   */
  static donate(account, value) {
    let response;
    const query = `${apiRoot}api/v1/payment`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const body = {
        account,
        value
      };

      try {
        response = await ApiHandler.post(query, querystring.stringify(body), headers);
        return resolve(response.data.result);
      } catch (err) {
        return reject(err.toString());
      }
    });
  }
}

export default AuthService;
