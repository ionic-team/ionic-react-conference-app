import React from 'react';
import IonButtonWithRouter from './IonButton';
import { IonIcon, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem } from '../ionic';

export default ({appPages, loggedOutPages, loggedInPages, isAuthenticated, history}) => {

  function renderlistItems(list) {
    return list
      .filter(route => !!route.path)
      .map((p) => (
        <IonButtonWithRouter key={p.title} path={p.path}>
          <IonIcon slot="start" name={p.icon}></IonIcon>
          {p.title}
        </IonButtonWithRouter>
      ));
  }

  return (
    <IonMenu>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>,
      <IonContent class="outer-content">
        <IonList>
          <IonListHeader>
            Navigate
          </IonListHeader>
          { renderlistItems(appPages) }
        </IonList>
        <IonList>
          <IonListHeader>
            Account
          </IonListHeader>
          { isAuthenticated ?
            renderlistItems(loggedOutPages) :
            renderlistItems(loggedInPages) }
        </IonList>
        <IonList>
          <IonListHeader>
            Tutorial
          </IonListHeader>
          <IonItem onClick={() => {}}>
            <IonIcon slot="start" name="hammer"></IonIcon>
            Show Tutorial
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
