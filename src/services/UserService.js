import axios from 'axios';
import querystring from 'query-string';

import {Config, GenUtil} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

/**
 * Handles all server calls related to user preferences.
 *
 * @class PrivateUserService
 */
class PrivateUserService {
  /**
   * Update noification settings for current user's preference and stores it in LS if the promise resolves without issue.
   *
   * @param {boolean} notifications - Notification for current logged user.
   * @returns {Promise} A promise that resolves to a update status.
   */
  static updateNotification(notifications) {
    const query = `${apiRoot}api/v1/users/setNotification`;
    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const body = {
        notifications: notifications
      };

      try {
        const response = await ApiHandler.patch(query, querystring.stringify(body), headers);
        return resolve(response.status);
      } catch (err) {
        reject(err.response);
      }
    });
  }

  /**
   * Update invitation settings for current user's preference and stores it in LS if the promise resolves without issue.
   *
   * @param {*} invitation - Invitation settings for current logged user.
   * @returns {Promise} A promise that resolves to a update status.
   */
  static updateInvitation(invitation) {
    const query = `${apiRoot}api/v1/users/setInvitation`;
    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const body = {
        ...invitation
      };

      try {
        const response = await ApiHandler.patch(query, querystring.stringify(body), headers);
        return resolve(response.status);
      } catch (err) {
        reject(err.response);
      }
    });
  }
}

/**
 * Handles all server calls related to User.
 *
 * @class UserSerivce
 */
class UserSerivce {
  /**
   * Update noification settings for current user's preference and stores it in LS if the promise resolves without issue.
   *
   * @param {boolean} notifications - Notification for current logged user.
   * @returns {Promise} A promise that resolves to a update status.
   */
  static updateNotification(notifications) {
    return GenUtil.dummyDataWrapper(PrivateUserService.updateNotification(notifications));
  }

  /**
   * Update invitation settings for current user's preference and stores it in LS if the promise resolves without issue.
   *
   * @param {*} invitation - Invitation settings for current logged user.
   * @returns {Promise} A promise that resolves to a update status.
   */
  static updateInvitation(invitation) {
    return GenUtil.dummyDataWrapper(PrivateUserService.updateInvitation(invitation));
  }

}

export default UserSerivce;
