import React, { Component } from 'react';
import './Form.scss'

export default class Signup extends Component {
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
            <ion-title>Signup</ion-title>
          </ion-navbar>
        </ion-header>

        <ion-content>
          <div className="logo">
            <img src="/assets/img/appicon.svg" alt="Ionic Logo"/>
          </div>
          <form ref={(signUpForm => this.signupForm = signUpForm)} novalidate>
            <ion-list no-lines>
              <ion-item>
                <ion-label stacked color="primary">Username</ion-label>
                <ion-input value={this.username} name="username" type="text" required>
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-label stacked color="primary">Password</ion-label>
                <ion-input value={this.password} name="password" type="password" required>
                </ion-input>
              </ion-item>
            </ion-list>
            <div>
              <ion-button onClick={() => this.onSignup()} type="submit" block>Create</ion-button>
            </div>
          </form>
        </ion-content>
      </ion-page>
    );
  }
}
