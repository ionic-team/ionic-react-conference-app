import React, { Component } from 'react';
import UserAccount from '../containers/UserAccount';
import './Login.scss'

export default class Login extends Component {
  render() {
    return (
      <ion-page class="page-user">
        <ion-header>
          <ion-navbar>
            <ion-buttons slot="start">
              <ion-button ion-button menuToggle>
                <ion-icon name="menu"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title>Login</ion-title>
          </ion-navbar>
        </ion-header>

        <ion-content>
          <div className="logo">
            <img src="assets/img/appicon.svg" alt="Ionic logo"/>
          </div>

          <UserAccount>
            {({logInUser, signUpUser}) => (
            <form noValidate>
              <ion-list no-lines>
                <ion-item>
                  <ion-label stacked color="primary">Username</ion-label>
                  <ion-input
                    ref={(input) => (this.usernameInput = input)}
                    name="username"
                    type="text"
                    spellcheck="false"
                    autocapitalize="off"
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
                  <ion-button onClick={() => logInUser(this.usernameInput.value)} type="submit" block>
                    Login
                  </ion-button>
                </ion-col>
                <ion-col>
                  <ion-button onClick={() => signUpUser(this.usernameInput.value)} color="light" block>
                    Signup
                  </ion-button>
                </ion-col>
              </ion-row>
            </form>
            )}
          </UserAccount>

        </ion-content>
      </ion-page>
    );
  }
}
