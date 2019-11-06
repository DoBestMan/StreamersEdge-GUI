/* eslint-disable jsdoc/require-jsdoc */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigateActions} from '../../actions';
import {Config} from '../../utility';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isLoggedIn && !!Config.requireAuthentication) {
        this.props.navigate('/');
      }
    }

    render() {

      if (Config.requireAuthentication) {
        return this.props.isLoggedIn ? <Component { ...this.props } /> : null;
      } else {
        return <Component { ...this.props } />;
      }
    }
  }

  const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['profiles', 'isLoggedIn'])});

  const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
      navigate: NavigateActions.navigate
    },
    dispatch
  );

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
