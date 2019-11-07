import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader } from '@ionic/react';
import React from 'react';
import { Session } from '../models/Session';
import SessionListItem from './SessionListItem';
import { SessionGroup } from '../models/SessionGroup';
import { Time } from '../components/Time';

interface SessionListProps {
  sessionGroups: SessionGroup[]
  listType: 'all' | 'favorites'
  hide: boolean;
}

export const SessionList: React.FC<SessionListProps> = ({ hide, sessionGroups, listType }) => {

  if (sessionGroups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Sessions Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <IonList style={hide ? { display: 'none' } : {}}>
      {sessionGroups.map((group, index: number) => (
        <IonItemGroup key={`group-${index}`}>
          <IonItemDivider sticky>
            <IonLabel>
              <Time date={group.startTime} />
            </IonLabel>
          </IonItemDivider>
          {group.sessions.map((session: Session, sessionIndex: number) => (
            <SessionListItem
              key={`group-${index}-${sessionIndex}`}
              session={session}
              listType={listType}
            />
          ))}
        </IonItemGroup>
      ))}
    </IonList>
  );
};
