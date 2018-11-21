import React from 'react';
import Map from '../components/Map';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '../ionic';
import './Map.scss';

const MapPage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Map</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="map-page">
      <Map locations={locations} />
    </IonContent>
  </>
);

export default MapPage;
