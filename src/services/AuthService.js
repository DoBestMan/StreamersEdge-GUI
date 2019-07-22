import axios from 'axios';
import querystring from 'query-string';
import {Config} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

/**
 * Handles all server calls related to Streamers Edge accounts.
 *
 * @class AuthService
 */
class AuthService {
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
   * @memberof AuthService
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
        return reject(err.toString());
      }
    });
  }

  /**
   * Logout the currently authenticated user.
   *
   * @static
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof AuthService
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
   * @memberof AuthService
   */
  static register(account) {
    let response;
    const query = `${apiRoot}api/v1/auth/sign-up`;

    return new Promise(async(resolve, reject) => {
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
        return reject(err.toString());
      }

    });
  }

  /**
   * Confirms the user's email.
   *
   * @static
   * @param {string} token - Token generated from the backend api.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof AuthService
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
   * @memberof AuthService
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
   * @memberof AuthService
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
   * @memberof AuthService
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
}

export default AuthService;
