import React from 'react';
import { dateFormat } from '../utils/dateformat';
import { withRouter } from 'react-router-dom';

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

export default withRouter(({sessions, addFavoriteSession, removeFavoriteSession, filterFavorites, hidden, history}) => {

  if (sessions.length === 0) {
    return (
      <ion-list style={hidden ? {display: 'none'} : {}}>
        <ion-list-header>
          No Sessions Found
        </ion-list-header>
      </ion-list>
    );
  }

  const groups = groupByStartTime(sessions);

  return (
    <ion-list style={hidden ? {display: 'none'} : {}}>
      { groups.map((group, index) => (
        <ion-item-group key={`group-${index}`}>
          <ion-item-divider sticky>
            <ion-label>
              {formatTime(group.startTime, "h:MM tt")}
            </ion-label>
          </ion-item-divider>
          { group.sessions.map((session, sessionIndex) => (
            <ion-item-sliding key={`group-${index}-${sessionIndex}`} track={session.tracks[0].toLowerCase()}>
              <ion-item href={`/sessions/${session.id}`} onClick={() => history.push(`/sessions/${session.id}`)}>
                <ion-label>
                  <h3>{session.name}</h3>
                  <p>
                    {formatTime(session.dateTimeStart, "h:MM tt")} &mdash;&nbsp;
                    {formatTime(session.dateTimeEnd, "h:MM tt")}:&nbsp;
                    {session.location}
                  </p>
                </ion-label>
              </ion-item>
              <ion-item-options>
                { filterFavorites !== 'all' ?
                  <ion-item-option color="danger" onClick={() => removeFavoriteSession(session.id)}>
                    Remove
                  </ion-item-option>
                  :
                  <ion-item-option color="favorite" onClick={() => addFavoriteSession(session.id)}>
                    Favorite
                  </ion-item-option>
                }
              </ion-item-options>
            </ion-item-sliding>
          )) }
        </ion-item-group>
      )) }
    </ion-list>
  );
});
