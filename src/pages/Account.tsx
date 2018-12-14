import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, actions } from '../store';
import { User } from '../store/user/types';
import { IonHeader, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonToolbar } from '../ionic';

type Props = {
  user: User,
  logOutUser: () => void
}

class Account extends Component<Props> {
  updatePicture(){}
  changeUsername(){}
  changePassword(){}
  support(){}
  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Account</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent class="outer-content page-account">
          <div>
            <img style={{
              maxWidth: '140px',
              borderRadius: '50%'
            }} src="http://www.gravatar.com/avatar?d=mm&s=140" alt="avatar"/>
            <h2>{this.props.user.userName}</h2>

            <IonList inset>
              <IonItem href="#" onClick={() => this.updatePicture()}>Update Picture</IonItem>
              <IonItem href="#" onClick={() => this.changeUsername()}>Change Username</IonItem>
              <IonItem href="#" onClick={() => this.changePassword()}>Change Password</IonItem>
              <IonItem href="#" onClick={() => this.support()}>Support</IonItem>
              <IonItem href="#" onClick={() => this.props.logOutUser()}>Logout</IonItem>
            </IonList>
          </div>
        </IonContent>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user
});

export default connect(mapStateToProps, {
  logOutUser: () => actions.user.logOut()
})(Account);
