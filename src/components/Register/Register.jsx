import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import RegisterForm from './RegisterForm';
import AuthFooter from '../Auth/AuthFooter';
import {ModalActions} from '../../actions';
import {ModalTypes} from '../../constants';
import {GenUtil} from '../../utility';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from '@material-ui/core';


const translate = GenUtil.translate;

class Register extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  // When the user decides to login instead
  openLoginModal = () => {
    this.props.setModalType(ModalTypes.LOGIN);
  };

  openRecoverModal = () => {
    this.props.setModalType(ModalTypes.FORGOT);
  };

  render() {
    return (
      <>
        <div className='register-page'>
          <IconButton className='donate__close' aria-label='Close' onClick={ this.props.toggleModal }>
            <CloseIcon />
          </IconButton>
          <span className='register__title'>{translate('register.createAccount')}</span>
          <span className='register__subHeader'>{translate('register.createAccountSubHeader')}</span>
          <RegisterForm openLoginModal={ this.openLoginModal } openRecoverModal = { this.openRecoverModal } />
          <AuthFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['account', 'isLoggedIn'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType
  },
  dispatch
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
