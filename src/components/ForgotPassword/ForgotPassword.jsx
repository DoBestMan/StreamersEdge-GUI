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
import {EmailIcon, EmailIconActive} from '../../assets/images/signup';
import CustomInput from '../CustomInput';
import {IconButton} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import {ModalTypes} from '../../constants';
import PropTypes from 'prop-types';

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

  back = () => {
    if (this.props.prev in ModalTypes) {
      this.props.setModalType(this.props.prev);
    }
  };

  // Update the result message and re-enable the button fssubmissions
  updateResultMessage = (message) => {
    this.setState({
      resultText: message,
      btnDisable: false
    });
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
        <IconButton className='forgot__back' aria-label='Back' onClick={ this.back }>
          <BackIcon />
        </IconButton>
        <form className='login-form' onSubmit={ this.handleSubmit }>
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
              <img className='forgot-button' src={ ResetButton } alt='Submit' type='submit' />
            </Button>
          </div>
        </form>
        <AuthFooter />
      </>
    );
  }
}

ForgotPassword.propTypes = {
  goRegister: PropTypes.func.isRequired,
  setModalType: PropTypes.func.isRequired,
  prev: PropTypes.string
};

export default withRouter(ForgotPassword);
