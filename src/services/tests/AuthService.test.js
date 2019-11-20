import AuthService from '../AuthService';

test('login success', () => {
  const account = {
    login: 'devs',
    password: 'devs1!'
  };

  AuthService.login(account).then((response) => {
    expect(response.email).toBe('devs@pbsa.info');
  });
});

test('login fail', () => {
  const account = {
    login: '',
    password: ''
  };
  AuthService.login(account).catch((err) => {
    expect(err).toBe('Error: Request failed with status code 400');
  });
});

test('forgot password success', () => {
  AuthService.forgotPassword('devs@pbsa.info').then((response) => {
    expect(response).toBe(true);
  }).catch((err) => {
    expect(err).toBe('Error: Request failed with status code 429'); // Email exists but user is on pw recover cooldown
  });
});

test('forgot password fail', () => {
  AuthService.forgotPassword('invalidemail').catch((err) => {
    expect(err).toBe('Error: Request failed with status code 400');
  });
});

