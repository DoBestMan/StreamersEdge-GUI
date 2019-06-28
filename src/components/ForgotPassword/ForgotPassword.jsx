/**
 * Password Recovery component
 */

import React, {Component} from 'react';
import AuthService from '../../services/AuthService';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ResetForm from './ResetForm';
import {withRouter} from 'react-router-dom';
import SubmitButton from '../../assets/images/signup/register_active_button.png';
import BackButton from '../../assets/images/profile/btn__back--blue.svg';
import IconEmail from '../../assets/images/signup_email_input.png';
import IconEmailActive from '../../assets/images/signup_email_active_input.png';
import querystring from 'query-string';
import SignupInput from './../SignupInput';
import AuthFooter from './../Auth/AuthFooter';

class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      resultText: '',
      token: '',
      step: 1,
      btnDisable: false
    };
  }

  componentDidMount() {

    if (this.props.location.search) {
      const token = querystring.parse(this.props.location.search).token;

      if (token) {
        this.setState({
          token,
          step: 2
        });
      }
    }

  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });    
  }

  // Update the result message and re-enable the button for submissions
  updateResultMessage = (message) => {
    this.setState({
      resultText: message,
      btnDisable: false
    });
  }

    back = () => {
      this.props.history.push('/login');
    }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      btnDisable: true
    });

    AuthService.forgotPassword(this.state.email).then(() => {
      this.updateResultMessage('If an account exists that matches the email provided, an email will be sent to reset your password');
    }).catch((err) => {
      if (err.includes(429)) {
        this.updateResultMessage('You have attempted to reset your password too many times, please wait before trying again.');
      } else {
        this.updateResultMessage('Please enter a valid email.');
      }
    });
  }

  render(){
    let passForm = (
      <>
      <span className='forgot-title'>PASSWORD RESET</span>
        <span className='forgot-subheader'>Enter your email to reset your Streamers Edge account password.</span>
          <form className='forgot-form' onSubmit={ this.handleSubmit }>
            <FormControl margin='normal' required fullWidth>
              <SignupInput name='email' handleChange={ this.handleChange } 
                inputValue={ this.state.email } inputImage={ IconEmail } activeInputImage={ IconEmailActive }/>
            </FormControl>  
            <div className='forgot-button-container'>
              <span className='forgot-result'>{this.state.resultText}</span>

              <Button
                className='login-button'
                type='submit'
                style={ {color: 'white'} }
                onClick={ this.handleSubmit }
                disabled={ this.state.btnDisable }
              >
                <img
                  className='login-button-img'
                  src={ SubmitButton }
                  alt='Submit'
                  type='submit'
                />
                <div className='login-button-text'>SUBMIT</div>
              </Button>
              <img className='profileform-next' src={ BackButton } alt='next' onClick={ this.back } />
            </div>
          </form>
              </>
    );
    
    if (this.state.step === 2) {
      passForm = <ResetForm redirect={ this.props.history.push } token={ this.state.token }/>;
    }


    return(
        <>
          <div className='register-divider__top' />
          <div className='register-page'>
            {passForm}
            <AuthFooter></AuthFooter>
          </div>
        </>
    );
  }
}

export default withRouter(ForgotPassword);
