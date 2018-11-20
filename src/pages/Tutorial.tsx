import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Tutorial.scss'

class Tutorial extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      showSkip: false
    }
  }

  onSlideChangeStart(slider) {
    debugger;
    this.setState((state, props) => (
      {
        ...state,
        showSkip: !slider.isEnd()
      }
    ));
  }

  endTutorial() {
    this.props.updateSeenTutorial(true);
    this.props.history.push('/');
  }

  render() {
    return (
      <ion-page class="page-tutorial">
        <ion-header no-border>
          <ion-navbar>
            { this.state.showSkip ?
              <ion-buttons slot="end">
                <ion-button onClick={() => this.endTutorial()} color="primary">Skip</ion-button>
              </ion-buttons>
            : null}
          </ion-navbar>
        </ion-header>
        <ion-content no-bounce>
          <ion-slides ionSlideWillChange={(e) => this.onSlideChangeStart(e)} pager>

            <ion-slide>
              <img alt="welcome" src="/assets/img/ica-slidebox-img-1.png" className="slide-image"/>
              <h2 className="slide-title">
                Welcome to <b>ICA</b>
              </h2>
              <p>
                The <b>ionic conference app</b> is a practical preview of the ionic framework in
                action, and a demonstration of proper code use.
              </p>
            </ion-slide>

            <ion-slide>
              <img alt="what" src="/assets/img/ica-slidebox-img-2.png" className="slide-image"/>
              <h2 className="slide-title">
                What is Ionic?
              </h2>
              <p>
                <b>Ionic Framework</b> is an open source SDK that enables developers to build
                high quality mobile apps with web technologies like HTML, CSS, and JavaScript.
              </p>
            </ion-slide>

            <ion-slide>
              <img alt="what" src="/assets/img/ica-slidebox-img-3.png" className="slide-image"/>
              <h2 className="slide-title">
                What is Ionic Platform?
              </h2>
              <p>The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic
              apps with integrated services like push notifications, native builds,
              user auth, and live updating.</p>
            </ion-slide>

            <ion-slide>
              <img alt="ready" src="/assets/img/ica-slidebox-img-4.png" className="slide-image"/>
              <h2 className="slide-title">
                Ready to Play?
              </h2>
              <ion-button icon-end large clear onClick={() => this.endTutorial()}>
                Continue
                <ion-icon name="arrow-forward"></ion-icon>
              </ion-button>
            </ion-slide>

          </ion-slides>
        </ion-content>
      </ion-page>
    );
  }
};

export default withRouter(Tutorial);
