import React from 'react';
import PropTypes from 'prop-types';
import {ConnectedRouter} from 'connected-react-router/immutable';
import routes from './routes';
import {hot} from 'react-hot-loader/root';
import {create} from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';

const styleNode = document.createComment('insertion-point-jss');
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName({
  disableglobal: true
});
;
const jss = create({
  ...jssPreset(),
  insertionPoint: 'insertion-point-jss'
});

const App = ({history}) => {
  return (
    <JssProvider jss={ jss } generateClassName={ generateClassName }>
      <ConnectedRouter history={ history }>
        {routes}
      </ConnectedRouter>
    </JssProvider>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default hot(App);