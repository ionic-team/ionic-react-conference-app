import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserAccount from '../pages/Account';
import TutorialDetail from '../pages/Tutorial';
import Tutorial from '../pages/Tutorial';

export const PrivateRoute = ({ component, ...rest }) =>
  <Route {...rest} render={props => {
    if (user.isAuthenticated) {
      return <component {...props}/>
    }
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    );
  }}/>



export const RequiresTutorialRoute = (props) => {
  if (hasSeenTutorial) {
    return <Route {...props}/>
  }
  return (
    <Tutorial hasSeenTutorial={hasSeenTutorial} updateSeenTutorial={updateSeenTutorial} />
  );
};
