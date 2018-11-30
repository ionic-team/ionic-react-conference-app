import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { IonIcon, IonCard, IonCardHeader, IonCardContent, IonItem, IonAvatar, IonList, IonGrid, IonCol, IonRow, IonButton, IonHeader, IonContent, IonToolbar, IonButtons, IonTitle } from '../ionic';
import { Speaker } from '../store/speakers/types';
import { Session } from '../store/sessions/types';


interface ItemProps {
  speaker: Speaker;
  speakerSessions: Session[];
  nav: any;
}

const SpeakerItem = ({speaker, speakerSessions, nav}: ItemProps) => {
  function openSpeakerShare(speaker: Speaker) {}
  function openContact(speaker: Speaker) {}

  return (
    <IonCard class="speaker-card">
      <IonCardHeader>
        <IonItem
          detail-none
          href="#"
          onClick={() => nav.push('speakers', { id: speaker.id })}
        >
          <IonAvatar slot="start">
            <img src={speaker.profilePic} alt="Speaker profile pic"/>
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
              onClick={() => nav.push('sessions', { id: session.id })}
            >
              <h3>{session.name}</h3>
            </IonItem>
          ))}
          <IonItem href="#" onClick={() => nav.push('speakers', { id: speaker.id })}>
            <h3>About {speaker.name}</h3>
          </IonItem>
        </IonList>
      </IonCardContent>

      <IonGrid>
        <IonRow no-padding>
          <IonCol col-12 col-lg-auto text-center text-lg-left>
            <IonButton
              color="primary"
              onClick={() => window.open(`https://www.twitter.com/${speaker.twitter}`, '_blank')}
            >
              <IonIcon slot="start" name="logo-twitter"></IonIcon>
              Tweet
            </IonButton>
          </IonCol>
          <IonCol col-12 col-lg-auto text-center>
            <IonButton color="primary" onClick={() => openSpeakerShare(speaker)}>
              <IonIcon slot="start" name='share-alt'></IonIcon>
              Share
            </IonButton>
          </IonCol>
          <IonCol col-12 col-lg-auto text-center text-lg-right>
            <IonButton color="primary" onClick={() => openContact(speaker)}>
              <IonIcon slot="start" name='chatboxes'></IonIcon>
              Contact
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

type ListProps = {
  speakers: Speaker[],
  sessions: Session[],
  nav: any;
  params: any;
}

const SpeakerList = ({ speakers, sessions, nav, params }: ListProps) => (
  <>
    <IonHeader>
      <IonToolbar>
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
            <IonCol col-12 col-md-6 align-self-stretch align-self-center>
              { speakers.map((speaker) => {
                const speakerSessions = sessions.filter(session => session.speakerIds.indexOf(speaker.id) !== -1);
                return <SpeakerItem key={speaker.id} nav={nav} speaker={speaker} speakerSessions={speakerSessions} />;
              }) }
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
