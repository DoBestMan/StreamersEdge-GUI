import React, {Component} from 'react';
import {successRobot, errorRobot} from '../../../assets/images/modals';
import CloseIcon from '@material-ui/icons/Close';
import {ModalActions, NavigateActions} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GenUtil} from '../../../utility';

const translate = GenUtil.translate;

class SubmitModal extends Component {

  state = {timerActive: false}

  componentDidUpdate(prevProps) {
    //once component loads props from redux && modaltype === sucess, set the closing timer
    if(this.props.modalType === 'success' && prevProps.modalType !== 'success') {
      this.setState({timerActive: true});

      setTimeout(()=> {
        this.setState({timerActive: false});
        this.handleClose();
      }, 10000);
    }

    //if the user closes the modal by clicking  outside of the modal
    if(!this.props.isModalOpen && prevProps.isModalOpen && prevProps.modalType === 'success') {
      this.handleRedirect(prevProps.redirect);
      this.props.setModalData('');
    }
  }

  handleClose = () => {
    //user closes the modal
    if(this.props.isModalOpen) {
      if(this.props.modalType === 'success') {
        this.handleRedirect();
      }

      this.props.setModalData('');
      this.props.toggleModal();
    }

    //timer expired
    if(!this.state.timerActive && this.props.isModalOpen) {
      this.handleRedirect();
      this.props.toggleModal();
    }
  }

  handleRedirect(url) {
    const redirect = this.props.redirect ? this.props.redirect : url;

    switch(redirect) {
      case '/dashboard':
        return this.props.navigateToDashboard();
      default:
        break;
    }
  }

  render() {
    const {headerText, subText, modalType} = this.props;
    const icon = modalType === 'error' ? errorRobot: successRobot;

    return (
      <div className='submit-modal__wrapper'>
        <div className='submit-modal'>
          <div className='submit-modal__cross' onClick={ this.handleClose }>
            <CloseIcon />
          </div>
          <div className='submit-modal__icon'>
            <img className='submit-modal__icon-img' src={ icon } alt=''/>
          </div>
          <div className='submit-modal-text'>
            <p className='submit-modal-text__header'>{headerText}</p>
            <p className='submit-modal-text__subText'>{subText} {this.props.modalType === 'success' ? <span className='submit-modal-text__redirect'
              onClick={ () => this.handleClose() }> {translate('preferences.modal.clickHere')}</span> : null}</p>
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalData: ModalActions.setModalData,
    navigateToDashboard: NavigateActions.navigateToDashboard
  },
  dispatch
);

const mapStateToProps = (state) => ({
  headerText: state.getIn(['modal', 'data', 'headerText']),
  subText: state.getIn(['modal', 'data', 'subText']),
  modalType: state.getIn(['modal', 'data', 'type']),
  redirect: state.getIn(['modal', 'data', 'redirect']),
  isModalOpen: state.getIn(['modal', 'isOpen'])
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitModal);
