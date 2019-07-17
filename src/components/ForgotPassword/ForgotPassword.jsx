/**
 * Password Recovery component.
 */

import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import {withRouter} from 'react-router-dom';
import {AuthService} from '../../services';
import SignupInput from './../SignupInput';
import AuthFooter from './../Auth/AuthFooter';
import {GenUtil} from '../../utility';
import IconEmail from '../../assets/images/Email_Field.png';
import IconEmailActive from '../../assets/images/Email_Field_Active.png';
import ResetButton from '../../assets/images/resetpw/Reset.png';
import ResetButtonActive from '../../assets/images/resetpw/Reset_Active.png';
import Logo from '../../assets/images/se-logo-stacked.png';
const translate = GenUtil.translate;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      resultText: '',
      token: '',
      btnDisable: false
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  // Update the result message and re-enable the button for submissions
  updateResultMessage = (message) => {
    this.setState({
      resultText: message,
      btnDisable: false
    });
  };

  back = () => {
    this.props.history.push('/login');
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      btnDisable: true
    });

    AuthService.forgotPassword(this.state.email)
      .then(() => {
        this.updateResultMessage(translate('forgotPassword.resultText.success'));
      })
      .catch((err) => {
        if (err.includes(429)) {
          this.updateResultMessage(translate('forgotPassword.resultText.cooldown'));
        } else {
          this.updateResultMessage(translate('forgotPassword.resultText.invalidEmail'));
        }
      });
  };

  render() {
    return (
      <>
        <form className='login-form' onSubmit={ this.handleSubmit }>
          <img src={ Logo } alt='logo' />
          <span className='forgot-title'>{translate('forgotPassword.header')}</span>
          <span className='forgot-subheader'>{translate('forgotPassword.subHeader')}</span>
          <FormControl margin='normal' required>
            <SignupInput
              name='email'
              handleChange={ this.handleChange }
              inputValue={ this.state.email }
              inputImage={ IconEmail }
              activeInputImage={ IconEmailActive }
              placeholder={ translate('forgotPassword.enterEmail') }
            />
          </FormControl>
          <span className='forgot-register'>
            {translate('login.dontHaveAccount')}
            <span onClick={ this.props.goRegister } className='register-link'>
              {translate('login.register')}
            </span>
          </span>
          <div className='forgot-button-container'>
            <span className='forgot-result'>{this.state.resultText}</span>
            <Button disabled={ this.state.btnDisable } type='submit' style={ {color: 'white'} }>
              <img src={ ResetButton } alt='Submit' type='submit' onMouseOver={ (e) => (e.currentTarget.src = ResetButtonActive) } onMouseOut={ (e) => (e.currentTarget.src = ResetButton) } />
            </Button>
          </div>
        </form>
        <AuthFooter />
      </>
    );
  }
}

export default withRouter(ForgotPassword);
