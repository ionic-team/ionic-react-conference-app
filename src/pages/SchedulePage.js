import React from 'react';
import SessionContainer from '../containers/Session';
import Schedule from '../components/Schedule';

const SchedulePage = () => (
  <ion-page>
    <SessionContainer>
      {(props) => (
      <Schedule {...props}/>
      )}
    </SessionContainer>
  </ion-page>
);

export default SchedulePage;
