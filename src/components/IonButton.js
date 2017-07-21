import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({children, path, history}) => (
  <ion-button ion-item menuClose onClick={() => { history.push(path); }}>
    {children}
  </ion-button>
));
