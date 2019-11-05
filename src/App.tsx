import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MainTabs from './pages/MainTabs';
import { connect } from './data/connect';
import { AppContextProvider } from './components/AppContext';
import { loadData, setIsLoggedIn, setUsername } from './data/actions';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Support from './pages/Support';
import { Session } from './models/Session';
import Tutorial from './pages/Tutorial';
import HomeOrTutorial from './components/HomeOrTutorial';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  sessions: Session[],
}

interface DispatchProps {
  loadData: typeof loadData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface IonicAppProps extends StateProps, DispatchProps {}

const IonicApp: React.FC<IonicAppProps> = ({ sessions, setIsLoggedIn, setUsername, loadData }) => {

  useEffect(() => {
    loadData();
  }, []);

  return (
    sessions.length === 0 ? (
      <div></div>
    ) : (
        <IonApp>
          <IonReactRouter>
            <IonReactRouter>
              <IonSplitPane contentId="main">
                <Menu />
                <IonRouterOutlet id="main">
                  <Route path="/tabs" component={MainTabs} />
                  <Route path="/account" component={Account} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/support" component={Support} />
                  <Route path="/tutorial" component={Tutorial} />
                  <Route path="/logout" render={() => {
                    setIsLoggedIn(false);
                    setUsername(undefined);
                    return <Redirect to="/tabs" />
                  }} />
                  <Route path="/" component={HomeOrTutorial} exact />
                </IonRouterOutlet>
              </IonSplitPane>
            </IonReactRouter>
          </IonReactRouter>
        </IonApp>
      )
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    sessions: state.sessions,
    isLoaded: !state.isLoading
  }),
  mapDispatchToProps: { loadData, setIsLoggedIn, setUsername },
  component: IonicApp
});
