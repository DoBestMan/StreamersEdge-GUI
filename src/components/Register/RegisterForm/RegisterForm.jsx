
/**
 * Form that handles account creation
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import AuthService from '../../../services/AuthService';
import SignupInput from '../../SignupInput';
import IconEmail from '../../../assets/images/signup_email_input.png';
import IconEmailActive from '../../../assets/images/signup_email_active_input.png';
import IconPassword from '../../../assets/images/signup_password_input.png';
import IconPasswordActive from '../../../assets/images/signup_password_active_input.png';
import IconUsername from '../../../assets/images/signup_username_input.png';
import IconUsernameActive from '../../../assets/images/signup_username_active_input.png';
import {Link} from 'react-router-dom';
import RegisterButton from '../../../assets/images/signup/register_button.png';
import RegisterButtonActive from '../../../assets/images/signup/register_active_button.png';
import ValidationUtil from '../../../utility/ValidationUtil';

class RegisterForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      resultText: '',
      registerDisabled: false,
      registerBtnText: 'REGISTER',
      errors : {
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

    AuthService.register(account).then((r) => {
      this.setState({
        resultText: 'Confirmation email sent',
        registerDisabled: false,
        registerBtnText: 'REGISTER'

      });
      console.log(r);
    }).catch((e) => {
      console.error(e);
      this.setState({
        resultText: e,
        registerDisabled: false,
        registerBtnText: 'REGISTER'
      });
    });
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });    
  }

  validate = (type) => {
    switch(type) {
      case 'email':
        this.setState({
          errors: {
            ...this.state.errors,
            email: ValidationUtil.validateEmail(this.state.email)
          }
        });
        break;
      case 'password':
        this.setState({
          errors: {
            ...this.state.errors,
            password: ValidationUtil.validatePassword(this.state.password)
          }
        });
        break;
      case 'username':
        this.setState({
          errors: {
            ...this.state.errors,
            username: ValidationUtil.validateUsername(this.state.username)
          }
        });
        break;
      default:
    }
  }
  
  render(){
    return(
      <>
       <form className='register-form' onSubmit={ this.handleSubmit }>
         <FormControl margin='normal' required fullWidth>
           <SignupInput onBlur={ () => this.validate('email') } name='email' handleChange={ this.handleChange } 
             inputValue={ this.state.email } inputImage={ IconEmail } activeInputImage={ IconEmailActive }/>
         </FormControl>
         <InputLabel shrink error={ true }>{this.state.errors.email}</InputLabel>
         <FormControl margin='normal' required fullWidth>
           <SignupInput onBlur={ () => this.validate('password') } name='password' type='password' handleChange={ this.handleChange }
             inputValue={ this.state.password } inputImage={ IconPassword } activeInputImage={ IconPasswordActive }/>
         </FormControl>
         <InputLabel className='register-error' shrink error={ true }>{this.state.errors.password}</InputLabel>
         <FormControl margin='normal' required fullWidth>
           <SignupInput onBlur={ () => this.validate('username') } name='username' handleChange={ this.handleChange }
             inputValue={ this.state.username } inputImage={ IconUsername } activeInputImage={ IconUsernameActive }/>
         </FormControl>
         <InputLabel shrink error={ true }>{this.state.errors.username}</InputLabel>
         <span className='register-success'>{this.state.resultText}</span>
         <span className='login-textlink'>Already have an account? 
           <Link to={ '/login' } activeclassname='active'>{'Login'}</Link>
         </span>
         <div className='register-button-container'>
           <Button disabled={ this.state.registerDisabled } className='register-button' type='submit' style={ {color: 'white'} }>
             <img className='register-button-img' src={ RegisterButton } alt='Register' type='submit' 
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
