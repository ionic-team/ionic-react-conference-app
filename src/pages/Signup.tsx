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
import './Signup.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';

interface SignupProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

const Signup: React.FC<SignupProps> = ({
  setIsLoggedIn,
  setUsername: setUsernameAction,
}) => {
  const history = useHistory();
  const [signup, setSignup] = useState({ username: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (signup.username && signup.password) {
      await setIsLoggedIn(true);
      await setUsernameAction(signup.username);
      history.push('/tabs/schedule');
    }
  };

  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="signup-logo">
          <img src="/assets/img/appicon.svg" alt="Ionic Logo" />
        </div>

        <div className="signup-form">
          <form onSubmit={onSignup} noValidate>
            <IonInput
              label="Username"
              labelPlacement="stacked"
              fill="solid"
              value={signup.username}
              name="username"
              type="text"
              errorText={
                submitted && !signup.username ? 'Username is required' : ''
              }
              onIonInput={(e) =>
                setSignup({ ...signup, username: e.detail.value! })
              }
              required
            />

            <IonInput
              label="Password"
              labelPlacement="stacked"
              fill="solid"
              value={signup.password}
              name="password"
              type="password"
              errorText={
                submitted && !signup.password ? 'Password is required' : ''
              }
              onIonInput={(e) =>
                setSignup({ ...signup, password: e.detail.value! })
              }
              required
            />

            <IonRow>
              <IonCol>
                <IonButton type="submit" expand="block">
                  Create
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, {}, SignupProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername,
  },
  component: Signup,
});
