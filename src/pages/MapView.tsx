import { useState } from 'react';
import MapWrapper from '../components/Map';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonPage,
  useIonViewDidEnter,
} from '@ionic/react';
import { Location } from '../models/Location';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './MapView.scss';

interface OwnProps {}

interface StateProps {
  locations: Location[];
  mapCenter: Location;
}

interface DispatchProps {}

interface MapViewProps extends OwnProps, StateProps, DispatchProps {}

const MapView: React.FC<MapViewProps> = ({ locations, mapCenter }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useIonViewDidEnter(() => {
    setIsLoaded(true);
  });

  return (
    <IonPage id="map-view">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="map-page">
        {isLoaded ? <MapWrapper locations={locations} mapCenter={mapCenter} /> : null}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state),
  }),
  component: MapView,
});
