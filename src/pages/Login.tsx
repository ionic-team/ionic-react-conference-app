import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRow,
  IonCol,
  IonButton,
  IonInput,
  useIonRouter,
} from '@ionic/react';
import React, { useState } from 'react';

import './Login.scss';
import { connect } from '../data/connect';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { validationClasses } from '../util/validation';

interface LoginProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, setUsername: setUsernameAction }) => {
  const router = useIonRouter();
  const [login, setLogin] = useState({ username: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  // An input shows its error once it has been left, or the form has been submitted.
  const [touched, setTouched] = useState({ username: false, password: false });

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (login.username && login.password) {
      await setIsLoggedIn(true);
      await setUsernameAction(login.username);
      router.push('/tabs/schedule');
    }
  };

  const onSignup = () => {
    router.push('/signup');
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="login-logo">
          <img src="/assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <div className="login-form">
          <form onSubmit={onLogin} noValidate>
            <IonInput
              label="Username"
              labelPlacement="stacked"
              fill="solid"
              value={login.username}
              name="username"
              type="text"
              spellCheck={false}
              autocapitalize="off"
              className={validationClasses(!!login.username, submitted || touched.username)}
              errorText="Username is required"
              onIonBlur={() => setTouched((current) => ({ ...current, username: true }))}
              onIonInput={(e) => setLogin((current) => ({ ...current, username: e.detail.value! }))}
              required
            />

            <IonInput
              label="Password"
              labelPlacement="stacked"
              fill="solid"
              value={login.password}
              name="password"
              type="password"
              className={validationClasses(!!login.password, submitted || touched.password)}
              errorText="Password is required"
              onIonBlur={() => setTouched((current) => ({ ...current, password: true }))}
              onIonInput={(e) => setLogin((current) => ({ ...current, password: e.detail.value! }))}
              required
            />

            <IonRow>
              <IonCol>
                <IonButton type="submit" expand="block">
                  Login
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={onSignup} color="light" expand="block">
                  Signup
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, {}, LoginProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername,
  },
  component: Login,
});
