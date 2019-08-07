import axios from 'axios';
import querystring from 'query-string';
import {Config} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.apiRoute;

class ChallengeService {
  /**
   * TODO: revisit this function once API has been merged to make sure it works. Code for getChallenge API hasn't been merged yet.
   *
   * @static
   * @returns {Promise}
   * @memberof ChallengeService
   */
  static getChallenges() {
    const query = `${apiRoot}api/v1/challenges`;

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
  /**
   * Works but passing conditions array returns error.
   * TODO figure out why conditions isn't working.
   *
   * @static
   * @param {object} challenge -Object with required fields: {email, endDate, game, accessRule, sUSD, and either conditionsText OR conditions}.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof ChallengeService
   */
  static createChallenge(challenge) {
    let response;
    const query = `${apiRoot}api/v1/challenges`;
    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      // TODO: change ppyAmount inside of reqest body to sUSD once backend has updated API parameters
      const {name, startDate, endDate, game, accessRule, sUSD, conditionsText, conditions} = challenge;
      const body = {
        name: name,
        startDate: startDate,
        endDate: endDate,
        game: game,
        accessRule: accessRule,
        ppyAmount: sUSD,
        conditionsText: conditionsText,
        conditions: conditions
      };

      try {
        response = await ApiHandler.post(query, querystring.stringify(body), headers);

        return resolve(response.data.result);
      } catch (err) {

        return reject(err);
      }
    });
  }
  /**
   * TODO: Once API works this function will have to be revisited to make sure it works. Currrently receiving 404 challenge not found. BROKEN.
   *
   * @static
   * @param {object} invite - Object with required fields: {userId, challengeId}.
   * @returns {Promise}
   * @memberof ChallengeService
   */
  static sendChallengeInvite(invite) {
    let response;
    const query = `${apiRoot}api/v1/challenges/invite`;
    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const {userId, challengeId} = invite;
      const body = {
        userId: userId,
        challengeId: challengeId
      };

      try {
        response = await ApiHandler.post(query, querystring.stringify(body), headers);

        return resolve(response.data.result);
      } catch (err) {

        return reject(err);
      }
    });
  }
  /**
   * Returns challenge object for specified id.
   *
   * @static
   * @param {number} challengeId - Id of the challenge to retrieve.
   * @returns {Promise}
   * @memberof ChallengeService
   */
  static getChallengeById(challengeId) {
    const query = `${apiRoot}api/v1/challenges/${challengeId}`;

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

export default ChallengeService;