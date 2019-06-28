
/**
 * Form that handles account creation
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import SignupInput from '../../SignupInput';
import IconPassword from '../../../assets/images/signup_password_input.png';
import IconPasswordActive from '../../../assets/images/signup_password_active_input.png';
import IconUsername from '../../../assets/images/signup_username_input.png';
import IconUsernameActive from '../../../assets/images/signup_username_active_input.png';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoginButton from '../../../assets/images/login/login_button.png';
import LoginButtonActive from '../../../assets/images/login/login_active_button.png';
import AuthService from '../../../services/AuthService';
import ProfileService from '../../../services/ProfileService';

class LoginForm extends Component{

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

  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });    
  }

  logout = () => {
    AuthService.logout().then((r) => {
      console.log(r);
    });
  }

  getProfile = () => {
    ProfileService.getProfile().then((r) => {
      console.log(r);
    });
  }
  
  render(){
    return(
      <>
       <form className='login-form' onSubmit={ this.handleSubmit }>
         <FormControl margin='normal' required fullWidth>
           <SignupInput name='username' handleChange={ this.handleChange }
             inputValue={ this.state.username } inputImage={ IconUsername } activeInputImage={ IconUsernameActive }/>
         </FormControl>
         <FormControl margin='normal' required fullWidth>
           <SignupInput name='password' type='password' handleChange={ this.handleChange }
             inputValue={ this.state.password } inputImage={ IconPassword } activeInputImage={ IconPasswordActive }/>
         </FormControl>
         <span className='register-textlink'>Don't have a Streamers Edge Account?
           <Link to={ '/sign-up' } activeclassname='active'> {'Register'} </Link>
         </span>
         <span className='register-textlink'>
           <Link to={ '/forgot-password' } activeclassname='active'>{'Forgot your password?'}</Link>
         </span>
         <div className='login-button-container'>
           <Button disabled={ false } className='login-button' type='submit' style={ {color: 'white'} }>
             <img className='login-button-img' src={ LoginButton } alt='Login' type='submit' 
               onMouseOver={ (e) => (e.currentTarget.src = LoginButtonActive) }
               onMouseOut={ (e) => (e.currentTarget.src = LoginButton) }
             />
           </Button>
         </div>
       </form>
      </>
    );
  }
}

export default LoginForm;
