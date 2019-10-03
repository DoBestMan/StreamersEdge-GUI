import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FormControl, InputLabel, Button} from '@material-ui/core';
import {GenUtil, ValidationUtil, PeerplaysAuthUtil} from '../../../utility';
import {AuthService, PeerplaysService} from '../../../services';
import {ModalTypes} from '../../../constants';

import CustomInput from '../../CustomInput';
import InfoBox from '../InformationBox';
import {InvalidIcon} from '../../../assets/images/signup';
import {UserIcon, UserIconActive, IconPassword, IconPasswordActive} from '../../../assets/images/login';
import LoginButton from '../../../assets/images/peerplays/login.svg';
import {ModalActions} from '../../../actions';

const translate = GenUtil.translate;

class PeerplaysLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      openInfoBox: false,
      username: '',
      password: '',
      isPasswordClicked: false,
      isUsernameClicked: false,
      position: null,
      errors:{
        username: null,
        password: null
      }
    };
  }

  /**
   * Event handler for opening modal that contains the form for which the end user is to enter their username and password credentials for their already existing peerplays account.
   *
   * @memberof PeerplaysLogin
   */
  componentDidMount = () => {
    // Connect to blockchain
    PeerplaysService.connectToBlockchain(this.state.loading);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({loading: true});

    if ((this.state.errors.username !== null || this.state.errors.password !== null)) {
      console.warn('Login failed');

      this.setState({
        loginDisabled: true
      });

      return;
    }

    this.props.peerplaysLogin(this.state.username, this.state.password).then((res) => {
      if (res.isAuth) {
        const account = {
          youtube: '',
          facebook: '',
          peerplaysAccountName: this.state.username,
          bitcoinAddress: ''
        };

        AuthService.linkPeerplaysAccount(account).then(() => {
          this.handleRedirect();
        });
      } else {
        this.setState({
          errors: {
            username: 'Wrong Username or Password'
          }
        });
      }
    });
  };

  handleUsernameChange = (user) => {
    this.setState({
      username: user,
      isUsernameClicked: true
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password: password,
      isPasswordClicked: true
    });
  }

  //pass in redirect url, otherwise you are returned to dashboard
  handleRedirect = () => {
    !!this.props.redirect ? this.props.history.push(this.props.redirect) : this.props.history.push('/dashboard');
  };

  // show information box for 3500ms
  handleOpenInfoBox = async (e) => {
    await this.setState({
      openInfoBox: true,
      position: e.target.getBoundingClientRect()
    });

    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      this.setState({
        openInfoBox: false
      });
    }, 15000);
  };

  isUsernameValid = () => {
    if (this.state.isUsernameClicked) {
      return ValidationUtil.seUsername(this.state.username).success;
    } else {
      return true;
    }
  };

  getUsernameErrors = () => {
    return  ValidationUtil.seUsername(this.state.username).errors;
  };

  isPasswordValid = () => {
    if (this.state.isPasswordClicked) {
      return ValidationUtil.sePassword(this.state.password).success;
    } else {
      return true;
    }
  };

  getPasswordErrors = () => {
    return  ValidationUtil.seUsername(this.state.username).errors;
  };

  redirectToSignup = () => {
    this.props.setModalType(ModalTypes.SIGN_UP);
  }

  render() {
    const isDisabled = () => {
      const {username, password, errors} = this.state;
      return username.length < 1 || password < 1 || !!errors.username || !!errors.password;
    };

    return (
      <>
        <form className='peerplayslogin-form' onSubmit={ this.handleSubmit }>
          <div className='peerplayslogin__flex'>
            <FormControl className='peerplayslogin-form__input' margin='none' required>
              <CustomInput
                name='username'
                hasActiveGlow={ true }
                placeholder={ translate('peerplays.enterUsername') }
                handleChange={ this.handleUsernameChange }
                iconLeft={ UserIcon }
                iconLeftActive={ UserIconActive }
                iconRightActive={ InvalidIcon }
                isValid={ this.isUsernameValid }
                handleRightIconClick={ this.getUsernameErrors }
              />
            </FormControl>

            <div className='peerplayslogin-help' onClick={ (e) => this.handleOpenInfoBox(e) }>
              ?
            </div>
            {this.state.openInfoBox ? <InfoBox position={ this.state.position } redirectToSignup={ this.redirectToSignup }/> : null}
          </div>
          <InputLabel className='peerplayslogin-error' shrink error={ true }>
            {this.state.errors.username}
          </InputLabel>
          <FormControl className='peerplayslogin-form__input' margin='none' required>
            <CustomInput
              name='password'
              type='password'
              hasActiveGlow={ true }
              placeholder={ translate('peerplays.enterPassword') }
              handleChange={ this.handlePasswordChange }
              iconLeft={ IconPassword }
              iconLeftActive={ IconPasswordActive }
              iconRightActive={ InvalidIcon }
              isValid={ this.isPasswordValid }
              handleRightIconClick={ this.getPasswordErrors }
            />
          </FormControl>
          <div className='peerplayslogin__btn-container'>
            <Button disabled={ isDisabled() } className='peerplayslogin__btn' type='submit' style={ {color: 'white'} }>
              <img
                className='peerplayslogin__btn-img'
                src={ LoginButton }
                alt='Login'
                type='submit'
              />
            </Button>
          </div>
          <span className='peerplayslogin__textlink'>
            {translate('peerplays.dontHaveAccount')}
            <span className='peerplayslogin__textlink-register' onClick={ () => this.props.goRegister() }>
              {translate('peerplays.register')}
            </span>
          </span>
        </form>
      </>
    );
  }
}

PeerplaysLoginForm.propTypes = {
  goRegister: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    peerplaysLogin: PeerplaysAuthUtil.peerplaysLogin,
    setModalType: ModalActions.setModalType
  },
  dispatch
);
export default connect(
  null,
  mapDispatchToProps
)(PeerplaysLoginForm);
