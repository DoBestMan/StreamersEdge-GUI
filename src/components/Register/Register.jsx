import React, {Component} from 'react';
import {connect} from 'react-redux';

class Register extends Component {
  render() {
    return(
      <>
        <span className='register'>Register component</span>
      </>
    );
  }
}

export default connect()(Register);