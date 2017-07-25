import React, { Component } from 'react';

export default class Login extends Component {
  onLogin(){}
  onSignup(){}
  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-navbar>
            <ion-button ion-button menuToggle>
              <ion-icon name="menu"></ion-icon>
            </ion-button>
            <ion-title>Login</ion-title>
          </ion-navbar>
        </ion-header>

        <ion-content>
          <div class="logo">
            <img src="assets/img/appicon.svg" alt="Ionic logo"/>
          </div>

          <form novalidate>
            <ion-list no-lines>
              <ion-item>
                <ion-label stacked color="primary">Username</ion-label>
                <ion-input name="username" type="text" spellcheck="false" autocapitalize="off"
                  required>
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-label stacked color="primary">Password</ion-label>
                <ion-input name="password" type="password" required></ion-input>
              </ion-item>
            </ion-list>

            <ion-row responsive-sm>
              <ion-col>
                <ion-button onClick={() => this.onLogin()} type="submit" block>Login</ion-button>
              </ion-col>
              <ion-col>
                <ion-button onClick={() => this.onSignup()} color="light" block>Signup</ion-button>
              </ion-col>
            </ion-row>
          </form>

        </ion-content>
      </ion-page>
    );
  }
}
