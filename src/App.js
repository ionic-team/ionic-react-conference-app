import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute, RequiresTutorialRoute } from './utils/routing';
import About from './pages/About';
import Account from './pages/Account';
import Login from './pages/Login';
import MapPage from './pages/Map';
import SchedulePage from './pages/SchedulePage';
import SessionDetail from './pages/SessionDetail';
import SpeakerList from './pages/SpeakerList';
import SpeakerDetail from './pages/SpeakerDetail';
import Support from './pages/Support';
import Signup from './pages/Signup';
import Tutorial from './pages/Tutorial';


const routes = {
  appPages: [
    { title: 'Schedule', exact: true, path: '/', icon: 'calendar', component: SchedulePage },
    { title: 'Speakers', exact: true, path: '/speakers', icon: 'contacts', component: SpeakerList },
    { title: 'Map', path: '/map', icon: 'map', component: MapPage },
    { title: 'About', path: '/about', icon: 'information-circle', component: About }
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

const App = () => (
  <Router>
    <ion-app>
      { Object.keys(routes)
          .reduce((finalList, key) => finalList.concat(routes[key]), [])
          .filter(route => !! route.path)
          .map((route, index) => (
        (route.private) ?
        <PrivateRoute
          exact={route.exact}
          key={index}
          path={route.path}
          component={route.component}
        />
        :
        <RequiresTutorialRoute
          exact={route.exact}
          key={index}
          path={route.path}
          component={route.component}
        />
      ))}
      <RequiresTutorialRoute path="/speakers/:speakerId" component={SpeakerDetail} />
      <RequiresTutorialRoute path="/sessions/:sessionId" component={SessionDetail} />
      <Route path="/tutorial" component={Tutorial} />
    </ion-app>
  </Router>
);

export default App;
