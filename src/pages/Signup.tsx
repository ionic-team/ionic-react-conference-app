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

import './Signup.scss';
import { connect } from '../data/connect';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { validationClasses } from '../util/validation';

interface SignupProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

const Signup: React.FC<SignupProps> = ({ setIsLoggedIn, setUsername: setUsernameAction }) => {
  const router = useIonRouter();
  const [signup, setSignup] = useState({ username: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  // An input shows its error once it has been left, or the form has been submitted.
  const [touched, setTouched] = useState({ username: false, password: false });

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (signup.username && signup.password) {
      await setIsLoggedIn(true);
      await setUsernameAction(signup.username);
      router.push('/tabs/schedule');
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
              className={validationClasses(!!signup.username, submitted || touched.username)}
              errorText="Username is required"
              onIonBlur={() => setTouched((current) => ({ ...current, username: true }))}
              onIonInput={(e) => setSignup({ ...signup, username: e.detail.value! })}
              required
            />

            <IonInput
              label="Password"
              labelPlacement="stacked"
              fill="solid"
              value={signup.password}
              name="password"
              type="password"
              className={validationClasses(!!signup.password, submitted || touched.password)}
              errorText="Password is required"
              onIonBlur={() => setTouched((current) => ({ ...current, password: true }))}
              onIonInput={(e) => setSignup({ ...signup, password: e.detail.value! })}
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
