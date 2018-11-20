import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonTitle } from '../ionic';
import SessionDetail from '../containers/SessionDetail';

export default ({ nav, params }) => {
  return (
    <SessionDetail>
      {({ sessions, speakers }) => {
        const session = sessions.find(s => s.id === parseInt(params.id, 10));
        const sessionSpeakers = speakers.filter(s => session.speakerIds.includes(s.id));
        return [
          <IonHeader key={1}>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton href="#" onClick={() => nav.pop()} color="primary">
                  <IonIcon slot="icon-only" name="arrow-back"></IonIcon>Back
                </IonButton>
              </IonButtons>
              <IonTitle>{session.name}</IonTitle>
            </IonToolbar>
          </IonHeader>,

          <IonContent padding key={2}>
            <div>
              <h1>{session.name}</h1>
              {sessionSpeakers.map(speaker => (
                <h4 key={speaker.name}>
                  {speaker.name}
                </h4>
              ))}
              <p>
                {formatTime(session.dateTimeStart, "h:MM tt")} &mdash;&nbsp;
                {formatTime(session.dateTimeEnd, "h:MM tt")}
              </p>
              <p>{session.location}</p>
              <p>{session.description}</p>
            </div>
          </IonContent>
        ];
      }}
    </SessionDetail>
  );
}
