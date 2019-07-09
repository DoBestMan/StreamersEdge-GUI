
import axios from 'axios';
import Config from '../utility/Config';
import querystring from 'query-string';

const ApiHandler = axios.create({
  withCredentials: true
});


const apiRoot = Config.isDev ? Config.devApiRoute : Config.prodApiRoute;

class AuthService {

  /**
   * Login via Username and Password
   * @param {object} account: user credentials object: login, password
   * @returns {promise} A promise that indicates success or failure
  */
  static login(account) {
    let response;
    const query = `${apiRoot}api/v1/auth/sign-in`;
    return new Promise(async (resolve, reject) => {
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

      } catch(err) {
        return reject(err.toString());
      }

    });
  }

  /**
   * Logout the currently authenticated user
   * @returns {promise} A promise that indicates success or failure
  */
  static logout() {
    let response;
    const query = `${apiRoot}api/v1/auth/logout`;
    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      try {
        response = await ApiHandler.post(query, headers);
        return resolve(response.data.result);

      } catch(err) {
        return reject(err.toString());
      }

    });
  }

  /**
   * Sign up via email
   * @param {object} account: user credentials object: email, username, password, repeatPassword
   * @returns {promise} A promise that indicates success or failure
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

      } catch(err) {
        return reject(err.toString());
      }

    });
  }

  /**
   * Confirms the user's email
   * @param {string} token: token generated from the backend api
   * @returns {promise} A promise that indicates success or failure
  */
  static confirmEmail(token) {
    let response;
    const query = `${apiRoot}api/v1/auth/confirm-email/${token}`;

    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      try {
        response = await ApiHandler.get(query, headers);
        return resolve(response.data.result);

      } catch(err) {
        return reject(err.toString());
      }
    });

  }

  /**
   * Send an email that contains a password reset token
   * @param {string} email: The email of the account
   * @returns {promise} A promise that indicates success or failure
  */
  static forgotPassword(email) {
    let response;
    const query = `${apiRoot}api/v1/auth/forgot-password`;

    return new Promise(async (resolve, reject) => {
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

      } catch(err) {
        return reject(err.toString());
      }
    });

  }

  /**
   * Reset the user's password
   * @param {string} token: token generated from the backend api
   * @param {string} newPassword: the user's new password
   * @returns {promise} A promise that indicates success or failure
  */
  static resetPassword(token, newPassword) {
    let response;
    const query = `${apiRoot}api/v1/auth/reset-password`;

    return new Promise(async (resolve, reject) => {
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

      } catch(err) {
        return reject(err.toString());
      }
    });
  }

  static linkPeerplaysAccount(account) {
    let response;
    const query = `${apiRoot}api/v1/profile`;
    return new Promise(async (resolve, reject) => {
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

      } catch(err) {
        return reject(err.toString());
      }


    });
  };
}

export default AuthService;
