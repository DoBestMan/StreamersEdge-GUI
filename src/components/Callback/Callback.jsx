/**
 * Callback Handler on the front end for redirects initiated from the backend.
 */

import React, {Component} from 'react';
import {AuthService} from '../../services';
import {NavigateActions, AccountActions} from '../../actions';
import {ProfileService} from '../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StorageUtil} from '../../utility';
class Callback extends Component {

  componentDidMount() {
    this.handleCallback();
  }

  state = {
    error: ''
  };

  // Handle callback based on type passed
  handleCallback = async () => {
    const path = this.props.location;
    const pathAry = path.split('/');
    const lastAccessedPage = StorageUtil.get('se-page');
    let cb = pathAry[2] ? pathAry[2] : lastAccessedPage.split('/')[1];

    try {
      switch (cb) {
        case 'confirm-email':
          const account = await AuthService.confirmEmail(pathAry[3]);
          this.props.setAccount(account);
          this.props.setLoggedIn(true);
          this.props.navigateToCreateProfile('1');
          break;
        case 'change-email':
          await ProfileService.changeEmail(pathAry[3]);
          this.props.navigateToDashboard();
          break;
        case 'reset-password':
          this.props.navigateToPasswordReset(pathAry[3]);
          break;
        case 'profile':
          const profile = await ProfileService.getProfile();
          this.props.setAccount(profile);
          this.props.setLoggedIn(true);
          this.props.navigateToCreateProfile('1');
          break;
        case 'login':
          break;
        case 'update-profile':
          const res = await ProfileService.getProfile();
          this.props.setAccount(res);
          this.props.setLoggedIn(true);
          this.props.navigateToUpdateProfile();
          break;
        default:
          const response = await ProfileService.getProfile();
          this.props.setAccount(response);
          this.props.setLoggedIn(true);
          this.props.navigateToDashboard();
          break;
      }
    }catch (e) {
      this.setState({
        error: e
      });
    }
  };

  render() {
    return (
      <>
        <div className='callback-page'>
          <div className='callback-page__content'>{this.state.error}</div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({location: state.getIn(['router', 'location', 'pathname'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setLoggedIn: AccountActions.setIsLoggedInAction,
    navigateToDashboard: NavigateActions.navigateToDashboard,
    navigateToUpdateProfile: NavigateActions.navigateToUpdateProfile,
    navigateToPasswordReset: NavigateActions.navigateToPasswordReset,
    navigateToCreateProfile: NavigateActions.navigateToCreateProfile,
    setAccount: AccountActions.setAccountAction
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Callback);

