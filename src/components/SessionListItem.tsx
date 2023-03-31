import React, { useRef } from 'react';
import {
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  AlertButton,
  useIonToast,
} from '@ionic/react';
import { Session } from '../models/Schedule';

interface SessionListItemProps {
  session: Session;
  listType: 'all' | 'favorites';
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (
    header: string,
    message: string,
    buttons: AlertButton[]
  ) => void;
  isFavorite: boolean;
}

const SessionListItem: React.FC<SessionListItemProps> = ({
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
  onShowAlert,
  session,
  listType,
}) => {
  const [presentToast] = useIonToast();
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  };

  const removeFavoriteSession = (title: string) => {
    onAddFavorite(session.id);
    onShowAlert(
      title,
      'Would you like to remove this session from your favorites?',
      [
        {
          text: 'Cancel',
          handler: dismissAlert,
        },
        {
          text: 'Remove',
          handler: () => {
            onRemoveFavorite(session.id);
            dismissAlert();
          },
        },
      ]
    );
  };

  const addFavoriteSession = async () => {
    if (isFavorite) {
      // Prompt to remove favorite
      removeFavoriteSession('Favorite already added');
    } else {
      // Add as a favorite
      onAddFavorite(session.id);

      // Close the open item
      ionItemSlidingRef.current && ionItemSlidingRef.current.close();

      // Create a toast
      presentToast({
        message: `${session.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [
          {
            text: 'Close',
            role: 'cancel',
          },
        ],
      });
    }
  };

  return (
    <IonItemSliding
      ref={ionItemSlidingRef}
      class={'track-' + session.tracks[0].toLowerCase()}
    >
      <IonItem routerLink={`/tabs/schedule/${session.id}`}>
        <IonLabel>
          <h3>{session.name}</h3>
          <p>
            {session.timeStart}&mdash;&nbsp;
            {session.timeStart}&mdash;&nbsp;
            {session.location}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        {listType === 'favorites' ? (
          <IonItemOption
            color="danger"
            onClick={() => removeFavoriteSession('Remove Favorite')}
          >
            Remove
          </IonItemOption>
        ) : (
          <IonItemOption color="favorite" onClick={addFavoriteSession}>
            Favorite
          </IonItemOption>
        )}
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default React.memo(SessionListItem);
