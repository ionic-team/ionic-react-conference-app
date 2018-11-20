import React from 'react';
import { IonList, IonListHeader, IonItemGroup, IonItemDivider, IonLabel, IonItemSliding, IonItem, IonItemOptions, IonItemOption } from '../ionic';


export default ({sessions, addFavoriteSession, removeFavoriteSession, filterFavorites, hidden, nav }) => {

  if (sessions.length === 0) {
    return (
      <IonList style={hidden ? {display: 'none'} : {}}>
        <IonListHeader>
          No Sessions Found
        </IonListHeader>
      </IonList>
    );
  }

  const groups = groupByStartTime(sessions);

  return (
    <IonList style={hidden ? {display: 'none'} : {}}>
      { groups.map((group, index) => (
        <IonItemGroup key={`group-${index}`}>
          <IonItemDivider sticky>
            <IonLabel>
              {formatTime(group.startTime, "h:MM tt")}
            </IonLabel>
          </IonItemDivider>
          { group.sessions.map((session, sessionIndex) => (
            <IonItemSliding key={`group-${index}-${sessionIndex}`} track={session.tracks[0].toLowerCase()}>
              <IonItem href={`/sessions/${session.id}`} onClick={() => nav.push('sessions', { id: session.id })}>
                <IonLabel>
                  <h3>{session.name}</h3>
                  <p>
                    {formatTime(session.dateTimeStart, "h:MM tt")} &mdash;&nbsp;
                    {formatTime(session.dateTimeEnd, "h:MM tt")}:&nbsp;
                    {session.location}
                  </p>
                </IonLabel>
              </IonItem>
              <IonItemOptions>
                { filterFavorites !== 'all' ?
                  <IonItemOption color="danger" onClick={() => removeFavoriteSession(session.id)}>
                    Remove
                  </IonItemOption>
                  :
                  <IonItemOption color="favorite" onClick={() => addFavoriteSession(session.id)}>
                    Favorite
                  </IonItemOption>
                }
              </IonItemOptions>
            </IonItemSliding>
          )) }
        </IonItemGroup>
      )) }
    </IonList>
  );
};
