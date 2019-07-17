/* eslint-disable jsdoc/require-jsdoc */
import React from 'react';
import {connect} from 'react-redux';
import {NavigateActions} from '../../actions';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isLoggedIn) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(NavigateActions.navigateToSignIn(redirectAfterLogin));
      }
    }

    render() {
      return this.props.isLoggedIn === true ? <Component { ...this.props } /> : null;
    }
  }

  const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['account', 'isLoggedIn'])});

  return connect(mapStateToProps)(AuthenticatedComponent);
}
