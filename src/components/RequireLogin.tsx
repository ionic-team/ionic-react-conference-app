import React from 'react';
import { Navigate, useLocation, useResolvedPath } from 'react-router-dom';

import { connect } from '../data/connect';

interface OwnProps {
  children: React.ReactNode;
}

interface StateProps {
  isLoggedin: boolean;
  loading: boolean;
}

interface RequireLoginProps extends OwnProps, StateProps {}

/**
 * Shows its page only while logged in and sends a logged out user to the login page.
 */
const RequireLogin: React.FC<RequireLoginProps> = ({ children, isLoggedin, loading }) => {
  const location = useLocation();
  const routePath = useResolvedPath('.');

  // Wait for the saved login to load before deciding.
  if (loading) {
    return null;
  }

  // A page stays mounted after it is left, so only redirect while this page is the one being shown.
  if (!isLoggedin && location.pathname === routePath.pathname) {
    return <Navigate to="/login" replace />;
  }

  return isLoggedin ? children : null;
};

export default connect<OwnProps, StateProps, {}>({
  mapStateToProps: (state) => ({
    isLoggedin: state.user.isLoggedin,
    loading: state.user.loading,
  }),
  component: RequireLogin,
});
