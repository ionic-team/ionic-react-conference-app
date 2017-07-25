import React from 'react';
import LocationList from '../containers/LocationList';

const Map = () => (
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </ion-button>
        <ion-title>Map</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content class="map-page">
      <LocationList />
    </ion-content>
  </ion-page>
)

export default Map;
