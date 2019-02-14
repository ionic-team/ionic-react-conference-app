import './Login.css';

import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { FunctionComponent, useState } from 'react';

const Login: FunctionComponent = () => {
  const [username, setUsername] = useState('');

  const updateUserName = (e: any) => {
    setUsername(e.target.value);
  };
  const logInUser = () => {};
  const signUpUser = () => {};

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>
        <form noValidate>
          <IonList no-lines>
            <IonItem>
              <IonLabel color="primary">Username</IonLabel>
              <IonInput
                onIonChange={updateUserName}
                name="username"
                type="text"
                autocapitalize="off"
                value={username}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel color="primary">Password</IonLabel>
              <IonInput name="password" type="password" required />
            </IonItem>
          </IonList>

          <IonRow responsive-sm>
            <IonCol>
              <IonButton onClick={logInUser} type="submit">
                Login
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={signUpUser} color="light">
                Signup
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </>
  );
};
export default Login;
