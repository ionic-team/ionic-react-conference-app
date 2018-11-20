import React, { Component } from 'react';
import { IonHeader, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonToolbar } from '../ionic';
import UserAccount from '../containers/UserAccount';
import './Account.scss';

export default class Account extends Component {
  updatePicture(){}
  changeUsername(){}
  changePassword(){}
  support(){}
  render() {
    return [
      <IonHeader key={1}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>,

      <IonContent key={2} class="outer-content page-account">
        <UserAccount>
          {({user, logOutUser}) => (
          <div>
            <img src="http://www.gravatar.com/avatar?d=mm&s=140" alt="avatar"/>
            <h2>{user.userName}</h2>

            <IonList inset>
              <IonItem href="#" onClick={() => this.updatePicture()}>Update Picture</IonItem>
              <IonItem href="#" onClick={() => this.changeUsername()}>Change Username</IonItem>
              <IonItem href="#" onClick={() => this.changePassword()}>Change Password</IonItem>
              <IonItem href="#" onClick={() => this.support()}>Support</IonItem>
              <IonItem href="#" onClick={() => logOutUser(logOutUser)}>Logout</IonItem>
            </IonList>
          </div>
          )}
        </UserAccount>
      </IonContent>
    ];
  }
}
