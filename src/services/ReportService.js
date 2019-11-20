import axios from 'axios';
import querystring from 'query-string';

import {Config} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

/**
 * Handles all server calls related to reporting users.
 *
 * @class ReportService
 */
class ReportService {

  /**
   * Report User.
   *
   * @param {string} reportedUserId - User id of reported user.
   * @param {string} reason - Reason for report.
   * @param {string} description - Descrption of report.
   * @returns {Promise} Promise that resolves to status code.
   */

  static async reportUser(reportedUserId, reason, description) {
    const query = `${apiRoot}api/v1/report`;

    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };


    const body = {
      reportedUserId,
      reason,
      description
    };

    return new Promise(async(resolve, reject) => {
      try {
        const response = await ApiHandler.post(query, querystring.stringify(body), headers);
        return resolve(response.data.result);
      } catch (err) {
        let errorObj = err.response.data.error;

        if (typeof errorObj === 'string') {
          return reject(errorObj);
        }

        return reject(errorObj[Object.keys(errorObj)[0]]);
      }
    });
  }
}

export default ReportService;

