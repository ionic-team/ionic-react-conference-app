import React from 'react';
import { IonIcon, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonButton } from '../ionic';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps<any> {
  appPages: any[]
  loggedOutPages: any[],
  loggedInPages: any[],
  isAuthenticated: boolean
}

const SiteMenu: React.SFC<Props> = ({ appPages, loggedOutPages, loggedInPages, isAuthenticated, history }) => {

  function renderlistItems(list: any[]) {
    return list
      .filter(route => !!route.path)
      .map((p) => (
        <IonButton key={p.title} onClick={() => history.push(p.path)}>
          <IonIcon slot="start" name={p.icon}></IonIcon>
          {p.title}
        </IonButton>
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

export default SiteMenu;
