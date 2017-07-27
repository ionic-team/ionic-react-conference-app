import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserAccount from '../containers/UserAccount';
import TutorialDetail from '../containers/TutorialDetail';
import Tutorial from '../pages/Tutorial';

export const PrivateRoute = ({ component, ...rest }) => (
  <UserAccount>
    {({ user }) => {
      if (user.isAuthenticated) {
        return <Route {...rest}/>
      }
      return (
        <Redirect to={{
          pathname: '/login'
        }}/>
      );
    }}
  </UserAccount>
);

export const RequiresTutorialRoute = ({ ...rest }) => (
  <TutorialDetail>
    {({ hasSeenTutorial, updateSeenTutorial }) => {
      if (hasSeenTutorial) {
        return <Route {...rest}/>
      }
      return (
        <Tutorial hasSeenTutorial={hasSeenTutorial} updateSeenTutorial={updateSeenTutorial} />
      );
    }}
  </TutorialDetail>
);
