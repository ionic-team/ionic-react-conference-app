import React, { useRef, useState } from 'react';
import { IonItemSliding, IonAlert, IonItem, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { connect } from '../data/connect';
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions';
import { Time } from './Time';
import { Session } from '../models/Session';

interface OwnProps {
  session: Session;
  listType: "all" | "favorites";
}

interface StateProps {
  favoriteSessions: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type Props = OwnProps & StateProps & DispatchProps

const SessionListItemInner: React.FC<Props> = ({ addFavorite, removeFavorite, favoriteSessions, session, listType }) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);
  const isFavorite = favoriteSessions.indexOf(session.id) > -1;

  const dismissAlert = () => {
    setShowAlert(false);
    setAlertHeader('');
    setAlertButtons([]);
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const removeFavoriteSession = () => {
    addFavorite(session.id);

    // create an alert instance
    setShowAlert(true);
    setAlertHeader('Favorite already added');
    setAlertButtons([
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => removeFavorite(session.id)
      }
    ]);
  }

  const addFavoriteSession = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteSession();
    } else {
      // remember this session as a user favorite
      addFavorite(session.id);

      // create an alert instance
      setShowAlert(true);
      setAlertHeader('Favorite Added');
      setAlertButtons([
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };

  return (
    <IonItemSliding ref={ionItemSlidingRef} class={'track-' + session.tracks[0].toLowerCase()}>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        onDidDismiss={dismissAlert}
      ></IonAlert>
      <IonItem routerLink={`/tabs/schedule/${session.id}`}>
        <IonLabel>
          <h3>{session.name}</h3>
          <p>
            <Time date={session.dateTimeStart} /> &mdash;&nbsp;
            <Time date={session.dateTimeEnd} /> &mdash;&nbsp;
            {session.location}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        {listType === "favorites" ?
          <IonItemOption color="danger" onClick={() => removeFavoriteSession()}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favorite" onClick={addFavoriteSession}>
            Favorite
          </IonItemOption>
        }
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => {
    return {
      favoriteSessions: state.data.favorites
    }
  },
  mapDispatchToProps: {
    addFavorite,
    removeFavorite
  },
  component: SessionListItemInner
});
