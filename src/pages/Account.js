import React, { Component } from 'react';
import UserAccount from '../containers/UserAccount';
import './Account.scss';

export default class Account extends Component {
  updatePicture(){}
  changeUsername(){}
  changePassword(){}
  support(){}
  render() {
    return (
      <ion-page class="page-account">
        <ion-header>
          <ion-navbar>
            <ion-buttons slot="start">
              <ion-button menuToggle>
                <ion-icon slot="icon-only" name="menu"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title>Account</ion-title>
          </ion-navbar>
        </ion-header>

        <ion-content class="outer-content">
          <UserAccount>
            {({user, logOutUser}) => (
            <div>
              <img src="http://www.gravatar.com/avatar?d=mm&s=140" alt="avatar"/>
              <h2>{user.userName}</h2>

              <ion-list inset>
                <ion-item href="#" onClick={() => this.updatePicture()}>Update Picture</ion-item>
                <ion-item href="#" onClick={() => this.changeUsername()}>Change Username</ion-item>
                <ion-item href="#" onClick={() => this.changePassword()}>Change Password</ion-item>
                <ion-item href="#" onClick={() => this.support()}>Support</ion-item>
                <ion-item href="#" onClick={() => logOutUser(logOutUser)}>Logout</ion-item>
              </ion-list>
            </div>
            )}
          </UserAccount>
        </ion-content>
      </ion-page>
    );
  }
}
