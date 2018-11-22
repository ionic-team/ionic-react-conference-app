import React from 'react';
import { connect } from 'react-redux';
import { RootState, selectors } from '../store';
import { Location } from '../store/locations/types';
import Map from '../components/Map';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '../ionic';
import './Map.scss';

type Props = {
  locations: Location[],
  mapCenter: Location
}

const MapPage = ({ locations, mapCenter }: Props) => (
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
      <Map locations={locations} mapCenter={mapCenter} />
    </IonContent>
  </>
);

const mapStateToProps = (state: RootState) => ({
  locations: state.locations.locations,
  mapCenter: selectors.locations.mapCenter(state.locations)
});

export default connect(
  mapStateToProps
)(MapPage);
