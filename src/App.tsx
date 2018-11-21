import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute, RequiresTutorialRoute } from './utils/routing';
import Account from './pages/Account';
import Login from './pages/Login';
import Support from './pages/Support';
import Signup from './pages/Signup';
import Tutorial from './pages/Tutorial';
import AppStack from './pages/AppStack';
import { IonApp } from './ionic';
import { Provider } from 'react-redux';

import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <IonApp>
        <PrivateRoute path='/account' component={Account} />
        <Route path="/tutorial" component={Tutorial} />
        <RequiresTutorialRoute path="/login" component={Login} />
        <RequiresTutorialRoute path="/support" component={Support} />
        <RequiresTutorialRoute path="/signup" component={Signup} />
        <RequiresTutorialRoute path="/" component={AppStack}/>
      </IonApp>
    </Router>
  </Provider>
);

export default App;
