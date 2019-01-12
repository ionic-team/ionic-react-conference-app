import React from 'react';
import { connect } from 'react-redux';
import { RootState, actions } from '../store';
import { withRouter, RouteComponentProps } from 'react-router';
import { format } from 'date-fns';
import { IonLabel, IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonAlert } from '@ionic/react';
import { Session } from '../store/sessions/types';
import { AlertButton } from '@ionic/react';

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & {
  session: Session;
  listType: "all" | "favorites";
}

type State = {
  showAlert: boolean;
  alertHeader?: string;
  alertMessage?: string;
  alertButtons: (AlertButton | string)[];
}

class SessionListItem extends React.Component<Props, State> {
  ionItemSlidingRef: React.RefObject<any>
  defaultState: State = {
    showAlert: false,
    alertHeader: '',
    alertMessage: undefined,
    alertButtons: []
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      ...this.defaultState
    };
    this.ionItemSlidingRef = React.createRef();
  }

  dismissAlert = () => {
    this.setState(() => ({
      ...this.defaultState
    }));
    this.ionItemSlidingRef.current.close();
  }

  addFavoriteSession = () => {
    if (this.props.favoriteSessions.indexOf(this.props.session.id) !== - 1) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavoriteSession('Favorite already added')();
    } else {
      // remember this session as a user favorite
      this.props.addFavorite(this.props.session.id);

      // create an alert instance
      this.setState({
        showAlert: true,
        alertHeader: 'Favorite Added',
        alertButtons: [
          {
            text: 'OK',
            handler: this.dismissAlert
          }
        ]
      });
    }
  }

  removeFavoriteSession = (title: string) => () => {
    this.setState({
      showAlert: true,
      alertHeader: title,
      alertMessage: 'Would you like to remove this session from your favorites?',
      alertButtons: [
        {
          text: 'Cancel',
          handler: this.dismissAlert
        },
        {
          text: 'Remove',
          handler: () => {
            this.props.removeFavorite(this.props.session.id);
            this.dismissAlert();
          }
        }
      ]
    });
  }

  navigateToSession = (sessionId: number) => () => {
    this.props.history.push(`/schedule/sessions/${sessionId}`);
  }

  render() {
    return (
      <IonItemSliding ref={this.ionItemSlidingRef} class={'track-' + this.props.session.tracks[0].toLowerCase()}>
        <IonAlert
          show={this.state.showAlert}
          header={this.state.alertHeader}
          buttons={this.state.alertButtons}
          onIonAlertDidDismiss={this.dismissAlert}
        ></IonAlert>
        <IonItem button onClick={this.navigateToSession(this.props.session.id)}>
          <IonLabel>
            <h3>{this.props.session.name}</h3>
            <p>
              {format(this.props.session.dateTimeStart, "h:MM a")} &mdash;&nbsp;
              {format(this.props.session.dateTimeEnd, "h:MM a")}:&nbsp;
              {this.props.session.location}
            </p>
          </IonLabel>
        </IonItem>
        <IonItemOptions>
          { this.props.listType === "favorites" ?
            <IonItemOption color="danger" onClick={this.removeFavoriteSession('Remove Favorite')}>
              Remove
            </IonItemOption>
            :
            <IonItemOption color="favorite" onClick={this.addFavoriteSession}>
              Favorite
            </IonItemOption>
          }
        </IonItemOptions>
      </IonItemSliding>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  favoriteSessions: state.sessions.favoriteSessions
});

const mapDispatchToProps = {
  addFavorite: (sessionId: number) => actions.sessions.addFavorite(sessionId),
  removeFavorite: (sessionId: number) => actions.sessions.removeFavorite(sessionId),
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionListItem));
