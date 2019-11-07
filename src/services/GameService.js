import axios from 'axios';
import {Config, GenUtil} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

/**
 * Handles all server calls related to game.
 *
 * @class PrivateGameService
 */
class PrivateGameService {
  /**
   * Retrives all game status.
   *
   * @returns {Promise} A promise that resolves to a game status.
   */
  static getGameStats() {
    const query = `${apiRoot}api/v1/game/stats`;
    return new Promise(async(resolve, reject) => {
      const response = await ApiHandler.get(query);

      if (response.data.status === 401) {
        return reject(response);
      }

      if (response.data.status !== 200) {
        return reject(response);
      }

      return resolve(response.data.result);
    });
  }
}

/**
 * Handles all server calls related to game.
 *
 * @class PrivateGameService
 */
class GameService {
  /**
   * Retrives all game status.
   *
   * @returns {Promise} A promise that resolves to a game status.
   */
  static getGameStats() {
    return GenUtil.dummyDataWrapper(PrivateGameService.getGameStats());
  }
}

export default GameService;
