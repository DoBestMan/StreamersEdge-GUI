import {I18n} from 'react-redux-i18n';

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