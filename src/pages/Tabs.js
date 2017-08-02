import React, { Component } from 'react';
import './Form.scss'


/*
      <ion-tabs>
        <ion-tab></ion-tab>
        <ion-tab></ion-tab>
        <ion-tab></ion-tab>
        <ion-tab></ion-tab>
      <ion-tabs>
*/

export default class Tabs extends Component {
  render() {
    return (
      <ion-tabs>
        <ion-tab>
          <tab-item>Schedule</tab-item>
          <tab-content>

          </tab-content>
        </ion-tab>
        <ion-tab>
          <tab-item>Speakers</tab-item>
          <tab-content>
          </tab-content>
        </ion-tab>
        <ion-tab>
          <tab-item>Map</tab-item>
          <tab-content>

          </tab-content>
        </ion-tab>
        <ion-tab>
          <tab-item>About</tab-item>
          <tab-content>

          </tab-content>
        </ion-tab>
      </ion-tabs>
    );
  }
}
