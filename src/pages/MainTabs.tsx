import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { Route, Navigate } from 'react-router-dom';
import { calendar, location, informationCircle, people } from 'ionicons/icons';
import SchedulePage from './SchedulePage';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import SessionDetail from './SessionDetail';
import MapView from './MapView';
import About from './About';

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/*
          Paths are relative to the parent "/tabs/*" route defined in App.tsx.
          Routes that share a tab's path prefix (e.g. schedule/:id) render
          inside that tab and keep its navigation stack intact.
        */}
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="schedule/:id" element={<SessionDetail />} />
        <Route path="speakers" element={<SpeakerList />} />
        <Route path="speakers/:id" element={<SpeakerDetail />} />
        <Route path="speakers/sessions/:id" element={<SessionDetail />} />
        <Route path="map" element={<MapView />} />
        <Route path="about" element={<About />} />
        <Route index element={<Navigate to="schedule" replace />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/tabs/schedule">
          <IonIcon icon={calendar} />
          <IonLabel>Schedule</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/speakers">
          <IonIcon icon={people} />
          <IonLabel>Speakers</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={location} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={informationCircle} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
