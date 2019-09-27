import axios from 'axios';
import {Config, StorageUtil, GenUtil} from '../utility';
import querystring from 'query-string';

const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

/**
 * Handles all server calls related to profiles.
 *
 * @class PrivateProfileService
 */
class PrivateProfileService {
  /**
   * Retrieves information on the currently logged in user's SE profile, and stores it in LS if the promise resolves without issue.
   *
   * @returns {Promise} A promise that resolves to a user profile object.
   */
  static getProfile() {
    const query = `${apiRoot}api/v1/profile`;
    return new Promise(async(resolve, reject) => {
      const response = await ApiHandler.get(query);

      if (response.data.status === 401) {
        StorageUtil.remove('se-user');
      }

      if (response.data.status !== 200) {
        return reject(response);
      }

      StorageUtil.set('se-user', JSON.stringify(response.data.result));
      return resolve(response.data.result);
    });
  }

  /**
   *
   *
   * @static
   * @param {object} account - Contains object with updated account fields.
   * @returns {Promise} - A promise that resolves to an updated user profile object wrapped by dummy data wrapper.
   * @memberof ProfileService
   */
  static updateProfile(account) {
    let response;
    const query = `${apiRoot}api/v1/profile`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const body = {
        email: account.email,
        twitchUserName: account.twitchUserName,
        googleName: account.googleName,
        facebook: account.facebook,
        pubgUsername: account.pubgUsername,
        peerplaysAccountName: account.peerplaysAccountName,
        userType: account.userType
      };

      try {
        response = await ApiHandler.patch(query, querystring.stringify(body), headers);
        return resolve(response.data.result);
      } catch (err) {
        return reject(err.response);
      }
    });
  }

  /**
   * Reconnect to blockchain in case of disconnect.
   *
   * @param {Blob} image - Image as Blob.
   * @returns {Promise}
   * @memberof PrivateProfileService
   */
  static uploadProfilePicture(image) {
    // POST /api/v1/profile/avatar
    let response;
    const query = `${apiRoot}api/v1/profile/avatar`;
    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      try {
        response = await ApiHandler.post(query, image, headers);
        return resolve(response.data.result);

      } catch(err) {
        return reject(err.toString());
      }


    });
  }
}

/**
 * Handles all server calls related to profiles.
 *
 * @class ProfileService
 */
class ProfileService {
  /**
   * Retrieves information on the currently logged in user's SE profile, and stores it in LS if the promise resolves without issue.
   *
   * @returns {Promise} A promise that resolves to a user profile object wrapped by dummy data wrapper.
   */
  static getProfile() {
    return GenUtil.dummyDataWrapper(PrivateProfileService.getProfile());
  }

  /**
   *
   * @param {object} account - Contains object with updated account fields.
   * @static
   * @returns {Promise} A promise that resolves to an updated user profile object wrapped by dummy data wrapper.
   * @memberof ProfileService
   */
  static updateProfile(account) {
    return GenUtil.dummyDataWrapper(PrivateProfileService.updateProfile(account));
  }

  /**
   * Reconnect to blockchain in case of disconnect.
   *
   * @param {Blob} image - Image as Blob.
   * @returns {Promise} - A promise that indicates success or failure wrapped in dummy data wrapper.
   * @memberof ProfileService
   */
  static uploadProfilePicture(image) {
    return GenUtil.dummyDataWrapper(PrivateProfileService.uploadProfilePicture(image));
  }

}

export default ProfileService;
