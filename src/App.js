import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute, RequiresTutorialRoute } from './utils/routing';
import Account from './pages/Account';
import Login from './pages/Login';
import Support from './pages/Support';
import Signup from './pages/Signup';
import Tutorial from './pages/Tutorial';
import AppStack from './pages/AppStack';

/*
const routes = {
  appPages: [
    { title: 'Schedule', exact: true, path: '/', icon: 'calendar', component: AppStack },
    { title: 'Speakers', exact: true, path: '/speakers', icon: 'contacts', component: AppStack },
    { title: 'Map', path: '/map', icon: 'map', component: AppStack },
    { title: 'About', path: '/about', icon: 'information-circle', component: AppStack }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: 'person', component: Account, private: true },
    { title: 'Support', path: '/support', icon: 'help', component: Support },
    { title: 'Logout', path: '/logout', icon: 'log-out' }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: 'log-in', component: Login },
    { title: 'Support', path: '/support', icon: 'help', component: Support },
    { title: 'Signup', path: '/signup', icon: 'person-add', component: Signup }
  ]
}
*/

const App = () => (
  <Router>
    <ion-app>
      <PrivateRoute path='/account' component={Account} />
      <Route path="/tutorial" component={Tutorial} />
      <RequiresTutorialRoute path="/login" component={Login} />
      <RequiresTutorialRoute path="/support" component={Support} />
      <RequiresTutorialRoute path="/signup" component={Signup} />
      <RequiresTutorialRoute path="/" component={AppStack}/>
    </ion-app>
  </Router>
);

export default App;
