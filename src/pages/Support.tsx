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
  IonList,
  IonItem,
  IonText,
  IonTextarea,
  IonToast,
} from '@ionic/react';
import './Login.scss';
import { connect } from '../data/connect';

interface OwnProps {}

interface DispatchProps {}

interface SupportProps extends OwnProps, DispatchProps {}

const Support: React.FC<SupportProps> = () => {
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!message) {
      setMessageError(true);
    }
    if (message) {
      setMessage('');
      setShowToast(true);
    }
  };

  return (
    <IonPage id="support-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Support</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={send}>
          <IonList>
            <IonItem>
              <IonTextarea
                label="Enter your support message below"
                labelPlacement="stacked"
                color="primary"
                name="message"
                value={message}
                spellCheck={false}
                autocapitalize="off"
                rows={6}
                onIonInput={(e) => setMessage(e.detail.value!)}
                required
              >
                {formSubmitted && messageError && (
                  <IonText color="danger" slot="error">
                    <p>Support message is required</p>
                  </IonText>
                )}
              </IonTextarea>
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                Submit
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>

      <IonToast
        isOpen={showToast}
        duration={3000}
        message="Your support request has been sent"
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  component: Support,
});
