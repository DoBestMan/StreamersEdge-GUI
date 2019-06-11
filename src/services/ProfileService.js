
import axios from 'axios';
import Config from '../constants/Config';

const ApiHandler = axios.create({
  withCredentials: true
});

const apiRoot = Config.isDev ? Config.devApiRoute : Config.prodApiRoute;

class ProfileService {

  // Retrieve information on the user's SE profile.
  static getProfile() {
    const query = `${apiRoot}api/v1/profile`;

    return new Promise(async (resolve, reject) => {
      const response = await ApiHandler.get(query);
  
      if (response.data.status !== 200) {
        return reject(response);
      }
        
      return resolve(response.data.result);
    });
  }
}

export default ProfileService;
