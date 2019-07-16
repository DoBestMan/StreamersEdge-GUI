import {translate} from './GeneralUtils';

const ValidationUtil = {
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

  email(email) {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regex.test(email)) {
      return translate('errors.email.invalid');
    } else {
      return null;
    }
  },

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

  number(number) {
    if(typeof number !== 'number') {
      return translate('errors.general.beNumber');
    }
  },

  decimalInteger(decimalInt) {
    var regexp = /^[0-9]+([,.][0-9]+)?$/g;

    if (!regexp.test('a') && !Number.isNumber(decimalInt)) {
      return translate('errors.general.beDecimalOrInt');
    }
  },

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

  inviteGamer(string) {
    return this.Username(string);
  },

  bounty(number) {
    return this.DecimalInteger(number);
  },

  challengeConditions(number) {
    return this.DecimalInteger(number);
  }


};

export default ValidationUtil;