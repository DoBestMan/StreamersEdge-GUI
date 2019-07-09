
import axios from 'axios';
import Config from '../utility/Config';
import StorageUtil from '../utility/StorageUtil';

const ApiHandler = axios.create({
  withCredentials: true
});

const apiRoot = Config.isDev ? Config.devApiRoute : Config.prodApiRoute;

class ProfileService {
  /**
   * Retrieves information on the currently logged in user's SE profile, and stores it in LS if the promise resolves without issue.
   * @returns {promise} A promise that resolves to a user profile object.
  */
  static getProfile() {
    const query = `${apiRoot}api/v1/profile`;

    return new Promise(async (resolve, reject) => {
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
}

export default ProfileService;
