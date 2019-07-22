/**
 * Form that handles account creation.
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {AuthService} from '../../../services';
import {ValidationUtil, GenUtil} from '../../../utility';
import SignupInput from '../../SignupInput';
import IconEmail from '../../../assets/images/Email_Field.png';
import IconEmailActive from '../../../assets/images/Email_Field_Active.png';
import IconPassword from '../../../assets/images/login/Password.png';
import IconPasswordActive from '../../../assets/images/login/Password_Over.png';
import IconUsername from '../../../assets/images/login/Username_1x.png';
import IconUsernameActive from '../../../assets/images/login/Username_Over.png';
import RegisterButton from '../../../assets/images/signup/register_button.png';
import RegisterButtonActive from '../../../assets/images/signup/register_active_button.png';
const translate = GenUtil.translate;

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      resultText: '',
      registerDisabled: false,
      registerBtnText: 'REGISTER',
      errors: {
        email: '',
        username: '',
        password: ''
      }
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.errors.email !== null || this.state.errors.username !== null || this.state.errors.password !== null) {
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
          resultText: 'Confirmation email sent',
          registerDisabled: false,
          registerBtnText: 'REGISTER'
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState({
          resultText: e,
          registerDisabled: false,
          registerBtnText: 'REGISTER'
        });
      });
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

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
            password: ValidationUtil.sePassword(this.state.password)
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
          <FormControl margin='normal' required fullWidth>
            <SignupInput
              onBlur={ () => this.validate('email') }
              name='email'
              handleChange={ this.handleChange }
              inputValue={ this.state.email }
              inputImage={ IconEmail }
              activeInputImage={ IconEmailActive }
              placeholder={ translate('register.enterEmail') }
            />
          </FormControl>
          <InputLabel shrink error={ true }>
            {this.state.errors.email}
          </InputLabel>
          <FormControl margin='normal' required fullWidth>
            <SignupInput
              onBlur={ () => this.validate('password') }
              name='password'
              type='password'
              handleChange={ this.handleChange }
              inputValue={ this.state.password }
              inputImage={ IconPassword }
              activeInputImage={ IconPasswordActive }
              placeholder={ translate('register.enterPassword') }
            />
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>
            {this.state.errors.password}
          </InputLabel>
          <FormControl margin='normal' required fullWidth>
            <SignupInput
              onBlur={ () => this.validate('username') }
              name='username'
              handleChange={ this.handleChange }
              inputValue={ this.state.username }
              inputImage={ IconUsername }
              activeInputImage={ IconUsernameActive }
              placeholder={ translate('register.enterUsername') }
            />
          </FormControl>
          <InputLabel shrink error={ true }>
            {this.state.errors.username}
          </InputLabel>
          <span className='register-success'>{this.state.resultText}</span>
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
        </form>
      </>
    );
  }
}

export default RegisterForm;
