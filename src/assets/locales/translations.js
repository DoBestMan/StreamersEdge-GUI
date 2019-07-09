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
    login: {
      enterUsername: 'Enter your Streamers Edge Username',
      enterPassword: 'Enter your Streamers Edge Password',
      dontHaveAccount: 'Don\'t have a Streamers Edge account?',
      register: 'Register',
      forgotPass: 'Forgot your password?',
      orLoginWith: 'Or Login with',
      invalidPassword: 'The password you\'ve entered is incorrect'
    },
    register: {
      createAccount: 'CREATE YOUR ACCOUNT',
      enterEmail: 'Enter your email',
      enterUsername: 'Enter your username',
      enterPassword: 'Enter your password',
      alreadyHaveAccount: 'Already have an account?',
      login: 'Login'
    },
    header: {
      login: 'Log In',
      logout: 'Log Out',
      signup: 'Sign Up',
      menu: 'Menu',
      popular: 'Popular'
    },
    codeMe: 'Code Me!!!!!'
  }
};