import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({history, children, path, location, match, ...props}) => (
  <ion-button {...props} onClick={() => history.push(props.path)}>
    {children}
  </ion-button>
));
