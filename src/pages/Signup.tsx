import React, { Component } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '../ionic';

type State = {
  username: string | null,
  password: string | null
}

export default class Signup extends Component<{},State> {
  signupFormRef: React.Ref<HTMLFormElement>

  constructor(props: {}) {
    super(props);
    this.state = {
      username: null,
      password: null
    }
    this.signupFormRef = React.createRef();
  }

  onSignup() {}
  render() {
    return (
      <>
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
          <form ref={this.signupFormRef}>
            <IonList no-lines>
              <IonItem>
                <IonLabel color="primary">Username</IonLabel>
                <IonInput value={this.state.username} name="username" type="text" required>
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel color="primary">Password</IonLabel>
                <IonInput value={this.state.password} name="password" type="password" required>
                </IonInput>
              </IonItem>
            </IonList>
            <div>
              <IonButton onClick={() => this.onSignup()} type="submit">Create</IonButton>
            </div>
          </form>
        </IonContent>
      </>
    );
  }
}
