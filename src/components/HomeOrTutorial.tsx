import React from 'react';
import { Navigate } from 'react-router-dom';

import { connect } from '../data/connect';

interface StateProps {
  hasSeenTutorial: boolean;
}

const HomeOrTutorial: React.FC<StateProps> = ({ hasSeenTutorial }) => {
  return hasSeenTutorial ? <Navigate to="/tabs/schedule" replace /> : <Navigate to="/tutorial" replace />;
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial,
  }),
  component: HomeOrTutorial,
});
