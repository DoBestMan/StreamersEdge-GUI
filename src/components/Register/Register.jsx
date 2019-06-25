import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderLogo from '../../assets/images/profile/streamers_edge_logo.png';
import RegisterForm from './RegisterForm';
import AuthFooter from '../Auth/AuthFooter';

class Register extends Component {

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }

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
            <AuthFooter></AuthFooter>
          </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['account', 'isLoggedIn'])});


export default connect(mapStateToProps)(Register);