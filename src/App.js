import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ConnectedRouter} from 'connected-react-router/immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hot} from 'react-hot-loader/root';
import {create} from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import Header from './components/Header';
import RootModal from './components/RootModal';
import LeftMenu from './components/LeftMenu';
import RightMenu from './components/RightMenu';
import routes from './routes';
import {RouteConstants} from './constants';
import {NavigateActions} from './actions';
import {TokenUtil} from './utility';
import {validPage} from './utility/GeneralUtils';
import ErrorBoxValidation from './components/ErrorBoxValidation';

const styleNode = document.createComment('insertion-point-jss');
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName({
  disableglobal: true
});

const jss = create({
  ...jssPreset(),
  insertionPoint: 'insertion-point-jss'
});

class App extends Component {
  state = {
    openLeftMenu: false,
    openRightMenu: false
  };

  componentDidMount() {
    /**
     * Check that the current route matches the component.
     * Since we do not have a 404 catch all route page, we render the home component if the route does not exist but...
     * - the route will still have what the user initially tried to get to so we update it via NavigateActions.
     */

    const isKnownPath = () => {
      const routeValues = Object.values(RouteConstants);

      if (
        (routeValues.indexOf(this.props.path) !== -1 &&
        routeValues.indexOf('login?next=/') === -1) ||
        (this.props.path.indexOf(RouteConstants.RESET_PASSWORD) !== -1 && TokenUtil.checkUrlLength(this.props.path)) ||
        (this.props.path.indexOf(RouteConstants.PROFILE) !== -1 && validPage(this.props.path))
      ) {
        return true;
      }
    };

    if (!isKnownPath() || this.props.path === RouteConstants.ROOT) {
      // Change the browser navigation to root.
      this.props.noValidPathRedirect();
    }
  }

  toggleOpenLeftMenu = () => {
    this.setState((state) => ({
      openLeftMenu: !state.openLeftMenu
    }));
  }

  toggleOpenRightMenu = () => {
    this.setState((state) => ({
      openRightMenu: !state.openRightMenu
    }));
  }

  render() {
    return (
      <JssProvider jss={ jss } generateClassName={ generateClassName }>
        <ConnectedRouter history={ this.props.history }>
          <Header toggleMenu={ this.toggleOpenRightMenu } />
          <ErrorBoxValidation />
          <RootModal/>
          <div className='body'>
            {this.props.isLoggedIn &&
              <LeftMenu open={ this.state.openLeftMenu } toggleOpen={ this.toggleOpenLeftMenu } />
            }
            <div
              className={ classNames(
                'body-content',
                {
                  'body-content__open-both': this.state.openLeftMenu && this.state.openRightMenu,
                  'body-content__open-left': this.state.openLeftMenu && !this.state.openRightMenu,
                  'body-content__open-right': !this.state.openLeftMenu && this.state.openRightMenu
                }
              ) }
            >
              {routes}
            </div>
            {this.props.isLoggedIn &&
              <RightMenu open={ this.state.openRightMenu }/>
            }
          </div>
        </ConnectedRouter>
      </JssProvider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    path: state.getIn(['router', 'location', 'pathname']),
    isLoggedIn: state.getIn(['profiles', 'isLoggedIn']),
    peerplaysAccountName: state.getIn(['profiles','currentAccount','peerplaysAccountName'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    noValidPathRedirect: NavigateActions.noValidPathRedirect
  },
  dispatch
);

export default hot(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
