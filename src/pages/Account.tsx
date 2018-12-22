import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router'
import { RootState, actions } from '../store';
import { IonAlert, IonHeader, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonToolbar } from '@ionic/react';

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

type State = {
  showAlert: boolean,
}

class Account extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showAlert: false
    };
  }

  updatePicture = () => {
    console.log('Clicked to update picture');
  }

  changeUsername = () => {
    this.setState(() => ({
      showAlert: true
    }));
  }

  changePassword = () => {
    console.log('Clicked to change password');
  }

  support = () => {
    this.props.history.push('/support');
  }

  logout = () => {
    this.props.logOutUser();
    this.props.history.push('/login');
  }

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

        <IonAlert
          show={this.state.showAlert}
          header={'Change Username'}
          buttons={[
            'Cancel',
            {
              text: 'Ok',
              handler: ({ username }: { username: string }) => {
                this.props.setUsername(username);
              }
            }
          ]}
          inputs={[{
            type: 'text',
            name: 'username',
            value: this.props.user.userName,
            placeholder: 'username'
          }]}
          onIonAlertDidDismiss={() => ( this.setState(() => ({ showAlert: false }))) }
        />

        <IonContent class="outer-content page-account">
          <div>
            <img style={{
              maxWidth: '140px',
              borderRadius: '50%'
            }} src="http://www.gravatar.com/avatar?d=mm&s=140" alt="avatar"/>
            <h2>{this.props.user.userName}</h2>

            <IonList inset>
              <IonItem href="#" onClick={this.updatePicture}>Update Picture</IonItem>
              <IonItem href="#" onClick={this.changeUsername}>Change Username</IonItem>
              <IonItem href="#" onClick={this.changePassword}>Change Password</IonItem>
              <IonItem href="#" onClick={this.support}>Support</IonItem>
              <IonItem href="#" onClick={this.logout}>Logout</IonItem>
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

const mapDispatchToProps = {
  logOutUser: () => actions.user.logOut(),
  setUsername: (username: string) => actions.user.setUsername(username)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Account));
