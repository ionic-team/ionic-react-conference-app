import { getMode } from '@ionic/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonCheckbox,
  IonFooter,
  IonIcon,
} from '@ionic/react';
import {
  logoReact,
  call,
  document,
  logoIonic,
  hammer,
  restaurant,
  cog,
  colorPalette,
  construct,
  compass,
} from 'ionicons/icons';
import React, { useState } from 'react';

import './SessionListFilter.css';

import { connect } from '../data/connect';
import { updateFilteredTracks } from '../data/sessions/sessions.actions';

interface OwnProps {
  onDismissModal: () => void;
}

interface StateProps {
  allTracks: string[];
  filteredTracks: string[];
}

interface DispatchProps {
  updateFilteredTracks: typeof updateFilteredTracks;
}

type SessionListFilterProps = OwnProps & StateProps & DispatchProps;

const SessionListFilter: React.FC<SessionListFilterProps> = ({
  allTracks,
  filteredTracks,
  onDismissModal,
  updateFilteredTracks,
}) => {
  const ios = getMode() === 'ios';
  // The track changes stay here until Done, so Cancel, swiping the iOS card down, or tapping the backdrop discards them.
  const [draftTracks, setDraftTracks] = useState(filteredTracks);

  const toggleTrackFilter = (track: string) => {
    setDraftTracks((tracks) => (tracks.includes(track) ? tracks.filter((x) => x !== track) : [...tracks, track]));
  };

  const handleDone = () => {
    updateFilteredTracks(draftTracks);
    onDismissModal();
  };

  const handleDeselectAll = () => {
    setDraftTracks([]);
  };

  const handleSelectAll = () => {
    setDraftTracks([...allTracks]);
  };

  const iconMap: { [key: string]: any } = {
    React: logoReact,
    Documentation: document,
    Food: restaurant,
    Ionic: logoIonic,
    Tooling: hammer,
    Design: colorPalette,
    Services: cog,
    Workshop: construct,
    Navigation: compass,
    Communication: call,
  };

  return (
    <>
      <IonHeader translucent={true} className="session-list-filter">
        <IonToolbar>
          <IonButtons slot="start">
            {ios && <IonButton onClick={onDismissModal}>Cancel</IonButton>}
            {!ios && <IonButton onClick={handleDeselectAll}>Reset</IonButton>}
          </IonButtons>

          <IonTitle>Filter Sessions</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={handleDone} strong>
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="session-list-filter">
        <IonList lines={ios ? 'inset' : 'full'}>
          <IonListHeader>Tracks</IonListHeader>

          {allTracks.map((track) => (
            <IonItem key={track}>
              {ios && <IonIcon slot="start" icon={iconMap[track]} color="medium" aria-hidden="true" />}
              <IonCheckbox
                onIonChange={() => toggleTrackFilter(track)}
                checked={draftTracks.includes(track)}
                color="primary"
                value={track}
              >
                {track}
              </IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <IonFooter translucent={true} className="session-list-filter">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleDeselectAll}>Deselect All</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleSelectAll}>Select All</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    allTracks: state.data.allTracks,
    filteredTracks: state.data.filteredTracks,
  }),
  mapDispatchToProps: {
    updateFilteredTracks,
  },
  component: SessionListFilter,
});
