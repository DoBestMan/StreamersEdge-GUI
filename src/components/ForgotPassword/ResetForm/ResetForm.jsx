/**
 * Password Recovery component
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import {bindActionCreators} from 'redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import SignupInput from '../../SignupInput';
import IconPassword from '../../../assets/images/login/Password.png';
import IconPasswordActive from '../../../assets/images/login/Password_Over.png';
import AuthService from '../../../services/AuthService';
import ValidationUtil from '../../../utility/ValidationUtil';
import NavigateActions from '../../../actions/NavigateActions';
import querystring from 'query-string';
import {translate} from '../../../utility/GeneralUtils';

class ResetForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repeatPassword: '',
      resultText: '',
      passwordErr: '',
      token: ''
    };
  }

  componentDidMount() {
    if (this.props.location.search) {
      const token = querystring.parse(this.props.location.search).token;

      if (token) {
        this.setState({
          token
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

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.passwordErr !== null) {
      return;
    }

    AuthService.resetPassword(this.state.token, this.state.password).then(() =>{
      this.props.navigateToDashboard();
    }).catch((err) => {
      console.warn(err);
    });
  }

  validate = () => {
    if (this.state.password !== this.state.repeatPassword) {
      this.setState({
        passwordErr: translate('forgotPassword.resetForm.noMatch')
      });
    } else {
      this.setState({
        passwordErr: ValidationUtil.password(this.state.password)
      });
    }
  }

  render(){
    return(
        <>
          <div className='reset-form'>
            <span className='register-title'>{translate('forgotPassword.resetForm.header')}</span>
            <form className='register-form' onSubmit={ this.handleSubmit }>
              <FormControl margin='normal' required fullWidth>
                <SignupInput name='password' type='password' onBlur={ this.validate } handleChange={ this.handleChange } placeholder={ translate('forgotPassword.resetForm.newPassword') }
                  inputValue={ this.state.password } inputImage={ IconPassword } activeInputImage={ IconPasswordActive }/>
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <SignupInput name='repeatPassword' type='password' onBlur={ this.validate } handleChange={ this.handleChange } placeholder={ translate('forgotPassword.resetForm.confirmPassword') }
                  inputValue={ this.state.password } inputImage={ IconPassword } activeInputImage={ IconPasswordActive }/>
              </FormControl>
              <InputLabel className='register-error' shrink error={ true }>{this.state.passwordErr}</InputLabel>

              <Button
                variant='outlined'
                color='secondary'
                type='submit'
              >
                {translate('general.submit')}
              </Button>
            </form>
          </div>
        </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({navigateToDashboard: NavigateActions.navigateToDashboard}, dispatch)
  };
};


export default connect(null, mapDispatchToProps)(ResetForm);
