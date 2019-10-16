import React, {Component} from 'react';
import {successRobot, errorRobot, closeButton} from '../../../assets/images/modals';
import {ModalActions} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class SubmitModal extends Component {

  constructor(props) {
    super(props);
    const type = this.props.modalType || '';
    const icon = type === 'success' ? successRobot : errorRobot;

    this.state = {
      type,
      icon,
      headerText: '',
      subText: ''
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps && this.props.modalData) {
      this.setState({
        icon: this.props.modalType === 'success' ? successRobot : errorRobot,
        headerText: this.props.modalData.headerText || '',
        subText: this.props.modalData.subText || ''
      });
    }
  }

  handleClose = () => {
    this.props.setModalData('');
    this.props.toggleModal();
  }

  render() {
    const {icon, headerText, subText} = this.state;
    console.log(this.state);
    return (
      <div className='submit-modal__wrapper'>
        <div className='submit-modal'>
          <div className='submit-modal__cross' onClick={ this.handleClose }>
            <img className='submit-modal__cross-img' src={ closeButton } alt=''/>
          </div>
          <div className='submit-modal__icon'>
            <img className='submit-modal__icon-img' src={ icon } alt=''/>
          </div>
          <div className='submit-modal-text'>
            <p className='submit-modal-text__header'>{headerText}</p>
            <p className='submit-modal-text__subText'>{subText}</p>
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
  modalData: state.getIn(['modal', 'data']),
  modalType: state.getIn(['modal', 'data', 'type'])
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitModal);
