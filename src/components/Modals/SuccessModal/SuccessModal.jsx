import React, {Component} from 'react';
import {successRobot, closeButton} from '../../../assets/images/modals';
import {ModalActions} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class SuccessModal extends Component {

  handleClose = () => {
    this.props.setModalData('');
    this.props.toggleModal();
  }

  render() {
    return (
      <div className='success-modal__wrapper'>
        <div className='success-modal'>
          <div className='success-modal__cross' onClick={ this.handleClose }>
            <img className='success-modal__cross-img' src={ closeButton } alt=''/>
          </div>
          <div className='success-modal__icon'>
            <img className='success-modal__icon-img' src={ successRobot } alt=''/>
          </div>
          <div className='success-modal-text'>
            <p className='success-modal-text__header'>{this.props.modalData ? this.props.modalData.header : ''}</p>
            <p className='success-modal-text__subText'>{this.props.modalData ? this.props.modalData.subText : ''}</p>
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalData: ModalActions.setModalData
  },
  dispatch
);

const mapStateToProps = (state) => ({
  modalData: state.getIn(['modal', 'data'])
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessModal);