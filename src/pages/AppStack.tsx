import { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { actions, RootState } from '../store';
import About from './About';
import MapView from './Map';
import SchedulePage from './SchedulePage';
import SessionDetail from './SessionDetail';
import SpeakerDetail from './SpeakerDetail';
import SpeakerList from './SpeakerList';
import { calendar, contacts, map, informationCircle } from 'ionicons/icons';

type AppStackProps = typeof mapDispatchToProps;
class AppStack extends React.Component<AppStackProps> {
  constructor(props: AppStackProps) {
    super(props);

    props.updateLocations();
    props.updateSessions();
    props.updateSpeakers();
  }

  render() {
    return (
      <IonPage>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/" render={() => <Redirect to="/schedule" />} />
            <Route path="/:tab(schedule)" component={SchedulePage} exact={true} />
            <Route path="/:tab(speakers)" component={SpeakerList} exact={true} />
            <Route path="/:tab(speakers)/speaker/:id" component={SpeakerDetail} />
            <Route path="/:tab(schedule|speakers)/sessions/:id" component={SessionDetail} />
            <Route path="/:tab(map)" component={MapView} />
            <Route path="/:tab(about)" component={About} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="schedule" href="/schedule">
              <IonIcon icon={calendar} />
              <IonLabel>Schedule</IonLabel>
            </IonTabButton>
            <IonTabButton tab="speakers" href="/speakers">
              <IonIcon icon={contacts} />
              <IonLabel>Speakers</IonLabel>
            </IonTabButton>
            <IonTabButton tab="map" href="/map">
              <IonIcon icon={map} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>
            <IonTabButton tab="about" href="/about">
              <IonIcon icon={informationCircle} />
              <IonLabel>About</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonPage>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  updateLocations: () => actions.locations.updateLocations(),
  updateSessions: () => actions.sessions.updateSessions(),
  updateSpeakers: () => actions.speakers.updateSpeakers()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppStack);
