/**
 * Password Recovery component.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, FormControl, Card} from '@material-ui/core';
import querystring from 'query-string';

import {AuthService, ProfileService} from '../../../services';
import {NavigateActions, AccountActions} from '../../../actions';
import {ValidationUtil, GenUtil} from '../../../utility';

import CustomInput from '../../CustomInput';
import PasswordStrengthIndicator from '../../Register/RegisterForm/PasswordStrengthIndicator';
import ChangePasswordButton from '../../../assets/images/change_password.svg';
import {InvalidIcon} from '../../../assets/images/signup';
import {IconPassword, IconPasswordActive} from '../../../assets/images/login';
import {withRouter} from 'react-router-dom';

const translate = GenUtil.translate;

class ResetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      isPasswordInputClicked: false,
      isConfirmPasswordConfirmed: false,
      resultText: '',
      passwordErr: '',
      token: ''
    };
  }

  componentDidMount() {
    if (this.props.location.search) { // TODO: refactor use redux path
      const token = querystring.parse(this.props.location.search).token;

      if (token) {
        this.setState({
          token
        });
      }
    }
  }

  loginAndRedirect = () => {
    ProfileService.getProfile().then((profile) => {
      this.props.setAccount(profile);
      this.props.setLoggedIn(true);
      this.props.navigateToDashboard();
    });
  }

  handlePasswordChange = (password) => {
    this.setState({
      password: password,
      isPasswordInputClicked: true
    }, () => this.validate());
  }

  handleConfirmPasswordChange = (password) => {
    this.setState({
      confirmPassword: password,
      isConfirmPasswordConfirmed: true
    }, () => this.validate());
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.passwordErr.success) {
      return;
    }

    AuthService.resetPassword(this.state.token, this.state.password)
      .then(() => {
        this.loginAndRedirect();
      })
      .catch((err) => {
        this.setState({
          resultText: translate('forgotPassword.resetForm.expired')
        });
        console.error(err);
      });
  };

  validate = () => {

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        passwordErr: translate('forgotPassword.resetForm.noMatch')
      });
    } else {
      this.setState({
        passwordErr: ValidationUtil.sePassword(this.state.password)
      });
    }
  };

  render() {
    return (
      <>
        <Card className='reset-card'>
          <div className='reset-form'>
            <span className='reset__title'>{translate('forgotPassword.resetForm.header')}</span>
            <span className='reset__subHeader'>{translate('forgotPassword.resetForm.subHeader')}</span>
            <form className='reset-form' onSubmit={ this.handleSubmit }>
              <FormControl className='register-input' margin='normal' required fullWidth>
                <CustomInput
                  name='password'
                  type='password'
                  muiInputClass='inputRegister'
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
              <FormControl className='register-input' margin='normal' required fullWidth>
                <CustomInput
                  name='confirmPassword'
                  type='password'
                  muiInputClass='inputRegister'
                  hasActiveGlow={ true }
                  placeholder={ translate('forgotPassword.resetForm.confirmPassword') }
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

              <div className='reset__btn-container'>
                <Button className='reset__btn' type='submit'
                  disabled={ this.state.passwordErr.success  && this.state.isPasswordInputClicked && this.state.isConfirmPasswordConfirmed ? false : true }>
                  <img
                    src={ ChangePasswordButton }
                    alt='Change Password'
                    type='submit'
                  />
                </Button>
                <div className='reset-result'>
                  {this.state.resultText}
                </div>
              </div>
            </form>
          </div>
        </Card>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigateToDashboard: NavigateActions.navigateToDashboard,
    setAccount: AccountActions.setAccountAction,
    setLoggedIn: AccountActions.setIsLoggedInAction
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ResetForm));
