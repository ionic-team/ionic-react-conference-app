import React from 'react';
import * as data from '../data.json';
import { withRouter } from 'react-router-dom';



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


withRouter(({children, path, history}) => (
  <ion-button ion-item menuClose onClick={() => { history.push(path); }}>
    {children}
  </ion-button>
));


const SpeakerItem = withRouter(({speaker, history}) => {
  speaker.sessions = [
    {
      name: 'Red Session',
      id: 1
    },
    {
      name: 'Blue Session',
      id: 2
    }
  ];
  return (
    <ion-card class="speaker-card">
      <ion-card-header>
        <ion-button
          ion-item
          detail-none
          onClick={() => history.push(`/speakers/${speaker.id}`)}
        >
          <ion-avatar item-start>
            <img src={speaker.profilePic} alt="Speaker profile pic"/>
          </ion-avatar>
          {speaker.name}
        </ion-button>
      </ion-card-header>

      <ion-card-content class="outer-content">
        <ion-list>
          { speaker.sessions.map(session => (
          <ion-button
            key={session.name}
            ion-item
            onClick={() => history.push(`/speakers/${session.id}`)}
          >
            <h3>{session.name}</h3>
          </ion-button>
          ))}

          <ion-button
            ion-item
            onClick={() => history.push(`/speakers/${speaker.id}`)}
          >
            <h3>About {speaker.name}</h3>
          </ion-button>
        </ion-list>
      </ion-card-content>

      <ion-row no-padding>
        <ion-col col-12 col-lg-auto text-center text-lg-left>
          <ion-button
            clear
            small
            color="primary"
            icon-start
            onClick={() => window.open(`https://www.twitter.com/${speaker.twitter}`, '_blank')}
          >
            <ion-icon name="logo-twitter"></ion-icon>
            Tweet
          </ion-button>
        </ion-col>
        <ion-col col-12 col-lg-auto text-center>
          <ion-button clear small color="primary" icon-start onClick={() => openSpeakerShare(speaker)}>
            <ion-icon name='share-alt'></ion-icon>
            Share
          </ion-button>
        </ion-col>
        <ion-col col-12 col-lg-auto text-center text-lg-right>
          <ion-button clear small color="primary" icon-start onClick={() => openContact(speaker)}>
            <ion-icon name='chatboxes'></ion-icon>
            Contact
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-card>
  );
});

export default () => {
  const speakerList = data.speakers;

  return (
    <ion-page>
      <ion-header>
        <ion-navbar>
          <ion-button menuToggle>
            <ion-icon name="menu"></ion-icon>
          </ion-button>
          <ion-title>Speakers</ion-title>
        </ion-navbar>
      </ion-header>
      <ion-content class="outer-content speaker-list">
        <ion-list>
          <ion-grid fixed>
            <ion-row align-items-stretch>
              <ion-col col-12 col-md-6 align-self-stretch align-self-center approxItemHeight="457px">
                { speakerList.map((speaker) => <SpeakerItem key={speaker.id} speaker={speaker} />) }
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
      </ion-content>
    </ion-page>
  );
}
