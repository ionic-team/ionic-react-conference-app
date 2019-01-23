import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../store';
import { IonIcon, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton, IonBackButton } from '@ionic/react'
import './SpeakerDetail.css';

type Props = RouteComponentProps<{ id: string, tab: string}> & ReturnType<typeof mapStateToProps> & {
  goBack: () => void;
};

const SpeakerDetail: React.SFC<Props> = ({ speakers, match, goBack }) => {
  const speaker = speakers.find(s => s.id === parseInt(match.params.id, 10));
  if (!speaker) {
    return null;
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton goBack={goBack} defaultHref={`/${match.params.tab}`} />
          </IonButtons>
          <IonTitle>{speaker.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent padding class="speaker-detail speaker-page-list">
        <div>
          <img src={speaker.profilePic} alt={speaker.name}/>
          <br/>
          <IonButton icon-only color="twitter">
            <IonIcon name="logo-twitter"></IonIcon>
          </IonButton>
          <IonButton icon-only color="github">
            <IonIcon name="logo-github"></IonIcon>
          </IonButton>
          <IonButton icon-only color="instagram">
            <IonIcon name="logo-instagram"></IonIcon>
          </IonButton>
        </div>

        <p>{speaker.about}</p>
      </IonContent>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  speakers: state.speakers.speakers
});

export default connect(
  mapStateToProps
)(SpeakerDetail)
