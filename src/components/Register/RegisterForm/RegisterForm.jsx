/**
 * Form that handles account creation.
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {AuthService} from '../../../services';
import {ValidationUtil, GenUtil} from '../../../utility';
import {
  EmailIcon,
  EmailIconActive,
  RegisterButton,
  RegisterButtonActive,
  InvalidIcon
} from '../../../assets/images/signup';
import {UserIcon, UserIconActive, IconPassword, IconPasswordActive} from '../../../assets/images/login';
import CustomInput from '../../CustomInput';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

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
      isPasswordInputClicked: false,
      isConfirmPasswordConfirmed: false,
      isUsernameInputClicked: false,
      isEmailInputClicked: false,
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

    if (this.state.errors.email !== '' || this.state.errors.username !== '' || this.state.errors.password !== '' || this.state.errors.confirmPassword !== '') {
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
      email: email,
      isEmailInputClicked: true
    });
  }

  handleUsernameChange = (user) => {
    this.setState({
      username: user,
      isUsernameInputClicked: true
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password: password,
      isPasswordInputClicked: true
    });
  }

  handleConfirmPasswordChange = (password) => {
    this.setState({
      confirmPassword: password,
      isConfirmPasswordConfirmed: true
    });
  }

  render() {
    return (
      <>
        <form className='register-form' onSubmit={ this.handleSubmit }>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='email'
              type='email'
              hasActiveGlow={ true }
              placeholder={ translate('register.enterEmail') }
              handleChange={ this.handleEmailChange }
              iconLeft={ EmailIcon }
              iconLeftActive={ EmailIconActive }
              iconRightActive={ InvalidIcon }
              handleRightIconClick={ () => {
                return  ValidationUtil.seEmail(this.state.email).errors;
              } }
              isValid={ () => {
                if (this.state.isEmailInputClicked) {
                  return ValidationUtil.seEmail(this.state.email).success;
                } else {
                  return true;
                }
              }  }
            />
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>
            {this.state.errors.email}
          </InputLabel>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='password'
              type='password'
              hasActiveGlow={ true }
              placeholder={ translate('register.enterPassword') }
              handleChange={ this.handlePasswordChange }
              iconLeft={ IconPassword }
              iconLeftActive={ IconPasswordActive }
              iconRightActive={ InvalidIcon }
              handleRightIconClick={ () => {
                return  ValidationUtil.sePassword(this.state.password).errors;
              } }
              isValid={ () => {
                if (this.state.isPasswordInputClicked) {
                  return ValidationUtil.sePassword(this.state.password).success;
                } else {
                  return true;
                }
              }  }
            />
            <PasswordStrengthIndicator password = { this.state.password } error={ !ValidationUtil.sePassword(this.state.password).success }/>
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>
            {this.state.errors.password}
          </InputLabel>
          <FormControl className='register-input' margin='normal' required fullWidth>

            <CustomInput
              name='confirmPassword'
              type='password'
              hasActiveGlow={ true }
              placeholder={ translate('register.confirmPassword') }
              handleChange={ this.handleConfirmPasswordChange }
              iconLeft={ IconPassword }
              iconLeftActive={ IconPasswordActive }
              iconRightActive={ InvalidIcon }
              handleRightIconClick={ () => {
                return  ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword).errors;
              } }
              isValid={ () => {
                if (this.state.isConfirmPasswordConfirmed) {
                  return ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword).success;
                } else {
                  return true;
                }
              }  }
            />
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>
            {this.state.errors.confirmPassword}
          </InputLabel>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='username'
              hasActiveGlow={ true }
              placeholder={ translate('register.enterUsername') }
              handleChange={ this.handleUsernameChange }
              iconLeft={ UserIcon }
              iconLeftActive={ UserIconActive }
              iconRightActive={ InvalidIcon }
              handleRightIconClick={ () => {
                return  ValidationUtil.seUsername(this.state.username).errors;
              } }
              isValid={ () => {
                if (this.state.isUsernameInputClicked) {
                  return ValidationUtil.seUsername(this.state.username).success;
                } else {
                  return true;
                }
              }  }
            />
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>
            {this.state.errors.username}
          </InputLabel>
          <span className='register__apiTxt--success'>{this.state.resultText}</span>
          <span className='register__apiTxt--error'>{this.state.errText}</span>
          <span className='register__requiredTxt'>All fields marked with an asterisk <span className='register__required-asterisk'>*</span> are required </span>
          <div className='register-links'>
            <span className='login-txt-link'>
              <span className='register__blue'>{translate('register.alreadyHaveAccount')}</span>
              <span className='register-form__gologin' onClick={ this.props.openLoginModal }>
                {translate('register.login')}
              </span>
            </span>
            <span className='register__textlink'>
              <span onClick={ this.props.openRecoverModal } className='login__link'>
                {translate('login.forgotPass')}
              </span>
            </span>
          </div>
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
        </form>
      </>
    );
  }
}

export default RegisterForm;
