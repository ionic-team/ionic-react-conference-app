import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { IonIcon, IonCard, IonCardHeader, IonCardContent, IonItem, IonAvatar, IonList, IonGrid, IonCol, IonRow, IonButton, IonHeader, IonContent, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import { Speaker } from '../store/speakers/types';
import { Session } from '../store/sessions/types';


interface ItemProps {
  speaker: Speaker;
  speakerSessions: Session[];
}

const SpeakerItem = ({ speaker, speakerSessions }: ItemProps) => {
  function openSpeakerShare(speaker: Speaker) {}
  function openContact(speaker: Speaker) {}

  return (
    <IonCard class="speaker-card">
      <IonCardHeader>
        <IonItem
          button
          detail={false}
          href="#"
          onClick={() => console.log('speakers', { id: speaker.id })}
        >
          <IonAvatar slot="start">
            <img src={process.env.PUBLIC_URL + speaker.profilePic} alt="Speaker profile pic"/>
          </IonAvatar>
          {speaker.name}
        </IonItem>
      </IonCardHeader>

      <IonCardContent class="outer-content">
        <IonList>
          { speakerSessions.map(session => (
            <IonItem
              href="#"
              key={session.name}
              onClick={() => console.log('sessions', { id: session.id })}
            >
              <h3>{session.name}</h3>
            </IonItem>
          ))}
          <IonItem button href="#" onClick={() => console.log('speakers', { id: speaker.id })}>
            <h3>About {speaker.name}</h3>
          </IonItem>
        </IonList>
      </IonCardContent>

      <IonRow no-padding justify-content-center>
        <IonCol text-left size="4">
          <IonButton fill="clear" size="small" color="primary"
            onClick={() => window.open(`https://www.twitter.com/${speaker.twitter}`, '_blank')}
          >
            <IonIcon slot="start" name="logo-twitter"></IonIcon>
            Tweet
          </IonButton>
        </IonCol>
        <IonCol text-left size="4">
          <IonButton fill="clear" size="small" color="primary" onClick={() => openSpeakerShare(speaker)}>
            <IonIcon slot="start" name='share-alt'></IonIcon>
            Share
          </IonButton>
        </IonCol>
        <IonCol text-left size="4">
          <IonButton fill="clear" size="small" color="primary" onClick={() => openContact(speaker)}>
            <IonIcon slot="start" name='chatboxes'></IonIcon>
            Contact
          </IonButton>
        </IonCol>
      </IonRow>
    </IonCard>
  );
};

type ListProps = {
  speakers: Speaker[],
  sessions: Session[],
}

const SpeakerList = ({ speakers, sessions }: ListProps) => (
  <>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonButton>
            <IonIcon slot="icon-only" name="menu"></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle>Speakers</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="outer-content speaker-list">
      <IonList>
        <IonGrid fixed>
          <IonRow align-items-stretch>
            <IonCol size="12" size-md="6">
              { speakers.map((speaker) =>
                <SpeakerItem
                  key={speaker.id}
                  speaker={speaker}
                  speakerSessions={sessions.filter(session => session.speakerIds.indexOf(speaker.id) !== -1)}
                />
              ) }
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonList>
    </IonContent>
  </>
);

const mapStateToProps = (state: RootState) => ({
  speakers: state.speakers.speakers,
  sessions: state.sessions.sessions
});

export default connect(mapStateToProps)(SpeakerList)
