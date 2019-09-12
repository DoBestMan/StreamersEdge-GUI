import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ConnectedRouter} from 'connected-react-router/immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hot} from 'react-hot-loader/root';
import {create} from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import Header from './components/Header';
import RootModal from './components/RootModal';
import routes from './routes';
import {RouteConstants} from './constants';
import {NavigateActions} from './actions';
import {TokenUtil} from './utility';
import Footer from './components/Footer';
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
        (this.props.path.indexOf(RouteConstants.RESET_PASSWORD) !== -1 && TokenUtil.checkUrlLength(this.props.path))
      ) {
        return true;
      }
    };

    if (!isKnownPath()) {
      // Change the browser navigation to root.
      this.props.navigateToRoot();
    }
  }

  render() {
    return (
      <JssProvider jss={ jss } generateClassName={ generateClassName }>
        <ConnectedRouter history={ this.props.history }>
          <Header/>
          <ErrorBoxValidation />
          <RootModal/>
          <div className='body'>
            {routes}
          </div>
          <Footer/>
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
    path: state.getIn(['router', 'location', 'pathname'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigateToRoot: NavigateActions.noValidPathRedirect
  },
  dispatch
);

export default hot(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
