import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover } from '@ionic/react';
import './About.scss';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import AboutPopover from '../components/AboutPopover';

interface AboutProps { }

const About: React.FC<AboutProps> = () => {

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState();
  const [location, setLocation] = useState<'madison' | 'austin' | 'chicago' | 'seattle'>('madison');
  const [conferenceDate, setConferenceDate] = useState('2047-05-17T00:00:00-05:00');

  const selectOptions = {
    header: 'Select a Location'
  };

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  // momentjs would be a better way to do this https://momentjs.com/
  function displayDate(date: string, format: string) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const d = new Date(date);
    const year = d.getFullYear();

    if (format === 'y') {
      return year;
    } else {
      const month = monthNames[d.getMonth()];
      const day = d.getDate();

      return month + ' ' + day + ', ' + year;
    }
  }

  return (
    <IonPage id="about-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={presentPopover}>
                <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="about-header">
          {/* Instead of loading an image each time the select changes, use opacity to transition them */}
          <div className="about-image madison" style={{'opacity': location === 'madison' ? '1' : undefined}}></div>
          <div className="about-image austin" style={{'opacity': location === 'austin' ? '1' : undefined}}></div>
          <div className="about-image chicago" style={{'opacity': location === 'chicago' ? '1' : undefined}}></div>
          <div className="about-image seattle" style={{'opacity': location === 'seattle' ? '1' : undefined}}></div>
        </div>
        <div className="about-info">
          <h3 className="ion-padding-top ion-padding-start">About</h3>

          <p className="ion-padding-start ion-padding-end">
            The Ionic Conference is a one-day conference on { displayDate(conferenceDate, 'mediumDate') } featuring talks from the Ionic team. It is focused on Ionic applications being built with Ionic Framework. This includes migrating apps to the latest version of the framework, Angular concepts, Webpack, Sass, and many other technologies used in Ionic 2. Tickets are completely sold out, and we’re expecting more than 1000 developers – making this the largest Ionic conference ever!
          </p>

          <h3 className="ion-padding-top ion-padding-start">Details</h3>

          <IonList lines="none">
            <IonItem>
              <IonLabel>
                Location
              </IonLabel>
              <IonSelect value={location} interfaceOptions={selectOptions} onIonChange={(e) => setLocation(e.detail.value as any)}>
                <IonSelectOption value="madison">Madison, WI</IonSelectOption>
                <IonSelectOption value="austin">Austin, TX</IonSelectOption>
                <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
                <IonSelectOption value="seattle">Seattle, WA</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>
                Date
              </IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                max="2056"
                value={conferenceDate}
                onIonChange={(e) => setConferenceDate(e.detail.value as any)}>
              </IonDatetime>
            </IonItem>
          </IonList>

          <h3 className="ion-padding-top ion-padding-start">Internet</h3>

          <IonList lines="none">
            <IonItem>
              <IonLabel>
                Wifi network
              </IonLabel>
              <IonLabel className="ion-text-end">
                ica{ displayDate(conferenceDate, 'y') }
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
               Password
              </IonLabel>
              <IonLabel className="ion-text-end">
                makegoodthings
              </IonLabel>
            </IonItem>
          </IonList>

        </div>
      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <AboutPopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default React.memo(About);