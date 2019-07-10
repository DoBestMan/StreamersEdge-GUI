import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginForm from '../Login/LoginForm';
import ForgotPassword from '../ForgotPassword';
import ModalActions from '../../actions/ModalActions';
import AppActions from '../../actions/AppActions';
import NavigateActions from '../../actions/NavigateActions';

class RootModal extends Component{
  handleClose = () => {
    this.props.setErrorText('');
    this.props.toggleModal();
    this.setState({open: false});
  }

  openPasswordRecovery = () => {
    this.props.setModalType('forgot');
  }

  toggleModalAndRegister = () => {
    this.props.toggleModal();
    this.props.navigateToSignUp();
  }

  render() {
    // Default modal content - a user should NEVER see this in production.
    let modalContent = null;

    // Specify your modals here
    switch(this.props.modalType) {
      case 'login': {
        modalContent = <LoginForm recoverPassword={ this.openPasswordRecovery } goRegister={ this.toggleModalAndRegister }
          handleLogin={ this.props.login } errorText = { this.props.errorText }/>;
        break;
      }

      case 'forgot': {
        modalContent = <ForgotPassword goRegister={ this.toggleModalAndRegister }/>;
        break;
      }

      default: {
        break;
      }
    }

    const {classes} = this.props;
    return (<>
      {/* <Dialog open={ this.state.open } onClose={ this.handleClose } aria-labelledby='form-dialog-title' classes={ {paper: classes.dialog-paper__root} }> */}
        <Dialog open={ this.props.isModalOpen } onClose={ this.handleClose } aria-labelledby='form-dialog-title'
          maxWidth={ 'md' }
          PaperProps={ {classes: {root:classes.root}} }>
          <DialogContent>
            {modalContent}
          </DialogContent>
        </Dialog>
    </>);
  }
}

const mapStateToProps = (state) => ({
  isModalOpen: state.getIn(['modal', 'isOpen']),
  modalType: state.getIn(['modal', 'type']),
  errorText: state.getIn(['account', 'loginErrorText'])
});


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      toggleModal: ModalActions.toggleModal,
      setModalType: ModalActions.setModalType,
      login: AppActions.login,
      setErrorText: AppActions.setLoginError,
      navigateToSignUp: NavigateActions.navigateToSignUp
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootModal));