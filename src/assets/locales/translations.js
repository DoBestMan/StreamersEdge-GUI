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
        invalid: 'invalid email address',
        invalidDomain: 'invalid top level domain name'
      },
      password: {
        lengthRequirement: 'password must be between 3 and 63 characters in length',
        requires: 'password must contain at least one number, one special character (.@$!%^*#), and no spaces',
        confirmPassword: 'passwords must match'
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
      profile: {
        invalidImageType: 'Only JPEG and PNG images are supported.',
        invalidImageSize: 'Image must be less than 1 MB.',
        invalidTypeAndSize: 'Image must be JPEG or PNG and be less than 1 MB.'
      },
      streams: {
        addError: 'Could not retrieve stream %{id}'
      },
      general: {
        beNumber: 'must be a number',
        beDecimalOrInt: 'must be either a decimal or integer'
      }
    },
    preferences: {
      header: 'PREFERENCES',
      invites: {
        header: 'Invites',
        option1: 'Everyone can send me an invite',
        option2: 'Receive invites from specific users',
        option3: 'Receive invites for specific games',
        option4: 'Don\'t receive invites from anyone',
        bounty: 'Minimum bounty for invite',
        ppy: 'PPY',
        searchUsersPlaceholder: 'Search users - Begin typing username',
        bountyPlaceholder: '10,000',
        errors: {
          alreadyAdded: 'user already added',
          notFound: 'user not found'
        }
      },
      notifications: {
        header: 'Notifications',
        option1: 'Get notifications for all challenges',
        option2: 'Don\'t receive any notifications'
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
      confirmPassword: 'Confirm your password',
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
    forgotPassword: {
      header: 'FORGOT YOUR PASSWORD?',
      subHeader: 'Enter your email to reset your Streamers Edge password.',
      enterEmail: 'Enter your Streamers Edge Email',
      resultText: {
        success:'If an account exists that matches the email provided, an email will be sent to reset your password.',
        cooldown:'You have attempted to reset your password too many times, please wait before trying again.',
        invalidEmail:'Please enter a valid email.'
      },
      resetForm: {
        header: 'RESET YOUR PASSWORD',
        newPassword: 'New password',
        confirmPassword: 'Confirm password',
        noMatch: 'Passwords do not match.'
      }
    },
    dashboard: {
      featured: {
        desc: 'Streamers Edge Rivals brings streamers and esports together! Competitors in the Streamers Edge Rivals Fortnite Showdown will compete against each other numerous game modes: FFA, ' +
        'Skirmish and Horde mode.'
      },
      recommended: 'Recommended',
      streams: 'Live Streams',
      categories: 'Categories',
      challenges: 'Challenges'
    },
    previewCard: {
      status: {
        live: 'LIVE',
        join: 'JOIN'
      }
    },
    reportUser: {
      report: 'REPORT',
      selectableReasons: 'Selectable reasons for reports:',
      giveDescription: 'Please give a brief description..',
      attachLink: 'Attach a link to reported video:',
      error: 'Please ensure all fields are filled.',
      reasons: {
        one: 'Vulgarity on stream',
        two: 'Sexist comments on stream',
        three: 'Offends my religious sentiments',
        four: 'Offensive profile pic'
      }
    },
    donate: {
      donateTo: 'Donate to: ',
      balance: 'Balance: ',
      usd: 'USD',
      insufficientHeader: 'Not enough funds',
      insufficientSubHeader: 'We recommend adding funds to your account',
      successHeader: 'Success!',
      successSubHeader: 'Your donation was completed successfully'
    },
    copyright: 'Peerplays Global©',
    lorem: 'Spicy jalapeno bacon ipsum dolor amet corned beef reprehenderit chicken duis tail sirloin spare ribs salami burgdoggen tongue drumstick ut. Quis laboris pig drumstick fatback prosciutto' +
    ' in cupim aliqua jowl bacon. Irure ullamco buffalo picanha est jerky shoulder beef sint mollit ut boudin ground round proident. Id lorem turducken et eiusmod. Buffalo tri-tip tenderloin ' +
    'nostrud, chicken landjaeger chuck venison andouille meatloaf culpa brisket ullamco. Ipsum leberkas venison esse, cillum exercitation excepteur laboris short loin chuck. Shankle cillum kevin ' +
    'ribeye, beef ribs magna salami dolore spare ribs dolor t-bone jerky id tri-tip short loin. \n\n' +

    'Kielbasa brisket turkey boudin, alcatra swine kevin buffalo in id commodo reprehenderit duis magna. Drumstick sint cow, short loin beef proident deserunt sed tenderloin turducken picanha rump.' +
    ' Deserunt filet mignon spare ribs turducken laborum ex t-bone lorem. Filet mignon do commodo strip steak ball tip ut bacon swine. Chuck ham shank minim fugiat nisi.\n\n ' +

    'Ex sed pastrami, duis do ground round exercitation irure strip steak pork loin pariatur. Short loin corned beef buffalo, bresaola duis quis filet mignon elit proident tenderloin ut jerky ' +
    'strip steak anim. Sunt tongue occaecat, dolor veniam enim turkey. Ex ut cupidatat irure cow salami beef ribs biltong nulla sausage ad. Beef lorem elit, bresaola aliqua non commodo duis nisi ' +
    'venison landjaeger ham hock minim dolor dolore. Labore consequat pork loin jerky in id. Cupidatat meatloaf bresaola qui spare ribs.\n\n' +

    'Commodo pancetta cillum, aute bacon swine rump tri-tip adipisicing ribeye enim labore nostrud brisket. Swine voluptate laborum ham hock ullamco dolore tempor elit adipisicing sausage filet ' +
    'mignon ea ut porchetta dolore. Ground round shoulder chicken in est. Pancetta pork belly strip steak incididunt shank andouille. Ball tip cillum ut bacon in beef ribs corned beef meatball ' +
    'eiusmod kielbasa qui biltong. Reprehenderit shank biltong sunt, anim aliqua chicken salami. Do deserunt est, consequat bacon pork loin chicken.\n\n' +

    'Sint non short ribs shankle lorem capicola picanha cupidatat sed alcatra dolore prosciutto shoulder. Ut enim ut, shank pancetta voluptate commodo exercitation. Sint ut burgdoggen nulla. ' +
    'Labore flank pariatur capicola irure velit incididunt. Ipsum tail bresaola, non capicola elit sunt sirloin meatloaf beef ribs tongue sed consequat burgdoggen.\n\n' +

    'In ut strip steak shoulder, spare ribs non ball tip pancetta cupidatat. Non ground round ex ham labore, pastrami tail. Fugiat picanha dolore, incididunt ex pork chop qui ullamco leberkas in ' +
    'turkey aliqua ut strip steak. Sirloin esse biltong tail strip steak turducken. Ut pork belly pork loin, ground round ipsum porchetta flank hamburger et boudin excepteur leberkas qui. ' +
    'Drumstick landjaeger ut, prosciutto tenderloin exercitation doner ham. Landjaeger ad sed, tenderloin corned beef excepteur leberkas cow eiusmod.\n\n' +

    'Culpa voluptate occaecat, laborum ground round commodo fugiat short ribs. Occaecat tail shoulder cupim ut landjaeger frankfurter sint kielbasa velit ad est. Strip steak dolore aliqua ribeye ' +
    'cillum enim tongue in fugiat esse ullamco. Et tenderloin drumstick biltong eu. Anim short loin cupidatat reprehenderit pork belly. Qui aliqua aute et, pig leberkas aliquip enim non ad t-bone ' +
    'shoulder ea hamburger.\n\n' +

    'Est spare ribs aliqua eu meatball consequat, duis ham hock in. Reprehenderit laborum nostrud, pork loin lorem cillum porchetta filet mignon fugiat consectetur bacon officia. Pig cupidatat ' +
    'adipisicing filet mignon ribeye eiusmod. Salami shankle et jerky. Nulla ut capicola turkey, proident eiusmod cow ad in beef ribs landjaeger. Tenderloin shankle in venison lorem, commodo ' +
    'picanha. Kielbasa pork consequat anim.\n\n' +

    'Mollit fatback biltong adipisicing short loin tenderloin meatball dolor laborum nulla ball tip id doner. Turducken in shoulder nostrud. Pork et tail shoulder ex aliquip quis reprehenderit ' +
    'jowl pig buffalo. Corned beef frankfurter beef venison veniam, consectetur elit non et cupidatat consequat ea short loin. Pariatur hamburger exercitation occaecat turducken, dolore ribeye ' +
    'laboris. Eu pork loin pariatur sunt tempor, ullamco est ut velit nostrud swine.\n\n' +

    'Ham enim doner salami, strip steak filet mignon fatback cupim brisket duis veniam fugiat ball tip sunt aute. Biltong fatback magna, chuck sed ut in duis pariatur boudin dolor. Pig doner ' +
    'hamburger, turkey et cupidatat pork belly enim ut brisket sirloin. Shank kielbasa tail nostrud duis strip steak, chicken incididunt tempor officia proident pancetta tri-tip. Leberkas ex ut ' +
    'in et. Spare ribs aliquip adipisicing, tenderloin magna sirloin biltong turkey filet mignon anim aute eiusmod chuck non.\n\n'
  }
};