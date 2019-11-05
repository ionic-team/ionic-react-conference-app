import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { calendar, contacts, hammer, help, informationCircle, logIn, logOut, map, person, personAdd } from 'ionicons/icons';
import React, { useState } from 'react';
import { connect } from '../data/connect';
import { RouteComponentProps, withRouter } from 'react-router';

const routes = {
  appPages: [
    { title: 'Schedule', path: '/tabs/schedule', icon: calendar, routerDirection: 'none' },
    { title: 'Speakers', path: '/tabs/speakers', icon: contacts, routerDirection: 'none' },
    { title: 'Map', path: '/tabs/map', icon: map, routerDirection: 'none' },
    { title: 'About', path: '/tabs/about', icon: informationCircle, routerDirection: 'none' }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: person },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Logout', path: '/logout', icon: logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Signup', path: '/signup', icon: personAdd }
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: { ios: string, md: string},
  routerDirection?: string
}
interface StateProps {
  isAuthenticated: boolean;
}

interface MenuProps extends RouteComponentProps, StateProps {}

const Menu: React.FC<MenuProps> = ({ history, isAuthenticated }) => {
  const [disableMenu, setDisableMenu] = useState(false);
  
  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem button routerLink={p.path} routerDirection={p.routerDirection as any}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu disabled={disableMenu} contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          <IonListHeader>Navigate</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList>
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
        </IonList>
        <IonList>
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem onClick={() => {
            setDisableMenu(true);
            history.push('/tutorial');
          }}>
            <IonIcon slot="start" icon={hammer} />
            Show Tutorial
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    isAuthenticated: state.hasLoggedIn
  }),
  component: withRouter(Menu)
})
