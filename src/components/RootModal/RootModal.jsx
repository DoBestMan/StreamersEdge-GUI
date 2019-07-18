import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginForm from '../Login/LoginForm';
import ForgotPassword from '../ForgotPassword';
import {AppActions, ModalActions, NavigateActions} from '../../actions/';
import {ModalTypes} from '../../constants';
import styles from './MUI.css';

class RootModal extends Component {
  handleClose = () => {
    this.props.setErrorText('');
    this.props.toggleModal();
    this.setState({open: false});
  };

  openPasswordRecovery = () => {
    this.props.setModalType(ModalTypes.FORGOT);
  };

  toggleModalAndRegister = () => {
    this.props.toggleModal();
    this.props.navigateToSignUp();
  };

  render() {
    // Default modal content - a user should NEVER see this in production.
    let modalContent = null;

    // Specify your modals here
    switch (this.props.modalType) {
      case ModalTypes.LOGIN: {
        modalContent = <LoginForm recoverPassword={ this.openPasswordRecovery } goRegister={ this.toggleModalAndRegister } handleLogin={ this.props.login } errorText={ this.props.errorText } />;
        break;
      }

      case ModalTypes.FORGOT: {
        modalContent = <ForgotPassword goRegister={ this.toggleModalAndRegister } />;
        break;
      }

      default: {
        break;
      }
    }

    const {classes} = this.props;
    return (
      <>
        {/* <Dialog open={ this.state.open } onClose={ this.handleClose } aria-labelledby='form-dialog-title' classes={ {paper: classes.dialog-paper__root} }> */}
        <Dialog open={ this.props.isModalOpen } onClose={ this.handleClose } aria-labelledby='form-dialog-title' maxWidth={ 'md' } PaperProps={ {classes: {root: classes.root}} }>
          <DialogContent>{modalContent}</DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalOpen: state.getIn(['modal', 'isOpen']),
  modalType: state.getIn(['modal', 'type']),
  errorText: state.getIn(['profiles', 'loginErrorText'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    login: AppActions.login,
    setErrorText: AppActions.setLoginError,
    navigateToSignUp: NavigateActions.navigateToSignUp
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RootModal));
