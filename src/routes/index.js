import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import CreateProfile from '../components/CreateProfile';
import Callback from '../components/Callback';
import ForgotPassword from '../components/ForgotPassword';
import {requireAuthentication} from '../components/Auth/AuthComponent';
import PeerplaysLogin from '../components/PeerplaysLogin/';

// https://github.com/supasate/connected-react-router/blob/master/examples/immutable/src/routes/index.js

const routes = (
  <React.Fragment>
    <Switch>
      <Route exact path='/' component={ Home }/>
      <Route path='/login' component={ Login }/>
      <Route path='/sign-up' component={ Register }/>
      <Route path='/forgot-password' component={ ForgotPassword }/>
      <Route path='/profile' component={ CreateProfile }/>
      <Route path='/dashboard' component={ requireAuthentication(Dashboard) }/>
      <Route path='/peerplays' component={ PeerplaysLogin }/>
      <Route path='/callback' component={ Callback }/>
    </Switch>
  </React.Fragment>
);

export default routes;