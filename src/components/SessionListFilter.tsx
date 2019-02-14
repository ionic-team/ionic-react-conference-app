import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/react';
import React, { FunctionComponent, useState } from 'react';

type Props = {
  filteredTracks: string[];
  allTracks: string[];
  dismissModal: () => void;
  updateTrackFilters: (trackList: string[]) => void;
};

export const SessionListFilter: FunctionComponent<Props> = props => {
  const [trackFilters, setTrackFilters] = useState(props.filteredTracks);

  const toggleTrackFilter = (e: CustomEvent) => {
    setTrackFilters(
      e.detail.checked
        ? trackFilters.concat(e.detail.value)
        : trackFilters.filter(track => track !== e.detail.value)
    );
  };

  const resetFilters = () => {
    props.updateTrackFilters([]);
    props.dismissModal;
  };

  const applyFilters = () => {
    props.updateTrackFilters(trackFilters);
    props.dismissModal();
  };
  return (
    <div className="ion-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.dismissModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Filter Sessions</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={applyFilters} strong>
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="outer-content">
        <IonList>
          <IonListHeader>Tracks</IonListHeader>
          {props.allTracks.map(track => (
            <IonItem key={track}>
              <span slot="start" className="dot" />
              <IonLabel>{track}</IonLabel>
              <IonToggle
                onIonChange={toggleTrackFilter}
                checked={trackFilters.indexOf(track) !== -1}
                color="success"
                value={track}
              />
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonItem onClick={resetFilters} detail={false} class="reset-filters">
            Reset All Filters
          </IonItem>
        </IonList>
      </IonContent>
    </div>
  );
};
