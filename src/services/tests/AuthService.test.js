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

