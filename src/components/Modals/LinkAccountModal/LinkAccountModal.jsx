import React, {Component} from 'react';
import {linkAccountRobot, linkAccountButton} from '../../../assets/images/modals';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from '@material-ui/core';
import {AccountActions, ModalActions, NavigateActions} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GenUtil} from '../../../utility';
import {AuthUtil} from '../../../utility';
import {withRouter} from 'react-router';
import {AuthService} from '../../../services';

const translate = GenUtil.translate;

class LinkAccountModal extends Component {

  handleSubmit = () => {
    if(this.props.modalData === 'peerplays') {
      AuthService.linkPeerplaysAccount(this.props.peerplaysAccountName).then((account) => {
        this.props.setAccount(account);
      });
    } else {
      AuthUtil.authVia(this.props.modalData, this.props.location.pathname);
    }

    this.handleClose();
    this.props.navigateToUpdateProfile();
  }

  handleClose = () => {
    this.props.setModalData('');
    this.props.toggleModal();
  }

  render() {
    return (
      <div className='link-account__wrapper'>
        <div className='link-account'>
          <IconButton className='link-account__cross' aria-label='Close' onClick={ this.handleClose }>
            <CloseIcon />
          </IconButton>
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
    setModalData: ModalActions.setModalData,
    setAccount: AccountActions.setAccountAction,
    navigateToUpdateProfile: NavigateActions.navigateToUpdateProfile
  },
  dispatch
);

const mapStateToProps = (state) => ({
  modalData: state.getIn(['modal', 'data']),
  peerplaysAccountName: state.getIn(['profiles','currentAccount','peerplaysAccountName'])
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LinkAccountModal));
