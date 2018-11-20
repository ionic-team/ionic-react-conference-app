import React from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonItem, IonAvatar, IonList, IonGrid, IonCol, IonRow, IonButton, IonHeader, IonContent, IonToolbar, IonButtons, IonTitle } from '../ionic';
import SessionDetail from '../containers/SessionDetail';

function openSpeakerShare(speaker) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Share ' + speaker.name,
    buttons: [
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
          if ( window['cordova'] && window['cordova'].plugins.clipboard) {
            window['cordova'].plugins.clipboard.copy(
              'https://twitter.com/' + speaker.twitter
            );
          }
        }
      },
      {
        text: 'Share via ...'
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  });

  actionSheet.present();
}

function openContact(speaker) {
  let mode = this.config.get('mode');

  let actionSheet = this.actionSheetCtrl.create({
    title: 'Contact ' + speaker.name,
    buttons: [
      {
        text: `Email ( ${speaker.email} )`,
        icon: mode !== 'ios' ? 'mail' : null,
        handler: () => {
          window.open('mailto:' + speaker.email);
        }
      },
      {
        text: `Call ( ${speaker.phone} )`,
        icon: mode !== 'ios' ? 'call' : null,
        handler: () => {
          window.open('tel:' + speaker.phone);
        }
      }
    ]
  });

  actionSheet.present();
}

const SpeakerItem = ({speaker, speakerSessions, nav}) => (
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

export default ({ nav, params }) => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton menuToggle>
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
              <SessionDetail>
                {({ sessions, speakers }) => {
                  return speakers.map((speaker) => {
                    const speakerSessions = sessions.filter(session => session.speakerIds.includes(speaker.id));
                    return <SpeakerItem key={speaker.id} nav={nav} speaker={speaker} speakerSessions={speakerSessions} />;
                  });
                }}
              </SessionDetail>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonList>
    </IonContent>
  </>
);
