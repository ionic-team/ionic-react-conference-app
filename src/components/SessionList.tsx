import {
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonAlert,
  AlertButton,
} from '@ionic/react';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Schedule, Session } from '../models/Schedule';
import SessionListItem from './SessionListItem';
import { connect } from '../data/connect';
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions';

interface OwnProps {
  schedule: Schedule;
  listType: 'all' | 'favorites';
  hide: boolean;
}

interface StateProps {
  favoriteSessions: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface SessionListProps extends OwnProps, StateProps, DispatchProps {}

const SessionList: React.FC<SessionListProps> = ({
  addFavorite,
  removeFavorite,
  favoriteSessions,
  hide,
  schedule,
  listType,
}) => {
  const scheduleListRef = useRef<HTMLIonListElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>(
    []
  );

  const handleShowAlert = useCallback(
    (header: string, message: string, buttons: AlertButton[]) => {
      setAlertHeader(header);
      setAlertMessage(message);
      setAlertButtons(buttons);
      setShowAlert(true);
    },
    []
  );

  useEffect(() => {
    if (scheduleListRef.current) {
      scheduleListRef.current.closeSlidingItems();
    }
  }, [hide]);

  if (schedule.groups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>No Sessions Found</IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList ref={scheduleListRef} style={hide ? { display: 'none' } : {}}>
        {schedule.groups.map((group, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>{group.time}</IonLabel>
            </IonItemDivider>
            {group.sessions.map((session: Session, sessionIndex: number) => (
              <SessionListItem
                onShowAlert={handleShowAlert}
                isFavorite={favoriteSessions.indexOf(session.id) > -1}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                key={`group-${index}-${sessionIndex}`}
                session={session}
                listType={listType}
              />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        message={alertMessage}
        buttons={alertButtons}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    favoriteSessions: state.data.favorites,
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite,
  },
  component: SessionList,
});
