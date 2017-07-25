import React, { Component } from 'react';

export default class Account extends Component {
  updatePicture(){}
  changeUsername(){}
  changePassword(){}
  support(){}
  logout(){}
  render() {
    const username = "jthoms1";

    return (
      <ion-page>
        <ion-header>
          <ion-navbar>
            <button ion-button menuToggle>
              <ion-icon name="menu"></ion-icon>
            </button>
            <ion-title>Account</ion-title>
          </ion-navbar>
        </ion-header>

        <ion-content class="outer-content">
          <div>
            <img src="http://www.gravatar.com/avatar?d=mm&s=140" alt="avatar"/>
            <h2>{username}</h2>

            <ion-list inset>
              <ion-button ion-item onClick={() => this.updatePicture()}>Update Picture</ion-button>
              <ion-button ion-item onClick={() => this.changeUsername()}>Change Username</ion-button>
              <ion-button ion-item onClick={() => this.changePassword()}>Change Password</ion-button>
              <ion-button ion-item onClick={() => this.support()}>Support</ion-button>
              <ion-button ion-item onClick={() => this.logout()}>Logout</ion-button>
            </ion-list>
          </div>
        </ion-content>
      </ion-page>
    );
  }
}
