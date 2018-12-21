import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import formatTime from '../utils/formatTime';
import { IonIcon, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonTitle } from '@ionic/react';
import './SessionDetail.css';

type Props = ReturnType<typeof mapStateToProps> & {
  nav: any;
  params: any;
}

const SessionDetail = ({ sessions, speakers, nav, params }: Props) => {
  const session = sessions.filter(s => s.id === parseInt(params.id, 10))[0];
  const sessionSpeakers = speakers.filter(s => session.speakerIds.indexOf(s.id) !== -1);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton href="#" onClick={() => nav.pop()} color="primary">
              <IonIcon slot="icon-only" name="arrow-back"></IonIcon>Back
            </IonButton>
          </IonButtons>
          <IonTitle>{session.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent padding>
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
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  sessions: state.sessions.sessions,
  speakers: state.speakers.speakers
});

export default connect(
  mapStateToProps
)(SessionDetail)
