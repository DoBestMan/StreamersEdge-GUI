/**
 * Callback Handler on the front end for redirects initiated from the backend.
 */

import React, {Component} from 'react';
import {AuthService} from '../../services';
import {NavigateActions} from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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
    let cb = pathAry[2]; // 2 = Callback type, 3 = Token

    // Very simple bounds check
    if (2 >= pathAry.length) {
      cb = pathAry[0]; // Return empty string to error handle
    }

    switch (cb) {
      case 'confirm-email':
        AuthService.confirmEmail(pathAry[3])
          .then(() => {
            this.props.navigateToDashboard();
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
    navigateToDashboard: NavigateActions.navigateToDashboard,
    navigateToPasswordReset: NavigateActions.navigateToPasswordReset
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Callback);

