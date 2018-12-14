import React, { Component } from 'react';
import SchedulePage from './SchedulePage';
import SessionDetail from './SessionDetail';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import Map from './Map';
import About from './About';
import StackNav from '../components/StackNav';
import { IonPage, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { withRouter, RouteComponentProps, matchPath } from 'react-router';

const ScheduleStack: React.SFC<any> = (props) => (
  <StackNav
    {...props}
    navViews={[
      {
        name: 'schedule',
        title: 'Schedule',
        path: '',
        getView: () => (SchedulePage),
      }, {
        name: 'sessions',
        title: 'Session Detail',
        path: 'sessions/:id',
        getView: () => (SessionDetail),
      }
    ]}
  />
);

const SpeakerStack: React.SFC<any> = (props) => (
  <StackNav
    {...props}
    navViews={[
      {
        name: 'speaker-list',
        title: 'Speakers',
        path: '',
        getView: () => (SpeakerList),
      }, {
        name: 'sessions',
        title: 'Session Detail',
        path: 'sessions/:id',
        getView: () => (SessionDetail),
      }, {
        name: 'speakers',
        title: 'Speaker Detail',
        path: 'speakers/:id',
        getView: () => (SpeakerDetail),
      }
    ]}
  ></StackNav>
);

const MapStack: React.SFC<any> = (props) => (
  <StackNav
    {...props}
    navViews={[
      {
        name: 'map',
        title: 'Map',
        path: '',
        getView: () => (Map)
      }
    ]}
  ></StackNav>
);

const AboutStack: React.SFC<any> = (props) => (
  <StackNav
    {...props}
    navViews={[
      {
        name: 'about',
        title: 'About',
        path: '',
        getView: () => (About)
      }
    ]}
  />
);


class AppStack extends Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.urlMatchHandler = this.urlMatchHandler.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  urlMatchHandler(path: string) {
    return matchPath(this.props.location.pathname, { path: path });
  }

  onPageChange(basePath: string, subPath: string, params: any) {
    var resolvedSubPath = subPath;

    Object.keys(params).forEach((name) => {
      const value = params[name];
      resolvedSubPath = resolvedSubPath.replace(`:${name}`, value);
    });

    const activePath = `${basePath}/${resolvedSubPath}`;
    this.props.history.replace(activePath);
  }

  render() {
    return (
      <div className="ion-page">
        <IonTabs>
          <IonTab tab="schedule">
            <SchedulePage/>
           {/**
            <ScheduleStack
              onPageChange={this.onPageChange}
              urlMatchHandler={this.urlMatchHandler}
            />
           */}
          </IonTab>
          <IonTab tab="speakers">
            <SpeakerList/>
           {/**
            <SpeakerStack
              onPageChange={this.onPageChange}
              urlMatchHandler={this.urlMatchHandler}
            />
           */}
          </IonTab>
          <IonTab tab="map">
            <Map/>
           {/**
            <MapStack
              onPageChange={this.onPageChange}
              urlMatchHandler={this.urlMatchHandler}
            />
           */}
          </IonTab>
          <IonTab tab="about">
            <About/>
           {/**
            <AboutStack
              onPageChange={this.onPageChange}
              urlMatchHandler={this.urlMatchHandler}
            />
           */}
          </IonTab>

          <IonTabBar slot="bottom">
            <IonTabButton tab="schedule">
              <IonIcon name="calendar" />
              <IonLabel>Schedule</IonLabel>
            </IonTabButton>
            <IonTabButton tab="speakers">
              <IonIcon name="contacts" />
              <IonLabel>Speakers</IonLabel>
            </IonTabButton>
            <IonTabButton tab="map">
              <IonIcon name="map" />
              <IonLabel>Map</IonLabel>
            </IonTabButton>
            <IonTabButton tab="about">
              <IonIcon name="information-circle" />
              <IonLabel>About</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </div>
    );
  }
}

export default withRouter(AppStack);
