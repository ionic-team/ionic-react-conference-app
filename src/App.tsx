import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute, RequiresTutorialRoute } from './utils/routing';
import Account from './pages/Account';
import Login from './pages/Login';
import Support from './pages/Support';
import Signup from './pages/Signup';
import Tutorial from './pages/Tutorial';
import AppStack from './pages/AppStack';
import Menu from './components/Menu';
import { IonApp, IonSplitPane } from './ionic';
import { Provider } from 'react-redux';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import './theme.css';

import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div id="app">
        <IonApp>
          <Switch>
            <PrivateRoute path='/account' component={Account} />
            <Route path="/tutorial" component={Tutorial} />
            <RequiresTutorialRoute path="/login" component={Login} />
            <RequiresTutorialRoute path="/support" component={Support} />
            <RequiresTutorialRoute path="/signup" component={Signup} />
            <RequiresTutorialRoute path="/" component={AppStack} />
          </Switch>
        </IonApp>
      </div>
    </Router>
  </Provider>
);

export default App;
