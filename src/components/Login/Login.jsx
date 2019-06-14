import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderLogo from '../../assets/images/profile/streamers_edge_logo.png';
import AppActions from '../../actions/AppActions';
import {bindActionCreators} from 'redux';
import LoginForm from './LoginForm';
import AuthFooter from '../Auth/AuthFooter';
// import querystring from 'query-string';

class Login extends Component {

  handleSubmit() {
    // let next;

    // if (this.props.location.search) {
    //   next = querystring.parse(this.props.location.search).next;
    // }

    // this.props.login({name: 'freddy3', id: -1}, next);
  }


  render() {
    return(
      <>
            <div className='profile-header'>
              <img className='profile-headerlogo' src={ HeaderLogo } alt='Header'></img>
            </div>
            <div className='login-divider__top'/>
          <div className='login-page'>
            <span className='login-title'>STREAMERS EDGE LOGIN</span>
            <LoginForm handleLogin={ this.props.login }></LoginForm>
            <AuthFooter></AuthFooter>
          </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({login: AppActions.login}, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Login);