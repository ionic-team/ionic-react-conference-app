import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '../store';
import { History } from 'history';
import { IonIcon, IonMenuButton, IonCard, IonCardHeader, IonCardContent, IonItem, IonAvatar, IonList, IonGrid, IonCol, IonRow, IonButton, IonHeader, IonContent, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import { Speaker } from '../store/speakers/types';
import { Session } from '../store/sessions/types';


interface ItemProps {
  speaker: Speaker;
  speakerSessions: Session[];
  history: History;
}

const SpeakerItem = ({ speaker, speakerSessions, history }: ItemProps) => {
  function openSpeakerShare(speaker: Speaker) {}
  function openContact(speaker: Speaker) {}

  function goToLink(e: MouseEvent) {
    if (!e.currentTarget) {
      return;
    }
    e.preventDefault();
    history.push((e.currentTarget as HTMLAnchorElement).href);
  }

  return (
    <IonCard class="speaker-card">
      <IonCardHeader>
        <IonItem
          button
          detail={false}
          href={`/speakers/speaker/${speaker.id}`}
          onClick={goToLink}
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
              href={`/speakers/sessions/${session.id}`}
              key={session.name}
              onClick={goToLink}
            >
              <h3>{session.name}</h3>
            </IonItem>
          ))}
          <IonItem button href={`/speakers/speaker/${speaker.id}`} onClick={goToLink}>
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

type ListProps = RouteComponentProps & ReturnType<typeof mapStateToProps>;

const SpeakerList = ({ speakers, sessions, history }: ListProps) => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Speakers</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="outer-content speaker-list">
      <IonList>
        <IonGrid fixed>
          <IonRow align-items-stretch>
            { speakers.map((speaker) =>
              <IonCol size="12" size-md="6" key={speaker.id}>
                <SpeakerItem
                  speaker={speaker}
                  history={history}
                  speakerSessions={sessions.filter(session => session.speakerIds.indexOf(speaker.id) !== -1)}
                />
              </IonCol>
            ) }
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

export default connect(
  mapStateToProps
)(SpeakerList);
