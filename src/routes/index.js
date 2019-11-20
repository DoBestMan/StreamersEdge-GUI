import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import CreateChallenge from '../components/CreateChallenge';
import CreateProfile from '../components/CreateProfile';
import Callback from '../components/Callback';
import ResetForm from '../components/ForgotPassword/ResetForm';
import Preferences from '../components/Preferences';
import {requireAuthentication} from '../components/Auth/AuthComponent';
import {RouteConstants as Routes} from '../constants';
import UpdateProfile from '../components/UpdateProfile';
import Profile from '../components/Profile';

// https://github.com/supasate/connected-react-router/blob/master/examples/immutable/src/routes/index.js

const routes = (
  <>
    <Switch>
      <Route exact path={ Routes.ROOT } component={ Home }/>
      <Route path={ Routes.RESET_PASSWORD } component={ ResetForm }/>
      <Route path={ Routes.PROFILE } component={ requireAuthentication(CreateProfile) }/>
      <Route path={ Routes.DASHBOARD } component={ Dashboard }/>
      <Route path={ Routes.PREFERENCES } component={ requireAuthentication(Preferences) } />
      <Route path={ Routes.CREATE_CHALLENGE } component={ requireAuthentication(CreateChallenge) } />
      <Route path={ Routes.UPDATE_PROFILE } component={ requireAuthentication(UpdateProfile) } />
      <Route path={ Routes.CALLBACK } component={ Callback }/>
      <Route path={ Routes.USER_PROFILE } component={ Profile }/>
    </Switch>
  </>
);

export default routes;
