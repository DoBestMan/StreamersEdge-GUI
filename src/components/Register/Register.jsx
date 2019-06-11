import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderLogo from '../../assets/images/profile/streamers_edge_logo.png';
import RegisterForm from './RegisterForm';

class Register extends Component {
  render() {
    return(
      <>
            <div className='profile-header'>
              <img className='profile-headerlogo' src={ HeaderLogo } alt='Header'></img>
            </div>
            <div className='register-divider__top'/>

          <div className='register-page'>
            <span className='register-title'>CREATE YOUR ACCOUNT</span>
            <RegisterForm></RegisterForm>
          </div>
      </>
    );
  }
}

export default connect()(Register);