import React from 'react';
import { dateFormat } from '../utils/dateformat';
import IonButton from './IonButton';

function formatTime(dateString, formatString) {
  return dateFormat(new Date(dateString), formatString);
}

function groupByStartTime(sessions) {
  return sessions
    .sort((a, b) => (
      new Date(b.dateTimeStart) - new Date(a.dateTimeStart)
    ))
    .reduce((groups, session) => {
      let starterHour = new Date(session.dateTimeStart);
      starterHour.setMinutes(0);
      starterHour.setSeconds(0);
      starterHour = starterHour.toJSON();

      const foundGroup = groups.find(group => group.startTime === starterHour);
      if (foundGroup) {
        foundGroup.sessions.push(session);
      } else {
        groups.push({
          startTime: starterHour,
          sessions: [session]
        });
      }
      return groups;
  }, []);
}

export default ({sessions, addFavoriteSession, removeFavoriteSession, filterFavorites}) => {
  const groups = groupByStartTime(sessions);

  return (
    <ion-list>
      { groups.map((group, index) => (
        <ion-item-group key={`group-${index}`}>
          <ion-item-divider sticky>
            <ion-label>
              {formatTime(group.startTime, "h:MM tt")}
            </ion-label>
          </ion-item-divider>
          { group.sessions.map((session, sessionIndex) => (
            <ion-item-sliding key={`group-${index}-${sessionIndex}`}>
              <IonButton ion-item path={`/sessions/${session.id}`}>
                <h3>{session.name}</h3>
                <p>
                  {formatTime(session.dateTimeStart, "h:MM tt")} &mdash;
                  {formatTime(session.dateTimeEnd, "h: MM tt")}:
                  {session.location}
                </p>
              </IonButton>
              <ion-item-options>
                { filterFavorites ?
                  <ion-button color="danger" onClick={() => removeFavoriteSession(session.id)}>
                    Remove
                  </ion-button>
                  :
                  <ion-button color="favorite" onClick={() => addFavoriteSession(session.id)}>
                    Favorite
                  </ion-button>
                }
              </ion-item-options>
            </ion-item-sliding>
          )) }
        </ion-item-group>
      )) }
    </ion-list>
  );
};
