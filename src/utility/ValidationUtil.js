import {translate} from './GeneralUtils';
import Config from '../utility/Config';

/**
 * Auth Util functions.
 *
 * @namespace ValidationUtil
 */
const ValidationUtil = {
  /**
   * Validate a Streamers Edge username.
   *
   * @param {string} value - Value to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  username(value) {
    var label = void 0;
    var ref = void 0;
    var prefix = void 0;

    prefix = translate('errors.username.prefix1');

    var length = value.length;
    let error = null;

    if (length === 0) {
      error = prefix + translate('errors.username.notEmpty');
    }

    if (length < 3) {
      error = prefix + translate('errors.username.longer');
    }

    if (length > 63) {
      error = prefix + translate('errors.username.shorter');
    }

    if (/\./.test(value)) {
      prefix = translate('errors.username.prefix2');
    }

    ref = value.split('.');

    for (var i = 0, len = ref.length; i < len; i++) {
      label = ref[i];

      if (!/^[~a-z]/.test(label)) {
        error = prefix + translate('errors.username.startLetter');
      }

      if (!/^[~a-z0-9-]*$/.test(label)) {
        error = prefix + translate('errors.username.lettersDigitsDashes');
      }

      if (/--/.test(label)) {
        error = prefix + translate('errors.username.oneDash');
      }

      if (!/[a-z0-9]$/.test(label)) {
        error = prefix + translate('errors.username.endAlphanumeric');
      }

      if (!(label.length >= 3)) {
        error = prefix + translate('errors.username.longer');
      }
    }

    return error;
  },

  /**
   * Validate an email.
   *
   * @param {string} email - Email to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  email(email) {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regex.test(email)) {
      return translate('errors.email.invalid');
    } else {
      return null;
    }
  },

  /**
   * Validate a Streamers Edge password.
   *
   * @param {string} password - String to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  password(password) {
    let length = password.length;
    let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%^*#])[A-Za-z\d.@$!%^*#]{4,}$/; //(.@!#$%^*)
    let error = null;

    if (length < 3 || length > 63) {
      error = translate('errors.password.lengthRequirement');
    }

    if(!regex.test(password)) {
      error = translate('errors.password.requires');
    }

    return error;
  },

  /**
   * Validate the search text.
   *
   * @param {string} searchText - Text ti validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  search(searchText) {
    let length = searchText.length;
    let error = null;

    if(length < 3 || length > 100) {
      error = translate('errors.search.lengthRequirement');
    }

    if(length === 0) {
      error = translate('errors.password.noBlank');
    }

    return error;
  },

  /**
   * Validate a variable is a number.
   *
   * @param {number} number - Passed in variable to check is a number type.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  number(number) {
    if(typeof number !== 'number') {
      return translate('errors.general.beNumber');
    }
  },

  /**
   * Validate that a variable is a number type with decimals.
   *
   * @param {string} decimalInt - Variable to validate is a number.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  decimalInteger(decimalInt) {
    var regexp = /^[0-9]+([,.][0-9]+)?$/g;

    if (!regexp.test('a') && !Number.isNumber(decimalInt)) {
      return translate('errors.general.beDecimalOrInt');
    }
  },

  /**
   * Validate a date.
   *
   * @param {Date} date - Variable to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  startDate(date) {
    const today = new Date();
    let error = null;

    if (!Date.parse(date)) {
      error = translate('errors.date.invalid');
    }

    if (today.toDateString() !== date.toDateString()) {
      error = translate('errors.date.beToday');
    }

    return error;
  },

  /**
   * Validate that a pair of dates are correct. EndDate must be greater than start date.
   *
   * @param {Date} startDate - Date one.
   * @param {Date} endDate - Date two.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  endDate(startDate, endDate) {
    let error = null;

    if (!Date.parse(startDate) || !Date.parse(endDate)) {
      error = translate('errors.date.invalid');
    }

    if (Date.parse(startDate) > Date.parse(endDate)) {
      error = translate('errors.date.startLessThanEnd');
    }

    return error;
  },

  /**
   * Validate a string is a username.
   *
   * @deprecated
   * @param {string} string - String to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  inviteGamer(string) {
    return this.Username(string);
  },

  /**
   * Validate a bounty is a decimal integer.
   *
   * @param {string} number - Variable to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  bounty(number) {
    return this.DecimalInteger(number);
  },

  /**
   * Validate challenge conditions are a decimal integer.
   *
   * @param {string} number - Variable to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  challengeConditions(number) {
    return this.DecimalInteger(number);
  },

  /**
   * Validate an uploaded file's type.
   *
   * @param {Blob} file - File to validate, must be jpeg or png.
   * @returns {boolean} An error string if failed, null if passed.
   * @memberof ValidationUtil
   */
  imageType(file) {
    return (Config.imageUpload.validTypes.every((type) => file.type !== type)) ? translate('errors.profile.imageTypeUnsupported') : null;
  },

  /**
   * Validate an uploaded file's size.
   *
   * @param {Blob} file - File to validate.
   * @returns {boolean} An error string if failed, null if passed.
   * @memberof ValidationUtil
   */
  fileSize(file) {
    return (file.size > Config.imageUpload.sizeLimit) ? translate('errors.profile.maxFileSize') : null;
  }
};

export default ValidationUtil;