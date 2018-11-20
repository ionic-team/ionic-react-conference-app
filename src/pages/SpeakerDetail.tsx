import React from 'react';
import SessionDetail from '../containers/SessionDetail';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton } from '../ionic'
import './SpeakerList.scss';


export default ({ nav, params }) => (
  <SessionDetail>
    {({ speakers }) => {
      const speaker = speakers.find(s => s.id === parseInt(params.id, 10));
      return [
        <IonHeader key={1}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton href="#" onClick={() => nav.pop()} color="primary">
                <IonIcon slot="icon-only" name="arrow-back"></IonIcon>Back
              </IonButton>
            </IonButtons>
            <IonTitle>{speaker.name}</IonTitle>
          </IonToolbar>
        </IonHeader>,

        <IonContent padding class="speaker-detail speaker-page-list" key={2}>
          <div>
            <img src={speaker.profilePic} alt={speaker.name}/>
            <br/>
            <IonButton icon-only clear small color="twitter">
              <IonIcon name="logo-twitter"></IonIcon>
            </IonButton>
            <IonButton icon-only clear small color="github">
              <IonIcon name="logo-github"></IonIcon>
            </IonButton>
            <IonButton icon-only clear small color="instagram">
              <IonIcon name="logo-instagram"></IonIcon>
            </IonButton>
          </div>

          <p>{speaker.about}</p>
        </IonContent>
      ];
    }}
  </SessionDetail>
);
