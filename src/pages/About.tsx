import './About.css';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { Fragment, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';

import AboutPopover from '../components/AboutPopover';
import { RootState, selectors } from '../store';

type Props = ReturnType<typeof mapStateToProps>;

interface State {
  showPopover: boolean;
  showPopoverEvent: null | MouseEvent;
}

const About: FunctionComponent<Props> = props => {
  const [state, setState] = useState<State>({
    showPopover: false,
    showPopoverEvent: null
  });

  const presentPopover = (e: MouseEvent) => {
    setState({
      showPopover: true,
      showPopoverEvent: e
    });
  };

  const dismissPopover = () => {
    setState({
      showPopover: false,
      showPopoverEvent: null
    });
  };

  return (
    <Fragment>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
          <IonButtons slot="end">
            <IonButton icon-only onClick={presentPopover}>
              <IonIcon slot="icon-only" name="more" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonPopover
        show={state.showPopover}
        event={state.showPopoverEvent}
        onIonPopoverDidDismiss={dismissPopover}
      >
        <AboutPopover dismissPopover={dismissPopover} />
      </IonPopover>

      <IonContent>
        <div className="about-header">
          <img src="assets/img/ionic-logo-white.svg" alt="ionic logo" />
        </div>
        <div className="ion-padding about-info">
          <h4>Ionic Conference</h4>

          <IonList lines="none">
            <IonItem>
              <IonIcon name="calendar" slot="start" />
              <IonLabel>Date</IonLabel>
              <IonDatetime displayFormat="MMM DD, YYYY" max="2056" value={props.conferenceDate} />
            </IonItem>

            <IonItem>
              <IonIcon name="pin" slot="start" />
              <IonLabel>Location</IonLabel>
              <IonSelect>
                <IonSelectOption value="madison" selected>
                  Madison, WI
                </IonSelectOption>
                <IonSelectOption value="austin">Austin, TX</IonSelectOption>
                <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
                <IonSelectOption value="seattle">Seattle, WA</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <p>
            The Ionic Conference is a one-day conference featuring talks from the Ionic team. It is
            focused on Ionic applications being built with Ionic 2. This includes migrating apps
            from Ionic 1 to Ionic 2, Angular concepts, Webpack, Sass, and many other technologies
            used in Ionic 2. Tickets are completely sold out, and we’re expecting more than 1000
            developers – making this the largest Ionic conference ever!
          </p>
        </div>
      </IonContent>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  conferenceDate: selectors.sessions.conferenceStart(state.sessions)
});

export default connect(mapStateToProps)(About);
