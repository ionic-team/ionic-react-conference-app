import React from 'react';
import { Session, SessionGroup } from '../store/sessions/types';
import { addFavorite, removeFavorite} from '../store/sessions/actions';
import formatTime from '../utils/formatTime';
import { parse as parseDate } from 'date-fns';
import { IonList, IonListHeader, IonItemGroup, IonItemDivider, IonLabel, IonItemSliding, IonItem, IonItemOptions, IonItemOption } from '../ionic';

interface Props {
  sessions: Session[]
  addFavoriteSession: typeof addFavorite;
  removeFavoriteSession: typeof removeFavorite;
  filterFavorites: 'all' | '';
  hidden: boolean;
  nav: any;
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

const SessionList: React.SFC<Props> = ({sessions, addFavoriteSession, removeFavoriteSession, filterFavorites, hidden, nav }) => {
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
    <IonList style={hidden ? {display: 'none'} : {}}>
      { groups.map((group, index: number) => (
        <IonItemGroup key={`group-${index}`}>
          <IonItemDivider>
            <IonLabel>
              {formatTime(group.startTime, "h:MM tt")}
            </IonLabel>
          </IonItemDivider>
          { group.sessions.map((session: Session, sessionIndex: number) => (
            <IonItemSliding key={`group-${index}-${sessionIndex}`}>
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
export default SessionList;
