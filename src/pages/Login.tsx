import React, { Component } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonRow, IonCol, IonMenuButton } from '../ionic';
import './Form.scss';

type State = {
  username: string | null
}

class Login extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: null
    }
  }

  updateUserName(e: CustomEvent) {}
  logInUser() {}
  signUpUser() {}

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
                  onIonChange={this.updateUserName}
                  name="username"
                  type="text"
                  autocapitalize="off"
                  value={this.state.username}
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
                <IonButton onClick={this.logInUser} type="submit">
                  Login
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={this.signUpUser} color="light">
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
