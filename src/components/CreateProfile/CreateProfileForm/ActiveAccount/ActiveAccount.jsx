/**
 * Displays the linked account.
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import placeholder from '../../../../assets/images/profile/email.svg';

class ActiveAccount extends Component {
  constructor(props) {
    super(props);

    // Set the initial input values
    this.state = {
      profile: ''
    };
  }

  render() {
    return (
      <div className='profileform-active'>
        <span className='profileform-title__activelinked'>ACTIVE LINKED ACCOUNTS</span>
        <div className='linkPeerplays'>
          <Link to='/peerplays'>
            <img src={ placeholder } width='456' alt='' />
          </Link>
        </div>
      </div>
    );
  }
}

export default ActiveAccount;
