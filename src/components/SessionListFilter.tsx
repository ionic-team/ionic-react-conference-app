import React, { Component } from 'react';
import { IonHeader, IonButton, IonButtons, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonToggle } from '@ionic/react';

type Props = {
  filteredTracks: string[];
  allTracks: string[];
  dismissModal: () => void;
  updateTrackFilters: (trackList: string[]) => void;
}

type State = {
  trackFilters: string[];
}

export default class SessionListFilter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      trackFilters: props.filteredTracks
    }
  }

  toggleTrackFilter = (e: CustomEvent) => {
    this.setState((prevState) => {
      const trackFilters = (e.detail.checked) ?
        prevState.trackFilters.concat(e.detail.value) :
        prevState.trackFilters.filter(track => track !== e.detail.value);
      return {
        trackFilters
      }
    });
  }

  resetFilters = () => {
    this.props.updateTrackFilters([]);
    this.props.dismissModal;
  }

  applyFilters = () => {
    this.props.updateTrackFilters(this.state.trackFilters);
    this.props.dismissModal();
  }

  render() {
    return (
      <div className="ion-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={this.props.dismissModal}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>
              Filter Sessions
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={this.applyFilters} strong>Done</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent class="outer-content">
          <IonList>
            <IonListHeader>Tracks</IonListHeader>
            { this.props.allTracks.map((track) => (
              <IonItem key={track}>
                <span slot="start" className="dot"></span>
                <IonLabel>{track}</IonLabel>
                <IonToggle
                  onIonChange={this.toggleTrackFilter}
                  checked={this.state.trackFilters.indexOf(track) !== -1}
                  color="success"
                  value={track}
                ></IonToggle>
              </IonItem>
            ))}
          </IonList>
          <IonList>
            <IonItem onClick={this.resetFilters} detail={false} class="reset-filters">
              Reset All Filters
            </IonItem>
          </IonList>
        </IonContent>
      </div>
    );
  }
}
