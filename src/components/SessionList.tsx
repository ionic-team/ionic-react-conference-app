import React from 'react';
import { Session, SessionGroup } from '../store/sessions/types';
import { format, parse as parseDate } from 'date-fns';
import SessionListItem from './SessionListItem';
import { IonList, IonListHeader, IonItemGroup, IonItemDivider, IonLabel } from '@ionic/react';

interface Props {
  sessions: Session[]
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

const SessionList: React.SFC<Props> = ({sessions, hidden, listType }) => {
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
            <SessionListItem
              key={`group-${index}-${sessionIndex}`}
              session={session}
              listType={listType}
            />
          ))}
        </IonItemGroup>
      )) }
    </IonList>
  );
};

export default SessionList;
