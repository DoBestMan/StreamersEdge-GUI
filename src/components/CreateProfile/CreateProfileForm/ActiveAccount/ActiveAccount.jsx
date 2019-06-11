/**
 * Displays the linked account
 */

import React, {Component} from 'react';
import querystring from 'query-string';
import AuthService from './../../../../services/AuthService';
import ProfileService from './../../../../services/ProfileService';

class ActiveAccount extends Component {

  constructor(props) {
    super(props);
    
    // Set the initial input values
    this.state = {
      profile: ''
    };
  }

  componentDidMount() {

    if (this.props.search) {
      const code = querystring.parse(this.props.search).code;
      AuthService.authorize(code).then(() => {
        ProfileService.getProfile().then((profile) => {
          this.setState({
            profile
          });
        });
        
      });
    }
  }
  
  render () {
    return (
      <div className='profileform-active'>
        <span className='profileform-title__activelinked'>ACTIVE LINKED ACCOUNTS</span>
        <p>{this.state.profile.username}</p>
      </div>
    );
  }
}

export default ActiveAccount;
