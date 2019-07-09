import React, {Component} from 'react';
import {connect} from 'react-redux';
import RegisterForm from './RegisterForm';
import AuthFooter from '../Auth/AuthFooter';
import {bindActionCreators} from 'redux';
import ModalActions from '../../actions/ModalActions';
import {translate} from '../../utility/GeneralUtils';

class Register extends Component {
  componentDidMount() {

    if (this.props.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  // When the user decides to login instead
  openLoginModal = () => {
    this.props.setModalType('login');
    this.props.toggleModal();
  }

  render() {
    return(
      <>
        <div className='register-page'>
          <span className='register__title'>{translate('register.createAccount')}</span>
          <RegisterForm openLoginModal={ this.openLoginModal }/>
          <AuthFooter/>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['account', 'isLoggedIn'])});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({toggleModal: ModalActions.toggleModal, setModalType: ModalActions.setModalType}, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);