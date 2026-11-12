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
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

import './Support.scss';
import { useLeaveGuard } from '../data/LeaveGuardContext';
import { validationClasses } from '../util/validation';

const Support: React.FC = () => {
  const [present, dismiss] = useIonToast();
  const [supportMessage, setSupportMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [presentAlert] = useIonAlert();
  const { registerConfirmLeave } = useLeaveGuard();
  const hasUnsentMessage = supportMessage.trim() !== '';

  useIonViewWillEnter(() => {
    setIsShowing(true);
    present({
      message: 'This does not actually send a support request.',
      duration: 3000,
    });
  });

  useIonViewWillLeave(() => {
    setIsShowing(false);
  });

  // Ask before leaving while this page is showing a message that has not been submitted.
  useEffect(() => {
    if (!isShowing || !hasUnsentMessage) {
      return;
    }
    return registerConfirmLeave((leave) => {
      presentAlert({
        header: 'Leave this page?',
        message: 'Are you sure you want to leave this page? Your support message will not be submitted.',
        buttons: [
          { text: 'Stay', role: 'cancel' },
          { text: 'Leave', handler: leave },
        ],
      });
    });
  }, [isShowing, hasUnsentMessage, presentAlert, registerConfirmLeave]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (supportMessage) {
      setSupportMessage('');
      setSubmitted(false);
      setTouched(false);

      // The hook only shows one toast at a time and ignores new ones while one is open, such as the notice
      // shown when the page opens, so close that first.
      await dismiss();
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
              className={validationClasses(!!supportMessage, submitted || touched)}
              errorText="Support message is required"
              onIonBlur={() => setTouched(true)}
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
