import React from 'react';
import SessionContainer from '../containers/Session';
import Schedule from '../components/Schedule';

const SchedulePage = () => (
  <SessionContainer>
    {(props) => (
      <Schedule {...props}/>
    )}
  </SessionContainer>
);

export default SchedulePage;
