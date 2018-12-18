import React from 'react';
import { connect } from 'react-redux';
import { RootState, selectors, actions } from '../store';
import { format } from 'date-fns';
import { IonLabel, IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonAlert } from '@ionic/react';
import { Session } from '../store/sessions/types';

type Props = {
  session: Session;
  listType: "all" | "favorites";
  favoriteSessions: number [];
  addFavorite: (sessionId: number) => void;
  removeFavorite: (sessionId: number) => void;
}

type State = {
  showAlert: boolean
}

class SessionListItem extends React.Component<Props, State> {
  ionItemSlidingRef: React.RefObject<any>

  constructor(props: Props) {
    super(props);

    this.state = {
      showAlert: false
    }
    this.ionItemSlidingRef = React.createRef();
    this.addFavoriteSession = this.addFavoriteSession.bind(this);
    this.removeFavoriteSession = this.removeFavoriteSession.bind(this);
  }

  addFavoriteSession() {
    if (this.props.favoriteSessions.indexOf(this.props.session.id) !== - 1) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      // this.removeFavoriteSession(event, session, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.props.addFavorite(this.props.session.id);

      // create an alert instance
      this.setState({
        showAlert: true
      });
    }
  }

  async removeFavoriteSession() {
    /*
    const alert = await this.$ionic.alertController.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            const slidingItem = (event.target as HTMLElement).closest('ion-item-sliding');
            (slidingItem as any).close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.props.removeFavorite(session.id);

            // close the sliding item and hide the option buttons
            const slidingItem = (event.target as HTMLElement).closest('ion-item-sliding');
            (slidingItem as any).close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
    */
  }

  render() {
    return (
      <IonItemSliding ref={this.ionItemSlidingRef} class={'track-' + this.props.session.tracks[0].toLowerCase()}>
        <IonAlert
          show={this.state.showAlert}
          header={'Favorite Added'}
          buttons={[{
            text: 'OK',
            handler: () => {
              this.setState(() => ({ 'showAlert': false }));
              this.ionItemSlidingRef.current.close();
            }
          }]}
        ></IonAlert>
        <IonItem button onClick={() => console.log('sessions', { id: this.props.session.id })}>
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
            <IonItemOption color="danger" onClick={this.removeFavoriteSession}>
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

export default connect(mapStateToProps, {
  addFavorite: (sessionId: number) => actions.sessions.addFavorite(sessionId),
  removeFavorite: (sessionId: number) => actions.sessions.removeFavorite(sessionId),
})(SessionListItem);
