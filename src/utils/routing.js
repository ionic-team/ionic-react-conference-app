import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserAccount from '../containers/UserAccount';
import TutorialDetail from '../containers/TutorialDetail';
import Tutorial from '../pages/Tutorial';

export const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props=> (
    <UserAccount>
      {({ user }) => (
        user.isAuthenticated ? (
          <component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}
    </UserAccount>
  )}/>
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
