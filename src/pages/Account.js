import React, { Component } from 'react';
import UserAccount from '../containers/UserAccount';

export default class Account extends Component {
  updatePicture(){}
  changeUsername(){}
  changePassword(){}
  support(){}
  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-navbar>
            <ion-buttons slot="start">
              <ion-button menuToggle>
                <ion-icon name="menu"></ion-icon>
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
                <ion-item onClick={() => this.updatePicture()}>Update Picture</ion-item>
                <ion-item onClick={() => this.changeUsername()}>Change Username</ion-item>
                <ion-item onClick={() => this.changePassword()}>Change Password</ion-item>
                <ion-item onClick={() => this.support()}>Support</ion-item>
                <ion-item onClick={() => logOutUser(logOutUser)}>Logout</ion-item>
              </ion-list>
            </div>
            )}
          </UserAccount>
        </ion-content>
      </ion-page>
    );
  }
}
