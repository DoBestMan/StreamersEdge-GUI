import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import CreateProfile from '../components/CreateProfile';
import Callback from '../components/Callback';
import ResetForm from '../components/ForgotPassword/ResetForm';
import PeerplaysLogin from '../components/PeerplaysLogin/';
import UpdateProfile from '../components/UpdateProfile';
import Preferences from '../components/Preferences';
import {requireAuthentication} from '../components/Auth/AuthComponent';
import {RouteConstants as Routes} from '../constants';

// https://github.com/supasate/connected-react-router/blob/master/examples/immutable/src/routes/index.js

const routes = (
  <>
    <Switch>
      <Route exact path={ Routes.ROOT } component={ Home }/>
      <Route path={ Routes.PEERPLAYS } component={ requireAuthentication(PeerplaysLogin) } />
      <Route path={ Routes.SIGN_UP } component={ Register }/>
      <Route path={ Routes.FORGOT_PASSWORD } component={ ResetForm }/>
      <Route path={ Routes.PROFILE } component={ requireAuthentication(CreateProfile) }/>
      <Route path={ Routes.DASHBOARD } component={ requireAuthentication(Dashboard) }/>
      <Route path={ Routes.CALLBACK } component={ Callback }/>
      <Route path={ Routes.PREFERENCES } component={ requireAuthentication(Preferences) } />
      <Route path={ Routes.UPDATE_PROFILE } component={ requireAuthentication(UpdateProfile) }/>
    </Switch>
  </>
);

export default routes;