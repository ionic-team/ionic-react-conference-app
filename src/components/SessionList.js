import React from 'react';
import IonButton from './IonButton';

export default ({sessions, groups, addFavorite, removeFavorite}) => {
  return (
    <ion-list>
      { groups.map((group, index) => (group.hide ? null :
        <ion-item-group key={`group-${index}`}>
          <ion-item-divider sticky>
            <ion-label>
              {group.time}
            </ion-label>
          </ion-item-divider>
          { group.sessions.map((session, sessionIndex) => (session.hide ? null :
            <ion-item-sliding key={`group-${index}-${sessionIndex}`}>
              <IonButton ion-item path={`/sessions/${session.id}`}>
                <h3>{session.name}</h3>
                <p>
                  {session.timeStart} &mdash;
                  {session.timeEnd}:
                  {session.location}
                </p>
              </IonButton>
              <ion-item-options>
                { segment === 'all' ?
                  <ion-button color="favorite" onClick={() => addFavorite(session)}>
                    Favorite
                  </ion-button>
                  : null }
                { segment === 'favorites' ?
                  <ion-button color="danger" onClick={() => removeFavorite(session, 'Remove Favorite')}>
                    Remove
                  </ion-button>
                  : null }
              </ion-item-options>
            </ion-item-sliding>
          )) }
        </ion-item-group>
      )) }
    </ion-list>
  );
};
