import {translate} from './GeneralUtils';
import Config from '../utility/Config';
import {UploadFileTypes} from '../constants';
import supportedEmailDomains from '../assets/locales/SupportedEmailDomains.txt';
import {EOL} from 'os';

const PrivateValidationUtils = {
  /**
   * Validate a Streamers Edge username.
   *
   * @param {string} username - Username to validate.
   * @returns {string} Error if one is found.
   * @memberof PrivateValidationUtil
   */
  seUsername(username) {
    const length = username.length;
    const lowercaseRegex = /[a-z]/g;
    const uppercaseRegex = /[A-Z]/g;
    const digitOrLetterRegex = /[0-9a-z]/g;
    const digitLetterHyphenRegex = /[^0-9a-zA-Z-]/g;

    let beginsWithLetter = false, endsWithLetterOrDigit = false, containsOnlyNumberDigitHyphens = true, uppercasePresent = true, validLength=false;

    if (length >= 3 && length <=60) {
      validLength = true;
    }

    if (lowercaseRegex.test(username[0])) {
      beginsWithLetter = true;
    }

    if (uppercaseRegex.test(username)) {
      uppercasePresent = false;
    }

    if(digitOrLetterRegex.test(username[length-1])){
      endsWithLetterOrDigit = true;
    }

    if(digitLetterHyphenRegex.test(username)){
      containsOnlyNumberDigitHyphens = false;
    }

    const errorBoxUsernameValidation = [
      {errorString: translate('errors.username.requirement.length'), success: validLength},
      {errorString: translate('errors.username.requirement.beginsWithLetter'), success: beginsWithLetter},
      {errorString: translate('errors.username.requirement.endsWithLowercaseOrDigit'), success: endsWithLetterOrDigit},
      {errorString: translate('errors.username.requirement.onlyContainsLettersDigitHyphens'), success: containsOnlyNumberDigitHyphens},
      {errorString: translate('errors.username.requirement.noUppercase'), success: uppercasePresent}
    ];
    return {
      errors: errorBoxUsernameValidation,
      success: errorBoxUsernameValidation.filter((err) => !err.success).length <= 0
    };
  },

  /**
   * Validate string to see if it is empty.
   *
   * @param {string} string - Email to validate.
   * @returns {{success: boolean, errors: *[]}} Error if one is found.
   * @memberof PrivateValidationUtil
   */
  emptyString(string) {

    const emptyStringRegex = /^$|\s+/g;
    let noEmptyString = true;

    if(emptyStringRegex.test(string)) {
      noEmptyString = false;
    }

    const errorBoxUsernameValidation = [
      {errorString: translate('errors.username.requirement.noBlankUsername'), success: noEmptyString}
    ];

    return {
      errors: errorBoxUsernameValidation,
      success: errorBoxUsernameValidation.filter((err) => !err.success).length <= 0
    };
  },

  /**
   * Validate an email.
   *
   * @param {string} email - Email to validate.
   * @returns {{success: boolean, errors: *[]}} Error if one is found.
   * @memberof PrivateValidationUtil
   */
  email(email) {
    let regex = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;

    const validEmailDomain = email.length > 0 ? this.emailDomain(email) : false;
    let validEmail = true;

    if (!regex.test(email)) {
      validEmail = false;
    }

    const errorBoxEmailValidation = [
      {errorString: translate('errors.email.invalid'), success: validEmail},
      {errorString: translate('errors.email.invalidDomain'), success: validEmailDomain}
    ];
    return {
      errors: errorBoxEmailValidation,
      success: errorBoxEmailValidation.filter((err) => !err.success).length <= 0
    };
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
    const lineBreak = EOL;
    const acceptedDomains = supportedEmailDomains.split(lineBreak);
    const extractedDomain = regex.exec(email);
    return extractedDomain === null ? false : acceptedDomains.includes(extractedDomain[1].toUpperCase());
  },

  /**
   * Validate a Streamers Edge password.
   *
   * @param {string} password - String to validate.
   * @returns {{success: boolean, errors: *[]}} Error if one is found.
   * @memberof PrivateValidationUtil
   */
  sePassword(password) {
    const length = password.length;
    const digitRegex = /[0-9]/g;
    const specialCharRegex = /[().@$!%^*#]/g;
    const spaceRegex = /[ ]/g;
    const unallowedCharsRegex = /[&/:;<=>+?_{},'"|~`]/g;


    let minLength = false, numberPresent = false, specialCharacterPresent = false,
      spacePresent = false, unallowedSpecialCharacter = false;

    if (length >= 6 && length <=60) {
      minLength = true;
    }

    if(digitRegex.test(password)){
      numberPresent = true;
    }

    if(specialCharRegex.test(password)){
      specialCharacterPresent = true;
    }

    if(spaceRegex.test(password)){
      spacePresent = true;
    }

    if(unallowedCharsRegex.test(password)){
      unallowedSpecialCharacter = true;
    }

    const errorBoxPasswordValidation = [
      {errorString: translate('errors.password.requirement.length'), success: minLength},
      {errorString: translate('errors.password.requirement.number'), success: numberPresent},
      {errorString: translate('errors.password.requirement.specialChar'), success: specialCharacterPresent},
      {errorString: translate('errors.password.requirement.unallowedSpecialChar'), success: !unallowedSpecialCharacter},
      {errorString: translate('errors.password.requirement.noSpaces'), success: !spacePresent}
    ];
    return {
      errors: errorBoxPasswordValidation,
      success: errorBoxPasswordValidation.filter((err) => !err.success).length <= 0
    };
  },

  /**
   * Confirm a Streamers Edge password.
   *
   * @param {string} password - Password from form to validate.
   * @param {string} confirmPassword - Password from form to validate.
   * @returns {{success: boolean, errors: *[]}} Error if one is found.
   * @memberof ValidationUtil
   */
  seConfirmPassword(password, confirmPassword) {
    const errorBoxPasswordValidation = [
      {errorString: translate('errors.password.confirmPassword'), success: password === confirmPassword}
    ];
    return {
      errors: errorBoxPasswordValidation,
      success: password === confirmPassword
    };
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
  },

  /**
   * Validate a challenge name.
   *
   * @param {string} name - Value to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  challengeName(name) {
    const length = name.length;
    let validLength = false, validRequired = false;

    if (length <= 50) {
      validLength = true;
    }

    if (length > 0) {
      validRequired = true;
    }

    const errorBoxUsernameValidation = [
      {errorString: translate('errors.challengeName.requirement.required'), success: validRequired},
      {errorString: translate('errors.challengeName.requirement.length'), success: validLength}
    ];

    return {
      errors: errorBoxUsernameValidation,
      success: errorBoxUsernameValidation.filter((err) => !err.success).length <= 0
    };
  },

  /**
   *
   * @param {string} string - Challenge name to validate.
   * @param {string} string - Challenge game to validate.
   * @returns {string} Error if one is found.
   * @memberof PrivateValidationUtil
   */

  challengeNameAndGame(name, game) {
    const length = name.length;
    let validNameRequired = false, validNameLength = false, validGameRequired = false;

    if (length > 0) {
      validNameRequired = true;
    }

    if (length <= 50) {
      validNameLength = true;
    }

    if (game.length > 0) {
      validGameRequired = true;
    }

    const errorBoxUsernameValidation = [
      {errorString: translate('createChallenge.errors.name.required'), success: validNameRequired},
      {errorString: translate('createChallenge.errors.name.maximum'), success: validNameLength},
      {errorString: translate('createChallenge.errors.game.required'), success: validGameRequired}
    ];

    return {
      errors: errorBoxUsernameValidation,
      success: errorBoxUsernameValidation.filter((err) => !err.success).length <= 0
    };
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
   * Confirm a Streamers Edge password.
   *
   * @param {string} pass - Password from form to validate.
   * @param {string} confirmPass - Password from form to validate.
   * @returns {string} - Error if one is found.
   * @memberof ValidationUtil
   */
  seConfirmPassword(pass, confirmPass) {
    return PrivateValidationUtils.seConfirmPassword(pass, confirmPass);
  },


  /**
   * Validate an email.
   *
   * @param {string} email - Email to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  seEmail(email) {
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
  },

  /**
   * Validate challenge name.
   *
   * @param {string} string - Value to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  challengeName(string) {
    return PrivateValidationUtils.challengeName(string);
  },

  /**
   *
   * @param {string} name - Challenge name to validate.
   * @param {string} game - Challenge game to validate.
   * @returns {string} Error if one is found.
   * @memberof ValidationUtil
   */
  challengeNameAndGame(name, game) {
    return PrivateValidationUtils.challengeNameAndGame(name, game);
  },

  /**
   * Validate string to see if it is empty.
   *
   * @param {string} string - Email to validate.
   * @returns {{success: boolean, errors: *[]}} Error if one is found.
   * @memberof PrivateValidationUtil
   */
  emptyString(string) {
    return PrivateValidationUtils.emptyString(string);
  }
};

export default ValidationUtil;
