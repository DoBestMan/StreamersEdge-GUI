import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router';
import App from '../components/Home';

// https://github.com/supasate/connected-react-router/blob/master/examples/immutable/src/routes/index.js

const routes = (
  <Fragment>
    <Switch>
      <Route exact path='/' component={ App } />

    </Switch>
  </Fragment>
);

export default routes;