import React from 'react';
import * as data from '../data.json';

export default ({ match }) => {
  const speaker = data.speakers.find(speaker => speaker.id === match.params.speakerId);

  return (
    <ion-page>
      <ion-header>
        <ion-navbar>
          <ion-title>{speaker.name}</ion-title>
        </ion-navbar>
      </ion-header>

      <ion-content padding class="speaker-detail">
        <div>
          <img src={speaker.profilePic} alt={speaker.name}/>
          <br/>
          <ion-button icon-only clear small color="twitter">
            <ion-icon name="logo-twitter"></ion-icon>
          </ion-button>
          <ion-button icon-only clear small color="github">
            <ion-icon name="logo-github"></ion-icon>
          </ion-button>
          <ion-button icon-only clear small color="instagram">
            <ion-icon name="logo-instagram"></ion-icon>
          </ion-button>
        </div>

        <p>{speaker.about}</p>
      </ion-content>
    </ion-page>
  );
}
