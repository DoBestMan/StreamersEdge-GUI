/**
 * Password Recovery component
 */

import React, {Component} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import SignupInput from '../../SignupInput';
import SubmitButton from '../../../assets/images/login/login_button.png';
import IconPassword from '../../../assets/images/signup_password_input.png';
import IconPasswordActive from '../../../assets/images/signup_password_active_input.png';
import AuthService from '../../../services/AuthService';
import ValidationUtil from '../../../utility/ValidationUtil';

class ResetForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repeatPassword: '',
      resultText: '',
      passwordErr: ''
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.passwordErr !== null) {
      return;
    }

    AuthService.resetPassword(this.props.token, this.state.password).then(() =>{
      this.props.redirect('/login');
    }).catch((err) => {
      console.warn(err);
    });
  }

  validate = () => {
    if (this.state.password !== this.state.repeatPassword) {
      this.setState({
        passwordErr: 'Passwords do not match.'
      });
    } else {
      this.setState({
        passwordErr: ValidationUtil.validatePassword(this.state.password)
      });
    }
  }



  render(){
    return(
    <>
    <span className='register-title'>RESET YOUR PASSWORD</span>
        <form className='register-form' onSubmit={ this.handleSubmit }>
          <FormControl margin='normal' required fullWidth>
            <SignupInput name='password' type='password' onBlur={ this.validate } handleChange={ this.handleChange }
              inputValue={ this.state.password } inputImage={ IconPassword } activeInputImage={ IconPasswordActive }/>
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <SignupInput name='repeatPassword' type='password' onBlur={ this.validate } handleChange={ this.handleChange }
              inputValue={ this.state.password } inputImage={ IconPassword } activeInputImage={ IconPasswordActive }/>
          </FormControl>
          <InputLabel className='register-error' shrink error={ true }>{this.state.passwordErr}</InputLabel>

          <div className='login__btn-container'>
            <Button
              className='login__btn'
              type='submit'
              style={ {color: 'white'} }
            >
              <img
                className='login__btn-img'
                src={ SubmitButton }
                alt='Submit'
                type='submit'
              />
              <div className='login__btn-txt'>SUBMIT</div>
            </Button>
          </div>
        </form>
            </>
    );
  }
}

export default ResetForm;
