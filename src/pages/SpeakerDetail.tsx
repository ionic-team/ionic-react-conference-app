import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../store';
import { IonIcon, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton, IonBackButton } from '@ionic/react'
import './SpeakerDetail.css';
import { logoTwitter, logoGithub, logoInstagram } from 'ionicons/icons';

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
            <IonBackButton defaultHref={`/${match.params.tab}`} />
          </IonButtons>
          <IonTitle>{speaker.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding speaker-detail speaker-page-list">
        <div>
          <img src={speaker.profilePic} alt={speaker.name}/>
          <br/>
          <IonButton icon-only color="twitter">
            <IonIcon icon={logoTwitter}></IonIcon>
          </IonButton>
          <IonButton icon-only color="github">
            <IonIcon icon={logoGithub}></IonIcon>
          </IonButton>
          <IonButton icon-only color="instagram">
            <IonIcon icon={logoInstagram}></IonIcon>
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
