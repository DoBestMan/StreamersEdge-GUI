import React, {Component} from 'react';
import {unlinkAccountRobot, closeButton, unlinkAccountButton} from '../../../assets/images/modals';
import {ModalActions, AccountActions} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GenUtil} from '../../../utility';
import {withRouter} from 'react-router';
import {ProfileService} from '../../../services';

const translate = GenUtil.translate;

class UnlinkAccountModal extends Component {

  getUnlinkData = () => {
    const authService = this.props.modalData;
    let account = authService;

    switch (authService) {
      case 'pubg':
        account = account + 'Username';
        break;
      case 'google':
        account = 'googleName';
        break;
      case 'twitch':
        account = account+ 'UserName';
        break;
      default:
        break;
    }

    return {[account]: ''};
  }

  handleSubmit = () => {
    const account = this.getUnlinkData();
    ProfileService.updateProfile(account).then((res) => {
      this.props.setAccount(res);
    });
    this.handleClose();
  }

  handleClose = () => {
    this.props.setModalData('');
    this.props.toggleModal();
  }

  render() {
    return (
      <div className='unlink-account__wrapper'>
        <div className='unlink-account'>
          <div className='unlink-account__cross' onClick={ this.handleClose }>
            <img className='unlink-account__cross-img' src={ closeButton } alt=''/>
          </div>
          <div className='unlink-account__icon'>
            <img className='unlink-account__icon-img' src={ unlinkAccountRobot } alt=''/>
          </div>
          <div className='unlink-account-text'>
            <p className='unlink-account-text__header'>{translate('link.unlinkHeader')}</p>
          </div>
          <img onClick={ this.handleSubmit }className='unlink-account-button' src={ unlinkAccountButton } alt=''/>
          <span onClick={ ()=> console.log('placeholder terms & conditions') } className='unlink-account-text__terms' href=''><p >{translate('link.terms')}</p></span>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalData: ModalActions.setModalData,
    setAccount: AccountActions.setAccountAction
  },
  dispatch
);

const mapStateToProps = (state) => ({
  modalData: state.getIn(['modal', 'data'])
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UnlinkAccountModal));