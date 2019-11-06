export const translationObject = {
  en: {
    errors: {
      username: {
        requirement: {
          length: 'Should be between 3 & 60 chars long',
          beginsWithLetter: 'Begins with letter',
          endsWithLowercaseOrDigit: 'Ends with lowercase letter or digit',
          onlyContainsLettersDigitHyphens: 'Only contains letters, digits, hyphens',
          noUppercase: 'No Uppercase',
          noBlankUsername: 'Username cannot be blank'
        },
        prefix1: 'Account name should ',
        prefix2: 'Each account segment should ',
        notEmpty: 'not be empty.',
        longer: 'be longer.',
        shorter: 'be shorter.',
        startLetter: 'start with a letter.',
        lettersDigitsDashes: 'have only lowercase letters, digits, or dashes.',
        oneDash: 'have only one dash in a row.',
        endAlphanumeric: 'end with a letter or digit.'
      },
      email: {
        invalid: 'Invalid email address',
        invalidDomain: 'Invalid top level domain name'
      },
      password: {
        requirement: {
          length: 'Should be between 6 & 60 chars long',
          number: 'Contains at least 1 number',
          specialChar: 'Contains a special character from (.@!#$%^*)',
          unallowedSpecialChar: 'No Unallowed special character',
          noSpaces: 'No Spaces'
        },
        confirmPassword: 'Passwords must match'
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
      },
      challengeName: {
        requirement: {
          length: 'Maximum 50 characters long',
          required: 'This field is required'
        }
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
        sUSD: 'sUSD',
        searchUsersPlaceholder: 'Search users - Begin typing username',
        searchGamesPlaceholder: 'Search games - Begin typing game',
        bountyPlaceholder: '0',
        errors: {
          user: {
            alreadyAdded: 'User already added',
            notFound: 'User not found'
          },
          game: {
            alreadyAdded: 'Game already added',
            notFound: 'Game not found'
          }
        }
      },
      notifications: {
        header: 'Notifications',
        option1: 'Get notifications for all challenges',
        option2: 'Don\'t receive any notifications'
      },
      modal: {
        errorHeader: 'Unexpected Error',
        errorSubText: 'Failed to update preferences',
        successHeader: 'Your preferences have been succesfully updated',
        successSubText: 'You will be automatically redirected in 10 seconds, otherwise,',
        successSubTextClickHere: 'click here',
        clickHere: 'click here'
      }
    },
    login: {
      header: 'Login',
      welcome: 'Hello, welcome again!',
      enterUsername: 'Enter your Streamers Edge Username',
      enterPassword: 'Enter your Streamers Edge Password',
      dontHaveAccount: 'Don\'t have a Streamers Edge account?',
      register: 'Register',
      forgotPass: 'Forgot your password?',
      orLoginWith: 'or Login using our Sign In Partners',
      invalidPassword: 'The password you\'ve entered is incorrect'
    },
    register: {
      createAccount: 'Create an Account',
      createAccountSubHeader: 'Welcome, you will be surprised here!',
      enterEmail: 'Enter your email',
      enterUsername: 'Enter your username',
      enterPassword: 'Enter your password',
      confirmPassword: 'Confirm your password',
      alreadyHaveAccount: 'Already have a Streamers Edge account?',
      login: 'Login',
      passwordStrength: {
        veryWeak: 'Very Weak',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong'
      },
      responses: {
        errorMissing: 'All of the required fields must be filled.',
        confirmSent: 'Confirmation email sent.'
      }
    },
    header: {
      login: 'Log In',
      logout: 'Log Out',
      signup: 'Sign Up',
      menu: 'Menu',
      popular: 'Popular'
    },
    forgotPassword: {
      header: 'Forgot Your Password?',
      subHeader: 'Enter your email to reset your Streamers Edge password.',
      enterEmail: 'Enter your Streamers Edge Email',
      resultText: {
        success:'If an account exists that matches the email provided, an email will be sent to reset your password.',
        cooldown:'You have attempted to reset your password too many times, please wait before trying again.',
        invalidEmail:'Please enter a valid email.'
      },
      resetForm: {
        header: 'Reset your password',
        subHeader: 'Please choose a new password to finish signing in.',
        newPassword: 'Enter your new password',
        confirmPassword: 'Confirm your new password',
        noMatch: 'Passwords do not match.',
        passwordStrength: {
          veryWeak: 'Very Weak',
          weak: 'Weak',
          medium: 'Medium',
          strong: 'Strong'
        }
      }
    },
    peerplays: {
      login: 'Login with Peerplays Global',
      enterUsername: 'Enter your username',
      enterPassword: 'Enter your password',
      dontHaveAccount: 'Don\'t have a Peerplays Global account?',
      register: 'Register',
      information: {
        title: 'Information',
        content: 'The username you enter is powered by the Peerplays blockchain. If you already have a username at Peerplays, ' +
        'please enter it here to link your Streamers Edge profile to it. If you don\'t have one, simply proceed to ',
        register: 'register your account'
      }
    },
    dashboard: {
      featured: {
        header: 'Featured Challenges',
        desc: 'Streamers Edge Rivals brings streamers and esports together! Competitors in the Streamers Edge Rivals Fortnite Showdown will compete against each other numerous game modes: FFA, ' +
        'Skirmish and Horde mode.'
      },
      genres: {
        shooter: 'SHOOTER',
        strategy: 'STRATEGY'
      },
      games: {
        fortnite: 'Fortnite',
        pubg: 'Pubg',
        lol: 'Lol'
      },
      recommended: 'Recommended',
      streams: 'Live Streams',
      category: 'Category: ',
      categories: 'Categories',
      challenges: 'Challenges',
      streaming: 'STREAMING',
      accepted: 'ACCEPTED',
      join: 'JOIN',
      susd: 'sUSD'
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
        one: 'Offends my religious sentiments',
        two: 'Offensive profile pic',
        three: 'Other'
      }
    },

    createProfile: {
      header: 'Create Profile',
      accountTypes: 'gamer,viewer,sponsor',
      defaultAccountType: 'viewer',
      modal: {
        header: 'Confirmation email sent please check your email',
        subText: 'After confirming email you may proceed to step 2'
      }
    },

    updateProfile: {
      userInfo: {
        header: 'User Info',
        userType: 'Select account type',
        email: 'Enter your email',
        avatar: 'Customize Avatar',
        updateHeader: 'Update Your Profile',
        editUserType: 'Edit Account Type',
        editEmail: 'Edit Streamers Edge account email',
        updatedSuccessfully: 'You have successfully updated your profile',
        updateFailed: 'Profile update failed.'
      },
      accountConnections: {
        cryptoHeader: 'Peerplays Wallet',
        cryptoSelect: 'SELECT YOUR CRYPTOCURRENCY ACCOUNT',
        cryptoDescription: 'Connect your Peerplays wallet and unlock special Streamer Edge integrations',
        cryptoLabel: 'Wallet Address',

        socialHeader:'Social Connections',
        gameHeader: 'Game Connections',
        connectionSelect: 'Connect these accounts and unlock special streamers edge integrations',
        connectionDescription: 'CONNECT YOUR ACCOUNTS',
        connectionLabel: 'Account Name'
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

    ban: {
      primary: 'You have been banned',
      secondary: 'You have been banned for violating the ',
      secondaryUnderlined: 'StreamersEdge Rules.',
      contact: 'Contact Support',
      orSend: ', or send us an email to ',
      email: 'ban@streamersedge.com'
    },

    link: {
      header: 'Confirm you want to link your account',
      unlinkHeader: 'Confirm you want to unlink your account',
      unlinkWarning: 'Warning: You won’t be able to win any challenge in which you have participated if your Peerplays account is not linked.',
      terms: 'Terms & Conditions'
    },

    search: {
      resultFor: 'Result For ',
      viewall: 'View all',
      challenge: {
        label: 'Challenges',
        noChallenge: 'There are no challenges...'
      }
    },

    category: {
      title: 'Category',
      select: 'Select category'
    },

    leftMenu: {
      links: {
        challenges: 'All Challenges',
        categories: 'Categories',
        popular: 'Popular Challenge',
        filters: 'Filters'
      },
      search: {
        placeholder: 'Search'
      },
      reset: 'Reset',
      defaultStatus: 'Open',
      categoryText: 'Category: ',
      challenger: 'Challenger: '
    },

    rightMenu: {
      links: {
        update: 'Update Profile',
        preferences: 'Preferences',
        create: 'Create Challenge'
      },
      invite: {
        accept: 'Accepted Challenge Invites',
        new: 'New Invites'
      }
    },

    createChallenge: {
      header: 'Create Challenge',
      name: {
        label: 'Challenge Name',
        placeholder: 'Enter A Name For This Challenge'
      },
      game: {
        label: 'Challenge Game',
        placeholder: 'Search'
      },
      invite: {
        condition: {
          label: 'Invite Conditions',
          conditions: {
            invite: 'Join by invite',
            any: 'Anyone can join',
            both: 'Both'
          }
        },
        challenge: 'Username'
      },
      errors: {
        name: {
          required: 'A challenge name is required'
        },
        date: {
          invalid: 'End Date should be greater than Start Date'
        },
        condition: {
          required: 'Add at least one condition'
        }
      }
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
