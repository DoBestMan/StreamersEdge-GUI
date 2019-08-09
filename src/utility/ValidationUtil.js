import {translate} from './GeneralUtils';
import Config from '../utility/Config';
import {UploadFileTypes} from '../constants';
import supportedEmailDomains from '../assets/locales/SupportedEmailDomains.txt';

const PrivateValidationUtils = {
  /**
   * Validate a Streamers Edge username.
   *
   * @param {string} value - Value to validate.
   * @returns {string} Error if one is found.
   * @memberof PrivateValidationUtil
   */
  seUsername(value) {
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
   * @memberof PrivateValidationUtil
   */
  email(email) {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmailDomain = email.length > 0 ? this.emailDomain(email) : false;

    if (!regex.test(email)) {
      return translate('errors.email.invalid');
    } else if(!validEmailDomain) {
      return translate('errors.email.invalidDomain');
    } else {
      return null;
    }
  },
  /**
   *
   *
   * @param {string} email - Email to validate.
   * @returns {boolean} False if domain name is not valid, otherwise true.
   * @memberof PrivateValidationUtil
   */
  emailDomain(email) {
    const regex=/\.([^\.]+?)$/;

    const acceptedDomains = supportedEmailDomains.split('\n');
    const extractedDomain = regex.exec(email)[1];

    return acceptedDomains.includes(extractedDomain.toUpperCase());
  },

  /**
   * Validate a Streamers Edge password.
   *
   * @param {string} password - String to validate.
   * @returns {string} Error if one is found.
   * @memberof PrivateValidationUtil
   */
  sePassword(password) {
    let length = password.length;
    let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%^*#])[A-Za-z\d.@$!%^*#]{4,}$/; //(.@!#$%^*)
    let error = null;

    if (length < 3 || length > 63) {
      error = translate('errors.password.lengthRequirement');
    }

    if (!regex.test(password)) {
      error = translate('errors.password.requires');
    }

    return error;
  },

  /**
   * Validate the search text.
   *
   * @param {string} searchText - Text ti validate.
   * @returns {string} Error if one is found.
   * @memberof PrivateValidationUtil
   */
  search(searchText) {
    let length = searchText.length;
    let error = null;

    if (length < 3 || length > 100) {
      error = translate('errors.search.lengthRequirement');
    }

    if (length === 0) {
      error = translate('errors.password.noBlank');
    }

    return error;
  },

  /**
   * Validate a variable is a number.
   *
   * @param {number} number - Passed in variable to check is a number type.
   * @returns {string} Error if one is found.
   * @memberof PrivateValidationUtil
   */
  number(number) {
    if (typeof number !== 'number') {
      return translate('errors.general.beNumber');
    }
  },

  /**
   * Validate that a variable is a number type with decimals.
   *
   * @param {string} decimalInt - Variable to validate is a number.
   * @returns {string} Error if one is found.
   * @memberof PrivateValidationUtil
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
   * @memberof PrivateValidationUtil
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
   * @memberof PrivateValidationUtil
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
   * Validate an uploaded file's type.
   *
   * @param {Blob} file - File to validate, must be jpeg or png.
   * @returns {boolean} An error string if failed, null if passed.
   * @memberof PrivateValidationUtil
   */
  isImageType(file) {
    return (Config.imageUpload.validTypes.every((type) => file.type !== type))
      ? translate('errors.profile.invalidImageType')
      : null;
  },

  /**
   * Validate an uploaded file's size.
   *
   * @param {Blob} file - File to validate.
   * @param {string} type - Type of file to validate.
   * @returns {string} An error string if failed, null if passed.
   * @memberof PrivateValidationUtil
   */
  fileSize(file, type) {
    switch (type) {
      case UploadFileTypes.IMAGE.PROFILE:
        return (file.size > Config.imageUpload.sizeLimit)
          ? translate('errors.profile.invalidImageSize')
          : null;
      // no default
    }
  }
};

/**
 * Auth Util functions.
 *
 * @namespace ValidationUtil
 */
const ValidationUtil = {
  /**
   * Validate a bounty is a decimal integer.
   *
   * @param {string} number - Variable to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  bounty(number) {
    return PrivateValidationUtils.decimalInteger(number);
  },

  /**
   * Validate challenge conditions are a decimal integer.
   *
   * @param {string} number - Variable to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  challengeConditions(number) {
    return PrivateValidationUtils.decimalInteger(number);
  },

  /**
   * Checks if the profile image to upload is valid depending on the use case defined by `type`.
   *
   * @param {Blob} file - File to validate.
   * @param {string} type - Type of file to validate.
   * @returns {string}
   * @memberof ValidationUtil
   */
  imageUpload(file, type) {
    const validType = PrivateValidationUtils.isImageType(file);
    const validSize = PrivateValidationUtils.fileSize(file, type);
    let err;

    // The type is invalid but the size is valid.
    if (!!validType && !validSize) {
      err = validType;
    }

    // The size is invalid but the type is valid.
    if (!!validSize && !validType) {
      err = validSize;
    }

    // Both are invalid.
    if (!!validType && !!validSize) {
      err = translate('errors.profile.invalidTypeAndSize');
    }

    if (!validType && !validSize) {
      err = null;
    }

    return err;
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
    return PrivateValidationUtils.username(string);
  },

  /**
   * Validate a Streamers Edge password.
   *
   * @param {string} pass - Password from form to validate.
   * @returns {string} - Error if one is found.
   * @memberof ValidationUtil
   */
  sePassword(pass) {
    return PrivateValidationUtils.sePassword(pass);
  },

  /**
   * Validate an email.
   *
   * @param {string} email - Email to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  email(email) {
    return PrivateValidationUtils.email(email);
  },

  /**
   * Validate a Streamers Edge username.
   *
   * @param {string} string - Value to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  seUsername(string) {
    return PrivateValidationUtils.seUsername(string);
  }
};

export default ValidationUtil;