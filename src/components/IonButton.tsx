import React from 'react';
import { IonButton } from '../ionic';
import { withRouter } from 'react-router-dom';

export default withRouter(({history, children, location, match, ...props}) => (
  <IonButton {...props} onClick={() => history.push(props.path)}>
    {children}
  </IonButton>
));
