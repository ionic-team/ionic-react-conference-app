import React from 'react';
import LocationContainer from '../containers/Location';
import Map from '../components/Map';
import './Map.scss';

const MapPage = () => [
  <ion-header key={1}>
    <ion-navbar>
      <ion-buttons slot="start">
        <ion-button menuToggle>
          <ion-icon slot="icon-only" name="menu"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Map</ion-title>
    </ion-navbar>
  </ion-header>,

  <ion-content key={2} class="map-page">
    <LocationContainer>
      {({locations}) => (
        <Map locations={locations} />
      )}
    </LocationContainer>
  </ion-content>
];

export default MapPage;
