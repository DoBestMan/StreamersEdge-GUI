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
  handleCallback = () => {
    const path = this.props.location;
    const pathAry = path.split('/');
    const lastAccessedPage = StorageUtil.get('se-page');
    let cb = pathAry[2] ? pathAry[2] : lastAccessedPage.split('/')[1];

    switch (cb) {
      case 'confirm-email':
        AuthService.confirmEmail(pathAry[3])
          .then(() => {
            this.props.setLoggedIn(true);
            this.props.navigateToDashboard();
          })
          .catch((err) => {
            this.setState({
              error: err
            });
          });
        break;
      case 'change-email':
        AuthService.confirmEmail(pathAry[3])
          .then(() => {
            this.props.navigateToCreateProfile('1');
          })
          .catch((err) => {
            this.setState({
              error: err
            });
          });
        break;
      case 'reset-password':
        this.props.navigateToPasswordReset(pathAry[3]);
        break;
      case 'profile':
        ProfileService.getProfile().then((account) => {
          this.props.setAccount(account);
          this.props.navigateToDashboard();
        }).catch((err) => {
          this.setState({
            error: err
          });
        });
        break;
      case 'login':
        ProfileService.getProfile().then((account) => {
          this.props.setAccount(account);
          this.props.setLoggedIn(true);
          this.props.navigateToDashboard();
        }).catch((err) => {
          this.setState({
            error: err
          });
        });
        break;
      default:
        // an error occurred.
        console.warn('Error - unidentified callback');
        break;
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
    navigateToPasswordReset: NavigateActions.navigateToPasswordReset,
    navigateToCreateProfile: NavigateActions.navigateToCreateProfile,
    setAccount: AccountActions.setAccountAction
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Callback);

