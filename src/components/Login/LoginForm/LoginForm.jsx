/**
 * Form that handles account creation
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import SignupInput from '../../SignupInput';
import IconPassword from '../../../assets/images/login/Password.png';
import IconPasswordActive from '../../../assets/images/login/Password_Over.png';
import IconUsername from '../../../assets/images/login/Username_1x.png';
import IconUsernameActive from '../../../assets/images/login/Username_Over.png';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoginButton from '../../../assets/images/login/login_button.png';
import LoginButtonActive from '../../../assets/images/login/login_active_button.png';
import AuthService from '../../../services/AuthService';
import ProfileService from '../../../services/ProfileService';
import AuthFooter from '../../Auth/AuthFooter';
import LogoImage from '../../../assets/images/se-logo-stacked.png';
import {translate} from '../../../utility/GeneralUtils';

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

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

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
          <FormControl margin='none' required>
            <SignupInput
              name='username'
              handleChange={ this.handleChange }
              inputValue={ this.state.username }
              inputImage={ IconUsername }
              activeInputImage={ IconUsernameActive }
              placeholder={ translate('login.enterUsername') }
            />
          </FormControl>
          <FormControl margin='none' required>
            <SignupInput
              name='password'
              type='password'
              handleChange={ this.handleChange }
              inputValue={ this.state.password }
              inputImage={ IconPassword }
              activeInputImage={ IconPasswordActive }
              placeholder={ translate('login.enterPassword') }
            />
          </FormControl>
          {this.props.errorText}
          <span className='register__textlink'>
            {translate('login.dontHaveAccount')}
            <span onClick = { this.props.goRegister } className='goregister__link'>{translate('login.register')}</span>
          </span>
          <span className='register__textlink'>
            <Link className='login__link' to={ '/forgot-password' } activeclassname='active'>
              {translate('login.forgotPass')}
            </Link>
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
