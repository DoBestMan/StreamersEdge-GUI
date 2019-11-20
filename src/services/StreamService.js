// TODO: write unit tests
// TODO: document
import axios from 'axios';
import {Config, GenUtil} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

class PrivateStreamService {
  /**
   *
   *
   * @static
   * @param {number} id - Id of stream object.
   * @returns {Promise} Promise indicating success or failure.
   * @memberof PrivateStreamService
   */
  static fetchStream(id) {
    let response;
    const query = `${Config.apiRoute}api/v1/stream/${id}`;

    return new Promise(async(resolve, reject) => {
      try {
        response = await ApiHandler.get(query);

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.toString());
      }
    });
  }
}

/**
 *
 *
 * @static
 * @param {number} id - Id of stream object.
 * @returns {Promise} Promise indicating success or failure wrapped in dummy data wrapper.
 * @memberof StreamService
 */
class StreamService {
  static fetchStream(id) {
    return GenUtil.dummyDataWrapper(PrivateStreamService.fetchStream(id));
  }
}

export default StreamService;
