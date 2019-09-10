/**
 * Password Recovery component.
 */

import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import {withRouter} from 'react-router-dom';
import {AuthService} from '../../services';
import AuthFooter from './../Auth/AuthFooter';
import {GenUtil, ValidationUtil} from '../../utility';
import ResetButton from '../../assets/images/resetpw/Reset.png';
import Logo from '../../assets/images/se-logo-stacked.png';
import {EmailIcon, EmailIconActive} from '../../assets/images/signup';
import CustomInput from '../CustomInput';
const translate = GenUtil.translate;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      resultText: '',
      resultStatus: '',
      token: '',
      btnDisable: true
    };
  }

  handleChange = (text) => {
    const validation = ValidationUtil.email(text);
    this.setState({
      email: text,
      resultText: ValidationUtil.email(text),
      resultStatus: validation ? '--error' : '--success',
      btnDisable: validation ? true : false
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
          this.setState({
            resultStatus: '--error'
          }, this.updateResultMessage(translate('forgotPassword.resultText.cooldown')));
        } else {
          this.updateResultMessage(translate('forgotPassword.resultText.success'));
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
            <CustomInput
              name='email'
              hasActiveGlow={ true }
              placeholder={ translate('forgotPassword.enterEmail') }
              handleChange={ this.handleChange }
              iconLeft={ EmailIcon }
              iconLeftActive={ EmailIconActive }
            />
          </FormControl>
          <span className='forgot-register'>
            {translate('login.dontHaveAccount')}
            <span onClick={ this.props.goRegister } className='register-link'>
              {translate('login.register')}
            </span>
          </span>
          <div className='forgot-button-container'>
            <span className={ `forgot-result${this.state.resultStatus}` }>{this.state.resultText}</span>
            <Button disabled={ this.state.btnDisable } type='submit' style={ {color: 'white'} }>
              <img src={ ResetButton } alt='Submit' type='submit' />
            </Button>
          </div>
        </form>
        <AuthFooter />
      </>
    );
  }
}

export default withRouter(ForgotPassword);
