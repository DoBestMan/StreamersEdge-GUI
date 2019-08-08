/**
 * Form that handles account creation.
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {AuthService, ProfileService} from '../../../services/';
import AuthFooter from '../../Auth/AuthFooter';
import {GenUtil} from '../../../utility';
import {UserIcon, UserIconActive, IconPassword, IconPasswordActive, LoginButton, LoginButtonActive} from '../../../assets/images/login';
import LogoImage from '../../../assets/images/se-logo-stacked.png';
import CustomInput from '../../CustomInput';

const translate = GenUtil.translate;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.username < 3 || this.state.password < 4) {
      return;
    }

    const account = {
      login: this.state.username,
      password: this.state.password
    };

    this.props.handleLogin(account);
  };

  handleUsernameChange = (user) => {
    this.setState({
      username: user
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password: password
    });
  }

  logout = () => {
    AuthService.logout();
  };

  getProfile = () => {
    ProfileService.getProfile();
  };

  render() {

    return (
      <>
        <form className='login-form' onSubmit={ this.handleSubmit }>
          <img src={ LogoImage } alt='logo' />
          <FormControl className='login-form__input' margin='none' required>
            <CustomInput
              name='username'
              hasActiveGlow={ true }
              placeholder={ translate('login.enterUsername') }
              handleChange={ this.handleUsernameChange }
              iconLeft={ UserIcon }
              iconLeftActive={ UserIconActive }
            />
          </FormControl>
          <FormControl className='login-form__input' margin='none' required>
            <CustomInput
              name='password'
              type='password'
              hasActiveGlow={ true }
              placeholder={ translate('login.enterPassword') }
              handleChange={ this.handlePasswordChange }
              iconLeft={ IconPassword }
              iconLeftActive={ IconPasswordActive }
            />
          </FormControl>
          <span className='login-form__apiTxt--error'>{this.props.errorText}</span>
          <span className='register__textlink'>
            {translate('login.dontHaveAccount')}
            <span onClick={ this.props.goRegister } className='goregister__link'>
              {translate('login.register')}
            </span>
          </span>
          <span className='register__textlink'>
            <span onClick={ this.props.recoverPassword } className='login__link'>
              {translate('login.forgotPass')}
            </span>
          </span>
          <div className='login__btn-container'>
            <Button disabled={ false } className='login__btn' type='submit' style={ {color: 'white'} }>
              <img
                className='login__btn-img'
                src={ LoginButton }
                alt='Login'
                type='submit'
                onMouseOver={ (e) => (e.currentTarget.src = LoginButtonActive) }
                onMouseOut={ (e) => (e.currentTarget.src = LoginButton) }
              />
            </Button>
          </div>
        </form>
        <AuthFooter />
      </>
    );
  }
}

export default LoginForm;
