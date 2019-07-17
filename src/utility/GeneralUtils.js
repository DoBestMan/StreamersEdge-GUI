import {I18n} from 'react-redux-i18n';

/**
 * Translate the provided string.
 *
 * @param {string} val - String to be used for translation.
 * @returns {string}
 */
export const translate = (val) => {
  return I18n.t(val);
};