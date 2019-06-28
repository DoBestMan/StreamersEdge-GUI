export const translationObject = {
  en: {
    errors: {
      username: {
        prefix1: 'Account name should ',
        prefix2: 'each account segment should ',
        notEmpty: 'not be empty.',
        longer: 'be longer.',
        shorter: 'be shorter.',
        startLetter: 'start with a letter.',
        lettersDigitsDashes: 'have only letters, digits, or dashes.',
        oneDash: 'have only one dash in a row.',
        endAlphanumeric: 'end with a letter or digit.'
      },
      email: {
        invalid: 'invalid email address'
      },
      password: {
        lengthRequirement: 'password must be between 3 and 63 characters in length',
        requires: 'password must contain at least one number, one special character (.@$!%^*#), and no spaces'
      },
      search: {
        lengthRequirement: 'search text must be greater than 3 and less than 100 characters',
        noBlank: 'search text cannot be blank'
      },
      date: {
        invalid: 'not a valid date',
        beToday: 'starting date must be current date',
        startLessThanEnd: 'start date must be less than end date'
      },
      general: {
        beNumber: 'must be a number',
        beDecimalOrInt: 'must be either a decimal or integer'
      }
    },
    createProfile: {
      accountTypes: ['Viewer', 'Gamer', 'Sponsor']
    },
    codeMe: 'Code Me!!!!!'
  }
};