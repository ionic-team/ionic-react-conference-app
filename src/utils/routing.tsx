import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Tutorial from '../pages/Tutorial';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { User } from '../store/user/types';

type Props = {
  user: User,
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path?: string | string[];
}

class PRoute extends Component<Props> {
  render() {
    const Component = this.props.component;
    const routeRender = (props: any) => {
      if (this.props.user.isAuthenticated) {
        return React.createElement(Component, props);
      }
      return (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      );
    }
    return <Route render={routeRender.bind(this)} />;
  }
}

class RTRoute extends Component<Props> {
  render() {
    if (this.props.user.hasSeenTutorial) {
      return <Route {...this.props}/>;
    }
    return (
      <Tutorial />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user
});
const connectUser = connect(mapStateToProps);

export const PrivateRoute = connectUser(PRoute);
export const RequiresTutorialRoute = connectUser(RTRoute);
