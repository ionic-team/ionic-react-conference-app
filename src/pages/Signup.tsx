import React, { Component } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '../ionic';
import './Form.scss'

export default class Signup extends Component {
  render() {
    return [
      <IonHeader key={1}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>,

      <IonContent class="page-user" key={2}>
        <div className="logo">
          <img src="/assets/img/appicon.svg" alt="Ionic Logo"/>
        </div>
        <form ref={(signUpForm => this.signupForm = signUpForm)} novalidate>
          <IonList no-lines>
            <IonItem>
              <IonLabel stacked color="primary">Username</IonLabel>
              <IonInput value={this.username} name="username" type="text" required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel stacked color="primary">Password</IonLabel>
              <IonInput value={this.password} name="password" type="password" required>
              </IonInput>
            </IonItem>
          </IonList>
          <div>
            <IonButton onClick={() => this.onSignup()} type="submit" block>Create</IonButton>
          </div>
        </form>
      </IonContent>
    ];
  }
}
