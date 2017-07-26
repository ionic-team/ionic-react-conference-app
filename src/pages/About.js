import React, { Component } from 'react';

export default class About extends Component {
  presentPopover() {

  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-navbar>
            <ion-button menuToggle>
              <ion-icon name="menu"></ion-icon>
            </ion-button>
            <ion-title>About</ion-title>
            <ion-buttons end>
              <ion-button icon-only onClick={() => this.presentPopover()}>
                <ion-icon name="more"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-navbar>
        </ion-header>

        <ion-content>
          <div className="about-header">
            <img src="assets/img/ionic-logo-white.svg" alt="ionic logo" />
          </div>
          <div className="about-info">
            <h4>Ionic Conference</h4>

            <ion-list no-lines>
              <ion-item>
                <ion-icon name="calendar" slot="start"></ion-icon>
                <ion-label>Date</ion-label>
                <ion-datetime displayFormat="MMM DD, YYYY" max="2056" data={this.props.conferenceDate}></ion-datetime>
              </ion-item>

              <ion-item>
                <ion-icon name="pin" slot="start"></ion-icon>
                <ion-label>Location</ion-label>
                <ion-select>
                  <ion-option value="madison" selected>Madison, WI</ion-option>
                  <ion-option value="austin">Austin, TX</ion-option>
                  <ion-option value="chicago">Chicago, IL</ion-option>
                  <ion-option value="seattle">Seattle, WA</ion-option>
                </ion-select>
              </ion-item>
            </ion-list>

            <p>
              The Ionic Conference is a one-day conference featuring talks from the
              Ionic team. It is focused on Ionic applications being built with
              Ionic 2. This includes migrating apps from Ionic 1 to Ionic 2,
              Angular concepts, Webpack, Sass, and many other technologies used
              in Ionic 2. Tickets are completely sold out, and we’re expecting
              more than 1000 developers – making this the largest Ionic
              conference ever!
            </p>
          </div>
        </ion-content>
      </ion-page>
    );
  }
}
