import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors, actions } from '../store';
import { Session } from '../store/sessions/types'
import SessionList from '../components/SessionList';
import { IonIcon, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonSearchbar, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabList, IonFabButton, IonAlert } from '@ionic/react';
import './SchedulePage.css';


type Props = {
  allFiltered: Session[],
  favoritesFiltered: Session[],
  searchText: string,
  setSearchText: (searchText: string) => void,
  updateLocations: () => void
  updateSessions: () => void
  updateSpeakers: () => void,
  updateTrackFilters: (trackList: string[]) => void,
  favoriteSessions: number []
}

type State = {
  segment: string,
}

class SchedulePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      segment: 'all',
    };

    this.presentFilter = this.presentFilter.bind(this);
    this.doRefresh = this.doRefresh.bind(this);
    this.openSocial = this.openSocial.bind(this);
    this.updateSegment = this.updateSegment.bind(this);
    this.addFavorite = this.addFavorite.bind(this);

    props.updateLocations();
    props.updateSessions();
    props.updateSpeakers();
  }

  addFavorite(sessionId: number) {

  }


  goToSessionDetail(session: Session) {
    // go to the session detail page
    // and pass in the session data
    // this.$router.push({ name: 'session-detail', params: { sessionId: session.id.toString() } });
  }
  async presentFilter() {
    /*
    const modal = await this.$ionic.modalController.create({
      component: SessionListFilter,
      componentProps: {
        excludedTracks: this.$store.state.sessions.trackFilters,
        allTracks: this.$store.getters.allTracks
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.props.updateTrackFilters(data);
    }
    */
  }

  updateSearchTerm(e: CustomEvent) {
    this.props.setSearchText(e.detail.value);
  }
  async openSocial(network: string) {
    /*
    const loading = await this.$ionic.loadingController.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    this.fabRef.current.close();
    */
  }

  updateSegment(e: CustomEvent) {
    this.setState((prevState) => ({
      ...prevState,
      segment: e.detail.value
    }));
  }

  doRefresh() {}

  render() {
    return (
      <div className="ion-page">


        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>

            <IonSegment onIonChange={this.updateSegment}>
              <IonSegmentButton value="all" checked={this.state.segment === 'all'}>
                All
              </IonSegmentButton>
              <IonSegmentButton value="favorites" checked={this.state.segment === 'favorites'}>
                Favorites
              </IonSegmentButton>
            </IonSegment>

            <IonButtons slot="end">
              <IonButton onClick={this.presentFilter}>
                <IonIcon name="options" slot="icon-only"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar color="primary">
            <IonSearchbar
              placeholder="Search"
              onIonChange={(e: CustomEvent) => this.props.setSearchText(e.detail.value)}
            >
            </IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonRefresher onIonRefresh={this.doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          <SessionList
            sessions={this.props.allFiltered}
            listType={"all"}
            hidden={this.state.segment !== "favorites"}
          />
          <SessionList
            sessions={this.props.favoritesFiltered}
            listType={"favorites"}
            hidden={this.state.segment !== "favorites"}
          />
        </IonContent>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon name="share"></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton color="vimeo" onClick={() => this.openSocial('Vimeo')}>
              <IonIcon name="logo-vimeo"></IonIcon>
            </IonFabButton>
            <IonFabButton color="google" onClick={() => this.openSocial('Google+')}>
              <IonIcon name="logo-googleplus"></IonIcon>
            </IonFabButton>
            <IonFabButton color="twitter" onClick={() => this.openSocial('Twitter')}>
              <IonIcon name="logo-twitter"></IonIcon>
            </IonFabButton>
            <IonFabButton color="facebook" onClick={() => this.openSocial('Facebook')}>
              <IonIcon name="logo-facebook"></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  allFiltered: selectors.sessions.allFiltered(state.sessions),
  favoritesFiltered: selectors.sessions.favoritesFiltered(state.sessions),
  searchText: state.sessions.searchText,
  favoriteSessions: state.sessions.favoriteSessions
});

export default connect(mapStateToProps, {
  setSearchText: (searchText: string) => actions.sessions.setSearchText(searchText),
  addFavorite: (sessionId: number) => actions.sessions.addFavorite(sessionId),
  removeFavorite: (sessionId: number) => actions.sessions.removeFavorite(sessionId),
  updateLocations: () => actions.locations.updateLocations(),
  updateSessions: () => actions.sessions.updateSessions(),
  updateSpeakers: () => actions.speakers.updateSpeakers(),
  updateTrackFilters: (trackList: string[]) => actions.sessions.updateTrackFilters(trackList)
})(SchedulePage);
