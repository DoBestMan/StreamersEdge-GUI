// TODO: write unit tests
// TODO: document
import axios from 'axios';
import {Config} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

class StreamService {
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

export default StreamService;
