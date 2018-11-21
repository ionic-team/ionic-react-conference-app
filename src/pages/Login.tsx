import React, { Component } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonRow, IonCol, IonMenuButton } from '../ionic';
import './Form.scss'

export default class Login extends Component {
  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="logo">
            <img src="assets/img/appicon.svg" alt="Ionic logo"/>
          </div>
          <form noValidate>
            <IonList no-lines>
              <IonItem>
                <IonLabel color="primary">Username</IonLabel>
                <IonInput
                  ref={(input) => (this.usernameInput = input)}
                  name="username"
                  type="text"
                  spellcheck="false"
                  autocapitalize="off"
                  required>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel color="primary">Password</IonLabel>
                <IonInput name="password" type="password" required></IonInput>
              </IonItem>
            </IonList>

            <IonRow responsive-sm>
              <IonCol>
                <IonButton onClick={() => logInUser(this.usernameInput.value)} type="submit">
                  Login
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={() => signUpUser(this.usernameInput.value)} color="light">
                  Signup
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonContent>
      </>
    );
  }
}
