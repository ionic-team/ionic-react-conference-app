import React, { Component } from 'react';
import {IonList, IonItem, IonLabel} from '@ionic/react';

type Props = {}

export default class AboutPopover extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  support() {
    // this.app.getRootNavs()[0].push('/support');
    //this.popoverCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    //this.popoverCtrl.dismiss();
  }

  render() {
    return (
      <IonList>
        <IonItem button onClick={() => this.close('https://ionicframework.com/docs/v2/getting-started')}>
          <IonLabel>Learn Ionic</IonLabel>
        </IonItem>
        <IonItem button onClick={() => this.close('https://ionicframework.com/docs/v2')}>
          <IonLabel>Documentation</IonLabel>
        </IonItem>
        <IonItem button onClick={() => this.close('https://showcase.ionicframework.com')}>
          <IonLabel>Showcase</IonLabel>
        </IonItem>
        <IonItem button onClick={() => this.close('https://github.com/ionic-team/ionic')}>
          <IonLabel>GitHub Repo</IonLabel>
        </IonItem>
        <IonItem button onClick={() => this.support()}>
          <IonLabel>Support</IonLabel>
        </IonItem>
      </IonList>
    );
  }
}
