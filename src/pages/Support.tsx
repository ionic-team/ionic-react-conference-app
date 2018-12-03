import React, { Component } from 'react';
import { IonMenuButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonList, IonItem, IonLabel, IonTextarea, IonButton } from '../ionic';

export default class Support extends Component {
  submit() {}
  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Support</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="page-user">
          <div className="logo">
            <img src="/assets/img/appicon.svg" alt="Ionic Logo"/>
          </div>
          <form onSubmit={() => this.submit()}>
            <IonList no-lines>
              <IonItem>
                <IonLabel color="primary">Enter your support message below</IonLabel>
                <IonTextarea name="supportQuestion" required></IonTextarea>
              </IonItem>
            </IonList>
            <div>
              <IonButton type="submit">Submit</IonButton>
            </div>
          </form>
        </IonContent>
      </>
    );
  }
}
