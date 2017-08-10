import React from 'react';
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
  <ion-card class="speaker-card">
    <ion-card-header>
      <ion-item
        detail-none
        href="#"
        onClick={() => nav.push('speakers', { id: speaker.id })}
      >
        <ion-avatar slot="start">
          <img src={speaker.profilePic} alt="Speaker profile pic"/>
        </ion-avatar>
        {speaker.name}
      </ion-item>
    </ion-card-header>

    <ion-card-content class="outer-content">
      <ion-list>
        { speakerSessions.map(session => (
          <ion-item
            href="#"
            key={session.name}
            onClick={() => nav.push('sessions', { id: session.id })}
          >
            <h3>{session.name}</h3>
          </ion-item>
        ))}
        <ion-item href="#" onClick={() => nav.push('speakers', { id: speaker.id })}>
          <h3>About {speaker.name}</h3>
        </ion-item>
      </ion-list>
    </ion-card-content>

    <ion-grid>
    <ion-row no-padding>
      <ion-col col-12 col-lg-auto text-center text-lg-left>
        <ion-button
          clear
          small
          color="primary"
          onClick={() => window.open(`https://www.twitter.com/${speaker.twitter}`, '_blank')}
        >
          <ion-icon slot="start" name="logo-twitter"></ion-icon>
          Tweet
        </ion-button>
      </ion-col>
      <ion-col col-12 col-lg-auto text-center>
        <ion-button clear small color="primary" onClick={() => openSpeakerShare(speaker)}>
          <ion-icon slot="start" name='share-alt'></ion-icon>
          Share
        </ion-button>
      </ion-col>
      <ion-col col-12 col-lg-auto text-center text-lg-right>
        <ion-button clear small color="primary" onClick={() => openContact(speaker)}>
          <ion-icon slot="start" name='chatboxes'></ion-icon>
          Contact
        </ion-button>
      </ion-col>
    </ion-row>
    </ion-grid>
  </ion-card>
);

export default ({ nav, params }) => [
  <ion-header>
    <ion-navbar>
      <ion-buttons slot="start">
        <ion-button menuToggle>
          <ion-icon slot="icon-only" name="menu"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Speakers</ion-title>
    </ion-navbar>
  </ion-header>,

  <ion-content class="outer-content speaker-list">
    <ion-list>
      <ion-grid fixed>
        <ion-row align-items-stretch>
          <ion-col col-12 col-md-6 align-self-stretch align-self-center approxItemHeight="457px">
            <SessionDetail>
              {({ sessions, speakers }) => {
                return speakers.map((speaker) => {
                  const speakerSessions = sessions.filter(session => session.speakerIds.includes(speaker.id));
                  return <SpeakerItem key={speaker.id} nav={nav} speaker={speaker} speakerSessions={speakerSessions} />;
                });
              }}
            </SessionDetail>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-list>
  </ion-content>
];
