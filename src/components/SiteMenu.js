import React from 'react';
import IonButton from './IonButton';

export default ({appPages, loggedOutPages, loggedInPages, isAuthenticated, history}) => {

  function renderlistItems(list) {
    return list
      .filter(route => !!route.path)
      .map((p) => (
        <IonButton key={p.title} path={p.path}>
          <ion-icon item-start name={p.icon}></ion-icon>
          {p.title}
        </IonButton>
      ));
  }

  return (
    <div>
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="outer-content">
        <ion-list>
          <ion-list-header>
            Navigate
          </ion-list-header>
          { renderlistItems(appPages) }
        </ion-list>
        <ion-list>
          <ion-list-header>
            Account
          </ion-list-header>
          { isAuthenticated ?
            renderlistItems(loggedOutPages) :
            renderlistItems(loggedInPages) }
        </ion-list>
        <ion-list>
          <ion-list-header>
            Tutorial
          </ion-list-header>
          <ion-button ion-item menuClose onClick={() => {}}>
            <ion-icon item-start name="hammer"></ion-icon>
            Show Tutorial
          </ion-button>
        </ion-list>
      </ion-content>
    </div>
  );
}
