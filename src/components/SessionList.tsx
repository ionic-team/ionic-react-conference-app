import React from 'react';
import { Session, SessionGroup } from '../store/sessions/types';
import { format, parse as parseDate } from 'date-fns';
import { IonList, IonListHeader, IonItemGroup, IonItemDivider, IonLabel, IonItemSliding, IonItem, IonItemOptions, IonItemOption } from '@ionic/react';

interface Props {
  sessions: Session[]
  addFavoriteSession: (sessionId: number) => void;
  removeFavoriteSession: (sessionId: number) => void;
  hidden: boolean;
  listType: "all" | "favorites"
}

function groupedByStartTime(sessions: Session[]) {
  return sessions
    .sort((a, b) => (
      parseDate(a.dateTimeStart).valueOf() - parseDate(b.dateTimeStart).valueOf()
    ))
    .reduce((groups, session) => {
      let starterHour = parseDate(session.dateTimeStart);
      starterHour.setMinutes(0);
      starterHour.setSeconds(0);
      const starterHourStr = starterHour.toJSON();
      const foundGroup = groups.find(group => group.startTime === starterHourStr);
      if (foundGroup) {
        foundGroup.sessions.push(session);
      } else {
        groups.push({
          startTime: starterHourStr,
          sessions: [session]
        });
      }
      return groups;
  }, [] as SessionGroup[]);
}

const SessionList: React.SFC<Props> = ({sessions, addFavoriteSession, removeFavoriteSession, hidden, listType }) => {
  if (sessions.length === 0) {
    return (
      <IonList style={hidden ? {display: 'none'} : {}}>
        <IonListHeader>
          No Sessions Found
        </IonListHeader>
      </IonList>
    );
  }

  const groups = groupedByStartTime(sessions);

  return (
    <IonList>
      { groups.map((group, index: number) => (
        <IonItemGroup key={`group-${index}`}>
          <IonItemDivider sticky>
            <IonLabel>
              {format(parseDate(group.startTime), "h:MM a")}
            </IonLabel>
          </IonItemDivider>
          { group.sessions.map((session: Session, sessionIndex: number) => (
            <IonItemSliding key={`group-${index}-${sessionIndex}`} class={'track-' + session.tracks[0].toLowerCase()}>
              <IonItem button onClick={() => console.log('sessions', { id: session.id })}>
                <IonLabel>
                  <h3>{session.name}</h3>
                  <p>
                    {format(session.dateTimeStart, "h:MM a")} &mdash;&nbsp;
                    {format(session.dateTimeEnd, "h:MM a")}:&nbsp;
                    {session.location}
                  </p>
                </IonLabel>
              </IonItem>
              <IonItemOptions>
                { listType === "favorites" ?
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
export default SessionList;
