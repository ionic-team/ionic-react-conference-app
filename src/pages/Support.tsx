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
  IonTextarea,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import './Support.scss';

const Support: React.FC = () => {
  const [present] = useIonToast();
  const [supportMessage, setSupportMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useIonViewWillEnter(() => {
    present({
      message: 'This does not actually send a support request.',
      duration: 3000,
    });
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (supportMessage) {
      setSupportMessage('');
      setSubmitted(false);

      present({
        message: 'Your support request has been sent.',
        duration: 3000,
      });
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
        <div className="support-logo">
          <img src="/assets/img/appicon.svg" alt="Ionic Logo" />
        </div>

        <div className="support-form">
          <form onSubmit={submit} noValidate>
            <IonTextarea
              label="Enter your support message below"
              labelPlacement="stacked"
              fill="solid"
              value={supportMessage}
              name="supportQuestion"
              rows={6}
              errorText={
                submitted && !supportMessage
                  ? 'Support message is required'
                  : ''
              }
              onIonInput={(e) => setSupportMessage(e.detail.value!)}
              required
            />

            <IonRow>
              <IonCol>
                <IonButton expand="block" type="submit">
                  Submit
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Support;
