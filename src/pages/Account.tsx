import {
  IonAlert,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { Component, Fragment, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { actions, RootState } from '../store';

type Props = RouteComponentProps<{}> &
  typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>;

const Account: FunctionComponent<Props> = props => {
  const [showAlert, setShowAlert] = useState(false);

  const updatePicture = () => {
    console.log('Clicked to update picture');
  };

  const changeUsername = () => {
    setShowAlert(true);
  };

  const changePassword = () => {
    console.log('Clicked to change password');
  };

  const support = () => {
    props.history.push('/support');
  };

  const logout = () => {
    props.logOutUser();
    props.history.push('/login');
  };

  return (
    <Fragment>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonAlert
        show={showAlert}
        header={'Change Username'}
        buttons={[
          'Cancel',
          {
            text: 'Ok',
            handler: ({ username }: { username: string }) => {
              props.setUsername(username);
            }
          }
        ]}
        inputs={[
          {
            type: 'text',
            name: 'username',
            value: props.user.userName,
            placeholder: 'username'
          }
        ]}
        onIonAlertDidDismiss={() => setShowAlert(false)}
      />

      <IonContent class="outer-content page-account">
        <div>
          <img
            style={{
              maxWidth: '140px',
              borderRadius: '50%'
            }}
            src="http://www.gravatar.com/avatar?d=mm&s=140"
            alt="avatar"
          />
          <h2>{props.user.userName}</h2>

          <IonList inset>
            <IonItem href="#" onClick={updatePicture}>
              Update Picture
            </IonItem>
            <IonItem href="#" onClick={changeUsername}>
              Change Username
            </IonItem>
            <IonItem href="#" onClick={changePassword}>
              Change Password
            </IonItem>
            <IonItem href="#" onClick={support}>
              Support
            </IonItem>
            <IonItem href="#" onClick={logout}>
              Logout
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user
});

const mapDispatchToProps = {
  logOutUser: () => actions.user.logOut(),
  setUsername: (username: string) => actions.user.setUsername(username)
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
