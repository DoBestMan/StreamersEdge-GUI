import React, {Component} from 'react';
import {linkAccountRobot, closeButton, linkAccountButton} from '../../../assets/images/modals';
import {ModalActions} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GenUtil} from '../../../utility';
import {AuthUtil} from '../../../utility';
import {withRouter} from 'react-router';

const translate = GenUtil.translate;

class LinkAccountModal extends Component {

  handleSubmit = () => {
    AuthUtil.authVia(this.props.modalData, this.props.location.pathname);
  }

  handleClose = () => {
    this.props.setModalData('');
    this.props.toggleModal();
  }

  render() {
    return (
      <div className='link-account__wrapper'>
        <div className='link-account'>
          <div className='link-account__cross' onClick={ this.handleClose }>
            <img className='link-account__cross-img' src={ closeButton } alt=''/>
          </div>
          <div className='link-account__icon'>
            <img className='link-account__icon-img' src={ linkAccountRobot } alt=''/>
          </div>
          <div className='link-account-text'>
            <p className='link-account-text__header'>{translate('link.header')}</p>
          </div>
          <img onClick={ this.handleSubmit }className='link-account-button' src={ linkAccountButton } alt=''/>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <span onClick={ ()=> console.log('placeholder terms & conditions') } className='link-account-text__terms' href=''><p >{translate('link.terms')}</p></span>
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
)(withRouter(LinkAccountModal));