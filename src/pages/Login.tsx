import React, { useState } from 'react';
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
} from '@ionic/react';
import { useHistory } from 'react-router';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';

interface LoginProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

const Login: React.FC<LoginProps> = ({
  setIsLoggedIn,
  setUsername: setUsernameAction,
}) => {
  const history = useHistory();
  const [login, setLogin] = useState({ username: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (login.username && login.password) {
      await setIsLoggedIn(true);
      await setUsernameAction(login.username);
      history.push('/tabs/schedule');
    }
  };

  const onSignup = () => {
    history.push('/signup');
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
              errorText={
                submitted && !login.username ? 'Username is required' : ''
              }
              onIonInput={(e) =>
                setLogin({ ...login, username: e.detail.value! })
              }
              required
            />

            <IonInput
              label="Password"
              labelPlacement="stacked"
              fill="solid"
              value={login.password}
              name="password"
              type="password"
              errorText={
                submitted && !login.password ? 'Password is required' : ''
              }
              onIonInput={(e) =>
                setLogin({ ...login, password: e.detail.value! })
              }
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
