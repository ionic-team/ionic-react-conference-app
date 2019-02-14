import './Tutorial.css';

import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonSlide, IonSlides, IonToolbar } from '@ionic/react';
import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { actions } from '../store';

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps;

const Tutorial: FunctionComponent<Props> = props => {
  const [showSkip, setShowSkip] = useState(false);

  const onSlideChangeStart = () => {
    setShowSkip(!showSkip);
  };

  const endTutorial = () => {
    props.sawTutorial();
  };

  return (
    <div className="ion-page tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          {showSkip ? (
            <IonButtons slot="end">
              <IonButton onClick={endTutorial} color="primary">
                Skip
              </IonButton>
            </IonButtons>
          ) : null}
        </IonToolbar>
      </IonHeader>
      <IonContent no-bounce>
        <IonSlides onIonSlideWillChange={onSlideChangeStart} pager={false}>
          <IonSlide>
            <img alt="welcome" src="/assets/img/ica-slidebox-img-1.png" className="slide-image" />
            <h2 className="slide-title">
              Welcome to <b>ICA</b>
            </h2>
            <p>
              The <b>ionic conference app</b> is a practical preview of the ionic framework in
              action, and a demonstration of proper code use.
            </p>
          </IonSlide>

          <IonSlide>
            <img alt="what" src="/assets/img/ica-slidebox-img-2.png" className="slide-image" />
            <h2 className="slide-title">What is Ionic?</h2>
            <p>
              <b>Ionic Framework</b> is an open source SDK that enables developers to build high
              quality mobile apps with web technologies like HTML, CSS, and JavaScript.
            </p>
          </IonSlide>

          <IonSlide>
            <img alt="what" src="/assets/img/ica-slidebox-img-3.png" className="slide-image" />
            <h2 className="slide-title">What is Ionic Platform?</h2>
            <p>
              The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with
              integrated services like push notifications, native builds, user auth, and live
              updating.
            </p>
          </IonSlide>

          <IonSlide>
            <img alt="ready" src="/assets/img/ica-slidebox-img-4.png" className="slide-image" />
            <h2 className="slide-title">Ready to Play?</h2>
            <IonButton fill="clear" onClick={endTutorial}>
              Continue
              <IonIcon slot="end" name="arrow-forward" />
            </IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </div>
  );
};

const mapDispatchToProps = {
  sawTutorial: () => actions.user.sawTutorial()
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Tutorial)
);
