import React from 'react';
import SessionDetail from '../containers/SessionDetail';
import './SpeakerList.scss';


export default ({ match, history }) => (
  <SessionDetail>
    {({ speakers }) => {
      const speaker = speakers.find(s => s.id === parseInt(match.params.speakerId, 10));
      return (
        <ion-page class="speaker-page-list">
          <ion-header>
            <ion-navbar>
              <ion-buttons slot="start">
                <ion-button href="#" onClick={() => history.goBack()} color="primary">
                  <ion-icon slot="icon-only" name="arrow-back"></ion-icon>Back
                </ion-button>
              </ion-buttons>
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
    }}
  </SessionDetail>
);
