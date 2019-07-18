import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import CreateProfile from '../components/CreateProfile';
import Callback from '../components/Callback';
import ResetForm from '../components/ForgotPassword/ResetForm';
import Header from '../components/Header';
import PeerplaysLogin from '../components/PeerplaysLogin/';
import UpdateProfile from '../components/UpdateProfile';
import RootModal from '../components/RootModal';
import {requireAuthentication} from '../components/Auth/AuthComponent';

// https://github.com/supasate/connected-react-router/blob/master/examples/immutable/src/routes/index.js

const routes = (
  <React.Fragment>
    <Route path='/' component= { Header }/>
    <Route path='/' component= { RootModal }/>
    <Switch>
      <Route exact path='/' component={ Home }/>
      <Route path='/sign-up' component={ Register }/>
      <Route path='/forgot-password' component={ ResetForm }/>
      <Route path='/profile' component={ CreateProfile }/>
      <Route path='/dashboard' component={ requireAuthentication(Dashboard) }/>
      <Route path='/peerplays' component={ PeerplaysLogin }/>
      <Route path='/callback' component={ Callback }/>
      <Route path='/update-profile' component={ UpdateProfile }/>
    </Switch>
  </React.Fragment>
);

export default routes;