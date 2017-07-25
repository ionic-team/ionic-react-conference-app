import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SiteMenu from './SiteMenu';
import About from './pages/About';
import Account from './pages/Account';
import Login from './pages/Login';
import Map from './pages/Map';
import Schedule from './pages/Schedule';
import SessionDetail from './pages/SessionDetail';
import SpeakerList from './pages/SpeakerList';
import SpeakerDetail from './pages/SpeakerDetail';
import Support from './pages/Support';
import Signup from './pages/Signup';

const routes = {
  appPages: [
    { title: 'Schedule', exact: true, path: '/', icon: 'calendar', component: Schedule },
    { title: 'Speakers', exact: true, path: '/speakers', icon: 'contacts', component: SpeakerList },
    { title: 'Map', path: '/map', icon: 'map', component: Map },
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

ReactDOM.render((
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
), document.getElementById('root'));
