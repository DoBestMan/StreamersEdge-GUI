import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginForm from '../Login/LoginForm';
import PeerplaysLogin from '../PeerplaysLogin';
import ForgotPassword from '../ForgotPassword';
import ReportUser from '../ReportUser';
import Donate from '../Donate';
import Register from '../Register';
import {AppActions, ModalActions, NavigateActions} from '../../actions/';
import {ModalTypes} from '../../constants';
import styles from './MUI.css';
import BanModal from '../Modals/BanModal';
import LinkAccountModal from '../Modals/LinkAccountModal';
import UnlinkAccountModal from '../Modals/UnlinkAccountModal';

class RootModal extends Component {

  handleClose = () => {
    this.props.setErrorText('');
    this.props.toggleModal();
    this.props.setModalData();
    this.setState({open: false});
  };

  openPasswordRecovery = () => {
    this.props.setErrorText('');
    this.props.setModalType(ModalTypes.FORGOT);
  };

  toggleModalAndRegister = () => {
    this.props.setErrorText('');
    this.props.setModalType(ModalTypes.SIGN_UP);
  };

  render() {
    const {classes} = this.props;

    // Default modal content - a user should NEVER see this in production.
    let modalContent = null;
    let modalClass = classes.root;


    // Specify your modals here
    switch (this.props.modalType) {
      case ModalTypes.LOGIN: {
        modalContent = <LoginForm recoverPassword={ this.openPasswordRecovery } goRegister={ this.toggleModalAndRegister } handleLogin={ this.props.login } errorText={ this.props.errorText } />;
        break;
      }

      case ModalTypes.SIGN_UP: {
        modalContent = <Register />;
        modalClass = classes.register;
        break;
      }

      case ModalTypes.FORGOT: {
        modalContent = <ForgotPassword goRegister={ this.toggleModalAndRegister } prev={ this.props.previousModal } setModalType={ this.props.setModalType }/>;
        modalClass = classes.forgot;
        break;
      }

      case ModalTypes.REPORT_USER: {
        modalContent = <ReportUser />;
        modalClass = classes.report;
        break;
      }

      case ModalTypes.DONATE: {
        modalContent = <Donate />;
        modalClass = classes.donate;
        break;
      }

      case ModalTypes.BAN: {
        modalContent = <BanModal />;
        modalClass = classes.ban;
        break;
      }

      case ModalTypes.LINK_ACCOUNT: {
        modalContent = <LinkAccountModal />;
        modalClass = classes.link;
        break;
      }

      case ModalTypes.UNLINK_ACCOUNT: {
        modalContent = <UnlinkAccountModal />;
        modalClass = classes.link;
        break;
      }

      case ModalTypes.PEERPLAYS_LOGIN: {
        modalContent = <PeerplaysLogin goRegister={ this.toggleModalAndRegister }/>;
        modalClass = classes.peerplays;
        break;
      }

      default: {
        break;
      }
    }

    return (
      <>
        {/* <Dialog open={ this.state.open } onClose={ this.handleClose } aria-labelledby='form-dialog-title' classes={ {paper: classes.dialog-paper__root} }> */}
        <Dialog open={ this.props.isModalOpen } onClose={ this.handleClose } aria-labelledby='form-dialog-title' maxWidth={ 'md' } PaperProps={ {classes: {root: modalClass}} }>
          <DialogContent>{modalContent}</DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalOpen: state.getIn(['modal', 'isOpen']),
  modalType: state.getIn(['modal', 'type']),
  previousModal: state.getIn(['modal', 'previous']),
  errorText: state.getIn(['profiles', 'loginErrorText'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData,
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
