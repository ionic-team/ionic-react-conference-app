import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SchedulePage from '../SchedulePage';
import SessionDetail from '../SessionDetail';
import SpeakerList from '../SpeakerList';
import SpeakerDetail from '../SpeakerDetail';
import MapPage from '../Map';
import About from '../About';
import StackNav from './StackNav';
import TabNav from './TabNav';

const ScheduleStack = (props) => (
  <StackNav
    onChange={(viewPath, params)=> console.log(viewPath, params) }
    location={props.location.pathname}
    navViews={[
      {
        name: 'root',
        title: 'Schedule',
        getView: () => (SchedulePage),
      }, {
        name: 'sessions',
        title: 'Session Detail',
        getView: () => (SessionDetail),
      }
    ]}
  />
);

const SpeakerStack = (props) => (
  <StackNav
    onChange={(viewPath, params)=> console.log(viewPath, params) }
    location={props.location.pathname}
    navViews={[
      {
        name: 'root',
        title: 'Speakers',
        getView: () => (SpeakerList),
      }, {
        name: 'sessions-detail',
        title: 'Session Detail',
        getView: () => (SessionDetail),
      }, {
        name: 'speakers-detail',
        title: 'Speaker Detail',
        getView: () => (SpeakerDetail),
      }
    ]}
  ></StackNav>
);

const MapStack = (props) => (
  <StackNav
    onChange={(viewPath, params)=> console.log(viewPath, params) }
    location={props.location.pathname}
    navViews={[
      {
        name: 'root',
        title: 'Map',
        getView: () => (MapPage)
      }
    ]}
  ></StackNav>
);

const AboutStack = (props) => (
  <StackNav
    onChange={(viewPath, params)=> console.log(viewPath, params) }
    location={props.location.pathname}
    navViews={[
      {
        name: 'root',
        title: 'About',
        getView: () => (About)
      }
    ]}
  />
);

const AppStack = (props) => (
  <TabNav
    onChange={(viewPath, params)=> console.log(viewPath, params) }
    location={props.location.pathname}
    history={props.history}
    match='/:name'
    navViews={[
      {
        name: 'schedule',
        title: 'Schedule',
        icon: 'calendar-outline',
        getView: () => (ScheduleStack)
      },
      {
        name: 'speakers',
        title: 'Speakers',
        icon: 'contacts',
        getView: () => (SpeakerStack)
      },
      {
        name: 'map',
        title: 'Map',
        icon: 'map-outline',
        getView: () => (MapStack)
      },
      {
        name: 'about',
        title: 'About',
        icon: 'informaion-circle-outline',
        getView: () => (AboutStack)
      }
    ]}
  />
);
export default AppStack;
