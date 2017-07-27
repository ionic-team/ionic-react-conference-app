import React, { Component } from 'react';
import './Form.scss'

export default class Support extends Component {
  submit() {}
  render() {
    return (
      <ion-page class="page-user">
        <ion-header>
          <ion-navbar>
            <ion-buttons slot="start">
              <ion-button menuToggle>
                <ion-icon slot="icon-only" name="menu"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title>Support</ion-title>
          </ion-navbar>
        </ion-header>

        <ion-content>
          <div className="logo">
            <img src="/assets/img/appicon.svg" alt="Ionic Logo"/>
          </div>
          <form onSubmit={() => this.submit()}>
            <ion-list no-lines>
              <ion-item>
                <ion-label stacked color="primary">Enter your support message below</ion-label>
                <ion-textarea name="supportQuestion" rows="6" required></ion-textarea>
              </ion-item>
            </ion-list>
            <div>
              <ion-button block type="submit">Submit</ion-button>
            </div>
          </form>
        </ion-content>
      </ion-page>
    );
  }
}
