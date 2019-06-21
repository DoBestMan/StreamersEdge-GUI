
import axios from 'axios';
import Config from '../constants/Config';
import querystring from 'query-string';
import StorageUtil from './../utility/StorageUtil';

const ApiHandler = axios.create({
  withCredentials: true
});


const apiRoot = Config.isDev ? Config.devApiRoute : Config.prodApiRoute;

class AuthService {

  // Basic Login via Username and Password
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
  // Basic Sign-Up via email
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

  // Confirm user email
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

  // Send an email for pw reset
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

  // Actually reset the user's pw
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

  // Generic auth for profile creation
  // TODO: Move platform to Redux
  static authorize(code) {
    const platform = StorageUtil.get('se-platform');
    const query = `${apiRoot}api/v1/auth/${platform}/code`;
    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    
    const body = {
      code
    };

    return new Promise(async (resolve, reject) => {
      const response = await ApiHandler.post(query, querystring.stringify(body), headers);
  
      if (response.data.status !== 200) {
        return reject(response);
      }
        
      return resolve(response.data.result);
    });

  }
}

export default AuthService;
