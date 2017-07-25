import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserAccount from '../containers/UserAccount'

export const PrivateRoute = ({ component, ...rest}) => (
  <UserAccount>
    {({ user }) => (
    <Route {...rest} render={props => (
      user.isAuthenticated ? (
        <component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )} />
    )}
  </UserAccount>
);
