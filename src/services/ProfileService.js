import axios from 'axios';
import Config from '../utility/Config';
import {StorageUtil} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

/**
 * Handles all server calls related to profiles.
 *
 * @class ProfileService
 */
class ProfileService {
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
   * Reconnect to blockchain in case of disconnect.
   *
   * @param {Blob} image - Image as Blob.
   * @returns {Promise}
   * @memberof ProfileService
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

export default ProfileService;
