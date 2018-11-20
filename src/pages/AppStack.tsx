import React, { Component } from 'react';
import { matchPath } from 'react-router-dom';
import SchedulePage from './SchedulePage';
import SessionDetail from './SessionDetail';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import MapPage from './Map';
import About from './About';
import StackNav from '../components/StackNav';
import TabNav from '../components/TabNav';
import { IonPage } from '../ionic';

const ScheduleStack = (props) => (
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

const SpeakerStack = (props) => (
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

const MapStack = (props) => (
  <StackNav
    {...props}
    navViews={[
      {
        name: 'map',
        title: 'Map',
        path: '',
        getView: () => (MapPage)
      }
    ]}
  ></StackNav>
);

const AboutStack = (props) => (
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

export default class AppStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childViews: [
        {
          title: 'Schedule',
          icon: 'calendar-outline',
          basePath: '/schedule',
          getView: () => (ScheduleStack)
        },
        {
          title: 'Speakers',
          icon: 'contacts',
          basePath: '/speakers',
          getView: () => (SpeakerStack)
        },
        {
          title: 'Map',
          icon: 'map-outline',
          basePath: '/map',
          getView: () => (MapStack)
        },
        {
          title: 'About',
          icon: 'information-circle-outline',
          basePath: '/about',
          getView: () => (AboutStack)
        }
      ]
    }
  }

  tabClickHandler(path) {
    return (e) => {
      e.preventDefault();
      this.props.history.push(path);
    }
  }

  urlMatchHandler(path) {
    return matchPath(this.props.location.pathname, { path: path });
  }

  onPageChange(basePath, subPath, params) {
    var resolvedSubPath = subPath;
    Object.entries(params).forEach(([name, value]) => {
      resolvedSubPath = resolvedSubPath.replace(`:${name}`, value);
    });
    const activePath = `${basePath}/${resolvedSubPath}`;
    this.props.history.replace(activePath);
  }

  render() {
    return (
      <IonPage>
        <TabNav
          childViews={this.state.childViews}
          onClickHandler={this.tabClickHandler.bind(this)}
          urlMatchHandler={this.urlMatchHandler.bind(this)}
          childViewProps={
            {
              urlMatchHandler: this.urlMatchHandler.bind(this),
              onPageChange: this.onPageChange.bind(this)
            }
          }
        />
      </IonPage>
    );
  }
}
