import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { IonIcon, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonMenuToggle } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';

const routes = {
  appPages: [
    { title: 'Schedule', path: '/', icon: 'calendar' },
    { title: 'Speakers', path: '/speakers', icon: 'contacts' },
    { title: 'Map', path: '/map', icon: 'map' },
    { title: 'About', path: '/about', icon: 'information-circle' }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: 'person'},
    { title: 'Support', path: '/support', icon: 'help' },
    { title: 'Logout', path: '/logout', icon: 'log-out' }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: 'log-in' },
    { title: 'Support', path: '/support', icon: 'help' },
    { title: 'Signup', path: '/signup', icon: 'person-add' }
  ]
}

interface Props extends RouteComponentProps<any> {
  isAuthenticated: boolean
}

const Menu: React.SFC<Props> = ({ isAuthenticated, history }) => {

  function renderlistItems(list: any[]) {
    return list
      .filter(route => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem button onClick={() => history.push(p.path)}>
            <IonIcon slot="start" name={p.icon}></IonIcon>
            <IonLabel>
              {p.title}
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>,
      <IonContent class="outer-content">
        <IonList>
          <IonListHeader>
            Navigate
          </IonListHeader>
          { renderlistItems(routes.appPages) }
        </IonList>
        <IonList>
          <IonListHeader>
            Account
          </IonListHeader>
          { isAuthenticated ?
            renderlistItems(routes.loggedOutPages) :
            renderlistItems(routes.loggedInPages) }
        </IonList>
        <IonList>
          <IonListHeader>
            Tutorial
          </IonListHeader>
          <IonItem onClick={() => {}}>
            <IonIcon slot="start" name="hammer"></IonIcon>
            Show Tutorial
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(Menu));
