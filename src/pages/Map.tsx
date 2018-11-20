import React from 'react';
import LocationContainer from '../containers/Location';
import Map from '../components/Map';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '../ionic';
import './Map.scss';

const MapPage = () => [
  <IonHeader key={1}>
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle>Map</IonTitle>
    </IonToolbar>
  </IonHeader>,

  <IonContent key={2} class="map-page">
    <LocationContainer>
      {({ locations }) => (
        <Map locations={locations} />
      )}
    </LocationContainer>
  </IonContent>
];

export default MapPage;
