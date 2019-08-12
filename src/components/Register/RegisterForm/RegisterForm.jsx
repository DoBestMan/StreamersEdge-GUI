/**
 * Form that handles account creation.
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {AuthService} from '../../../services';
import {ValidationUtil, GenUtil} from '../../../utility';
import {EmailIcon, EmailIconActive, RegisterButton, RegisterButtonActive} from '../../../assets/images/signup';
import {UserIcon, UserIconActive, IconPassword, IconPasswordActive} from '../../../assets/images/login';
import CustomInput from '../../CustomInput';

const translate = GenUtil.translate;

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      resultText: '',
      errText: '',
      registerDisabled: false,
      registerBtnText: 'REGISTER',
      errors: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      }
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.errors.email !== null || this.state.errors.username !== null || this.state.errors.password !== null || this.state.errors.confirmPassword !== null) {
      console.warn('Registration failed');
      return;
    }

    const account = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      repeatPassword: this.state.password
    };

    this.setState({
      registerDisabled: true,
      registerBtnText: 'LOADING...'
    });

    AuthService.register(account)
      .then(() => {
        this.setState({
          errText: '',
          resultText: 'Confirmation email sent',
          registerDisabled: false,
          registerBtnText: 'REGISTER'
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState({
          errText: e,
          resultText: '',
          registerDisabled: false,
          registerBtnText: 'REGISTER'
        });
      });
  };

  handleEmailChange = (email) => {
    this.setState({
      email: email
    });
  }

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

  handleConfirmPasswordChange = (password) => {
    this.setState({
      confirmPassword: password
    });
  }

  validate = (type) => {
    switch (type) {
      case 'email':
        this.setState({
          errors: {
            ...this.state.errors,
            email: ValidationUtil.email(this.state.email)
          }
        });
        break;
      case 'password':
        this.setState({
          errors: {
            ...this.state.errors,
            password: ValidationUtil.sePassword(this.state.password),
            confirmPassword: ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword)
          }
        });
        break;
      case 'confirmPassword':
        this.setState({
          errors: {
            ...this.state.errors,
            confirmPassword: ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword)
          }
        });
        break;
      case 'username':
        this.setState({
          errors: {
            ...this.state.errors,
            username: ValidationUtil.seUsername(this.state.username)
          }
        });
        break;
      default:
    }
  };

  render() {
    return (
      <>
        <form className='register-form' onSubmit={ this.handleSubmit }>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='email'
              type='email'
              onBlur={ () => this.validate('email') }
              hasActiveGlow={ true }
              placeholder={ translate('register.enterEmail') }
              handleChange={ this.handleEmailChange }
              iconLeft={ EmailIcon }
              iconLeftActive={ EmailIconActive }
            />
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>
            {this.state.errors.email}
          </InputLabel>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='password'
              type='password'
              onBlur={ () => this.validate('password') }
              hasActiveGlow={ true }
              placeholder={ translate('register.enterPassword') }
              handleChange={ this.handlePasswordChange }
              iconLeft={ IconPassword }
              iconLeftActive={ IconPasswordActive }
            />
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>
            {this.state.errors.password}
          </InputLabel>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='confirmPassword'
              type='password'
              onBlur={ () => this.validate('confirmPassword') }
              hasActiveGlow={ true }
              placeholder={ translate('register.confirmPassword') }
              handleChange={ this.handleConfirmPasswordChange }
              iconLeft={ IconPassword }
              iconLeftActive={ IconPasswordActive }
            />
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>
            {this.state.errors.confirmPassword}
          </InputLabel>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='username'
              onBlur={ () => this.validate('username') }
              hasActiveGlow={ true }
              placeholder={ translate('login.enterUsername') }
              handleChange={ this.handleUsernameChange }
              iconLeft={ UserIcon }
              iconLeftActive={ UserIconActive }
            />
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>
            {this.state.errors.username}
          </InputLabel>
          <span className='register__apiTxt--success'>{this.state.resultText}</span>
          <span className='register__apiTxt--error'>{this.state.errText}</span>
          <span className='register__requiredTxt'>All fields marked with an asterisk <span className='register__required-asterisk'>*</span> are required </span>
          <span className='login-txt-link'>
            {translate('register.alreadyHaveAccount')}
            <span className='register-form__gologin' onClick={ this.props.openLoginModal }>
              {translate('register.login')}
            </span>
          </span>
          <div className='register__btn-container'>
            <Button disabled={ this.state.registerDisabled } className='register__btn' type='submit' style={ {color: 'white'} }>
              <img
                className='register__btn-img'
                src={ RegisterButton }
                alt='Register'
                type='submit'
                onMouseOver={ (e) => (e.currentTarget.src = RegisterButtonActive) }
                onMouseOut={ (e) => (e.currentTarget.src = RegisterButton) }
              />
            </Button>
          </div>
          <span className='register__textlink'>
            <span onClick={ this.props.openRecoverModal } className='login__link'>
              {translate('login.forgotPass')}
            </span>
          </span>
        </form>
      </>
    );
  }
}

export default RegisterForm;
