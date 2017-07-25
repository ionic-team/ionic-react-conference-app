import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SiteMenu from './components/SiteMenu';
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

const routes = {
  appPages: [
    { title: 'Schedule', exact: true, path: '/', icon: 'calendar', component: SchedulePage },
    { title: 'Speakers', exact: true, path: '/speakers', icon: 'contacts', component: SpeakerList },
    { title: 'Map', path: '/map', icon: 'map', component: MapPage },
    { title: 'About', path: '/about', icon: 'information-circle', component: About }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: 'person', component: Account },
    { title: 'Support', path: '/support', icon: 'help', component: Support },
    { title: 'Logout', icon: 'log-out' }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: 'log-in', component: Login },
    { title: 'Support', path: '/support', icon: 'help', component: Support },
    { title: 'Signup', path: '/signup', icon: 'person-add', component: Signup }
  ]
}

const App = () => (
  <Router>
    <div>
      <SiteMenu {...routes}></SiteMenu>
      { Object.keys(routes)
          .reduce((finalList, key) => finalList.concat(routes[key]), [])
          .filter(route => !! route.path)
          .map((route, index) => (
        <Route
          exact={route.exact}
          key={index}
          path={route.path}
          component={route.component}
        />
      ))}
      <Route path="/speakers/:speakerId" component={SpeakerDetail} />
      <Route path="/sessions/:sessionId" component={SessionDetail} />
    </div>
  </Router>
);

export default App;