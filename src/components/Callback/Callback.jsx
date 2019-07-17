/**
 * Callback Handler on the front end for redirects initiated from the backend.
 */

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {AuthService} from '../../services';

class Callback extends Component {
  constructor() {
    super();
    this.state = {error: ''};
  }

  componentDidMount() {
    this.handleCallback();
  }

  // Handle callback based on type passed
  handleCallback = () => {
    const path = this.props.location.pathname;
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
            this.props.history.push('/login');
          })
          .catch((err) => {
            this.setState({
              error: err
            });
            console.error(err);
          });
        break;
      case 'reset-password':
        this.props.history.push(`/forgot-password?token=${pathAry[3]}`);
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

export default withRouter(Callback);
