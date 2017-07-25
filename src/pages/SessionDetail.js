import React from 'react';
import * as data from '../data.json';

export default ({ match }) => {
  let session;
  data.schedule[0].groups.forEach(group => (
    group.sessions.forEach(s => {
      if (s.id === match.params.sessionId) {
        session = s;
      }
    })
  ));

  return (
    <ion-page>
      <ion-header>
        <ion-navbar>
          <ion-title>{session.name}</ion-title>
        </ion-navbar>
      </ion-header>
      <ion-content padding>
        <div>
          <h1>{session.name}</h1>
          { session.speakerNames ? session.speakerNames.map(speakerName => (
            <h4 key={speakerName}>
              {speakerName}
            </h4>
          )) : null }
          <p>
            {session.timeStart} - {session.timeEnd}
          </p>
          <p>{session.location}</p>
          <p>{session.description}</p>
        </div>
      </ion-content>
    </ion-page>
  );
}
