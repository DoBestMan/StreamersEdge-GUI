import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppActions} from '../../actions';
import LoginForm from './LoginForm';
import AuthFooter from '../Auth/AuthFooter';

class Login extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <>
        <div className='login-page'>
          <span className='login-title'>STREAMERS EDGE LOGIN</span>
          <LoginForm handleLogin={ this.props.login } />
          <AuthFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['profiles', 'isLoggedIn'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    login: AppActions.login
  },
  dispatch
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
