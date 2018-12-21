import React, { Component } from 'react';
import {IonList, IonItem, IonLabel} from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<{}> & {
  dismissPopover: () => void;
}

class AboutPopover extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  support = () => {
    this.props.history.push('/support');
    this.props.dismissPopover();
  }

  close = (url: string) => () => {
    window.open(url, '_blank');
    this.props.dismissPopover();
  }

  render() {
    return (
      <IonList>
        <IonItem button onClick={this.close('https://ionicframework.com/docs/v2/getting-started')}>
          <IonLabel>Learn Ionic</IonLabel>
        </IonItem>
        <IonItem button onClick={this.close('https://ionicframework.com/docs/v2')}>
          <IonLabel>Documentation</IonLabel>
        </IonItem>
        <IonItem button onClick={this.close('https://showcase.ionicframework.com')}>
          <IonLabel>Showcase</IonLabel>
        </IonItem>
        <IonItem button onClick={this.close('https://github.com/ionic-team/ionic')}>
          <IonLabel>GitHub Repo</IonLabel>
        </IonItem>
        <IonItem button onClick={this.support}>
          <IonLabel>Support</IonLabel>
        </IonItem>
      </IonList>
    );
  }
}

export default withRouter(AboutPopover);
