import React from 'react';
import { matchPath } from 'react-router-dom';
import SchedulePage from './SchedulePage';
import SessionDetail from './SessionDetail';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import MapPage from './Map';
import About from './About';
import StackNav from '../components/StackNav';
import TabNav from '../components/TabNav';

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

const AppStack = (props) => (
  <ion-page>
    <TabNav
      onClickHandler={(navView) => (e) => {
        e.preventDefault();
        props.history.push(`${navView.path}`);
      }}
      urlMatchHandler={(navView) => {
        return matchPath(props.location.pathname, { path: navView.path });
      }}
      navViewProps={{
        onPageChange: (basePath, navView, params) =>  {
          var newPath = navView.path;
          Object.entries(params).forEach(([name, value]) => {
            newPath = newPath.replace(`:${name}`, value);
          });
         props.history.replace(`${basePath}/${newPath}`);
        },
        urlMatchHandler: (basePath, navView) => {
          return matchPath(props.location.pathname, { path: `${basePath}/${navView.path}` });
        }
      }}
      navViews={[
        {
          title: 'Schedule',
          icon: 'calendar-outline',
          path: '/schedule',
          getView: () => (ScheduleStack)
        },
        {
          title: 'Speakers',
          icon: 'contacts',
          path: '/speakers',
          getView: () => (SpeakerStack)
        },
        {
          title: 'Map',
          icon: 'map-outline',
          path: '/map',
          getView: () => (MapStack)
        },
        {
          title: 'About',
          icon: 'information-circle-outline',
          path: '/about',
          getView: () => (AboutStack)
        }
      ]}
    />
  </ion-page>
);
export default AppStack;
