import React, { FunctionComponent, useState, useRef } from 'react';
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

interface State {
  showAlert: boolean;
  alertHeader?: string;
  alertMessage?: string;
  alertButtons: (AlertButton | string)[];
}

const SessionListItem: FunctionComponent<Props> = props => {
  const defaultState = {
    showAlert: false,
    alertHeader: '',
    alertMessage: undefined,
    alertButtons: []
  }
  const ionItemSlidingRef = useRef<any>(null);
  const [state, setState] = useState<State>(defaultState);

  const dismissAlert = () => {
    setState(defaultState);
    ionItemSlidingRef.current.close();
  }

  const addFavoriteSession = () => {
    if (props.favoriteSessions.indexOf(props.session.id) !== - 1) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteSession('Favorite already added')();
    } else {
      // remember this session as a user favorite
      props.addFavorite(props.session.id);

      // create an alert instance
      setState({
        showAlert: true,
        alertHeader: 'Favorite Added',
        alertButtons: [
          {
            text: 'OK',
            handler: dismissAlert
          }
        ]
      });
    }
  }

  const removeFavoriteSession = (title: string) => () => {
    setState({
      showAlert: true,
      alertHeader: title,
      alertMessage: 'Would you like to remove this session from your favorites?',
      alertButtons: [
        {
          text: 'Cancel',
          handler: dismissAlert
        },
        {
          text: 'Remove',
          handler: () => {
            props.removeFavorite(props.session.id);
            dismissAlert();
          }
        }
      ]
    });
  }

  const navigateToSession = (sessionId: number) => () => {
    props.history.push(`/schedule/sessions/${sessionId}`);
  }

  return (
    <IonItemSliding ref={ionItemSlidingRef} class={'track-' + props.session.tracks[0].toLowerCase()}>
      <IonAlert
        show={state.showAlert}
        header={state.alertHeader}
        buttons={state.alertButtons}
        onIonAlertDidDismiss={dismissAlert}
      ></IonAlert>
      <IonItem button onClick={navigateToSession(props.session.id)}>
        <IonLabel>
          <h3>{props.session.name}</h3>
          <p>
            {format(props.session.dateTimeStart, "h:MM a")} &mdash;&nbsp;
            {format(props.session.dateTimeEnd, "h:MM a")}:&nbsp;
            {props.session.location}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        { props.listType === "favorites" ?
          <IonItemOption color="danger" onClick={removeFavoriteSession('Remove Favorite')}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favorite" onClick={addFavoriteSession}>
            Favorite
          </IonItemOption>
        }
      </IonItemOptions>
    </IonItemSliding>
  );
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
