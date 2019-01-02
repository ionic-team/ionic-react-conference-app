import React, { Component } from 'react';
import SchedulePage from './SchedulePage';
import SessionDetail from './SessionDetail';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import MapView from './Map';
import About from './About';
import StackNav from '../navigation/StackNav';
import TabNav from '../navigation/TabNav';
import { IonTab, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';

const ScheduleStack: React.SFC<any> = (props) => (
  <StackNav
    {...props}
    navViews={[
      {
        name: 'schedule',
        title: 'Schedule',
        path: '',
        getView: () => (SchedulePage),
      }, {
        name: 'sessions',
        title: 'Session Detail',
        path: 'sessions/:id',
        getView: () => (SessionDetail),
      }
    ]}
  />
);

const SpeakerStack: React.SFC<any> = (props) => (
  <StackNav
    {...props}
    navViews={[
      {
        name: 'speaker-list',
        title: 'Speakers',
        path: '',
        getView: () => (SpeakerList),
      }, {
        name: 'sessions',
        title: 'Session Detail',
        path: 'sessions/:id',
        getView: () => (SessionDetail),
      }, {
        name: 'speakers',
        title: 'Speaker Detail',
        path: 'speakers/:id',
        getView: () => (SpeakerDetail),
      }
    ]}
  ></StackNav>
);

const AppStack: React.SFC = () => (
  <div className="ion-page">
    <TabNav>
      <IonTab tab="schedule">
        <SchedulePage/>
      </IonTab>
      <IonTab tab="speakers">
        <SpeakerList/>
      </IonTab>
      <IonTab tab="map">
        <MapView/>
      </IonTab>
      <IonTab tab="about">
        <About/>
      </IonTab>

      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule">
          <IonIcon name="calendar" />
          <IonLabel>Schedule</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers">
          <IonIcon name="contacts" />
          <IonLabel>Speakers</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map">
          <IonIcon name="map" />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about">
          <IonIcon name="information-circle" />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </TabNav>
  </div>
);

export default AppStack;
