import {I18n} from 'react-redux-i18n';
import {Config} from '../utility';

/**
 * Translate the provided string.
 *
 * @param {string} val - String to be used for translation.
 * @param {object} options - Options for inline parameters.
 * @returns {string}
 */
export const translate = (val, options) => {
  if (!!options) {
    return I18n.t(val, options);
  } else {
    return I18n.t(val);
  }
};

/**
 * Wraps Promise APIs and only resolves them if useDummy: false is set in config.
 *
 * @param {*} callback
 * @returns {Promise} - Resolves promise if useDummy: false otherwise reject.
 */

export const dummyDataWrapper = (callback) => {
  return new Promise(
    (resolve, reject) => {

      if(!Config.useDummy) {
        return resolve(callback);
      } else {
        return reject('USING DUMMY DATA');
      }
    });
};

export const validPage = (url) => {
  const path = url.split('/');
  const page = path[2];
  const route = path[1];

  if(route === 'profile' && (page === '1' || page === '2')) {
    return true;
  } else {
    return false;
  }
};