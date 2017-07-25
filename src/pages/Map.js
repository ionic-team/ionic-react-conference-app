import React from 'react';
import LocationContainer from '../containers/Location';
import Map from '../components/Map';

const MapPage = () => (
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
      <LocationContainer>
        {({locations}) => (
          <Map locations={locations} />
        )}
      </LocationContainer>
    </ion-content>
  </ion-page>
)

export default MapPage;
