import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { FunctionComponent, useRef, useState } from 'react';

interface State {
  username: string | null;
  password: string | null;
}

const Signup: FunctionComponent = () => {
  const signupFormRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState({
    username: null,
    password: null
  });

  const onSignup = () => {};

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      ,
      <IonContent class="page-user">
        <div className="logo">
          <img src="/assets/img/appicon.svg" alt="Ionic Logo" />
        </div>
        <form ref={signupFormRef}>
          <IonList no-lines>
            <IonItem>
              <IonLabel color="primary">Username</IonLabel>
              <IonInput value={state.username} name="username" type="text" required />
            </IonItem>
            <IonItem>
              <IonLabel color="primary">Password</IonLabel>
              <IonInput value={state.password} name="password" type="password" required />
            </IonItem>
          </IonList>
          <div>
            <IonButton onClick={() => onSignup()} type="submit">
              Create
            </IonButton>
          </div>
        </form>
      </IonContent>
    </>
  );
};

export default Signup;
