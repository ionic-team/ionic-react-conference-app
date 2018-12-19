import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors, actions } from '../store';
import { Session } from '../store/sessions/types'
import SessionList from '../components/SessionList';
import SessionListFilter from '../components/SessionListFilter';
import { IonModal, IonLoading, IonToast, IonIcon, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonSearchbar, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabList, IonFabButton, IonAlert } from '@ionic/react';
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
  favoriteSessions: number [],
  allTracks: string[],
  filteredTracks: string[]
}

type State = {
  segment: string,
  isRefreshing: boolean,
  showLoading: boolean,
  showFilterModal: boolean,
  loadingMessage: string
}

class SchedulePage extends Component<Props, State> {
  ionRefresherRef: React.RefObject<HTMLIonRefresherElement>
  ionFabRef: React.RefObject<HTMLIonFabElement>

  constructor(props: Props) {
    super(props);
    this.state = {
      segment: 'all',
      isRefreshing: false,
      showLoading: false,
      showFilterModal: false,
      loadingMessage: ''
    };

    this.presentFilter = this.presentFilter.bind(this);
    this.doRefresh = this.doRefresh.bind(this);
    this.openSocial = this.openSocial.bind(this);
    this.updateSegment = this.updateSegment.bind(this);

    props.updateLocations();
    props.updateSessions();
    props.updateSpeakers();

    this.ionRefresherRef = React.createRef<HTMLIonRefresherElement>();
    this.ionFabRef = React.createRef<HTMLIonFabElement>();
  }

  goToSessionDetail(session: Session) {
    // go to the session detail page
    // and pass in the session data
    // this.$router.push({ name: 'session-detail', params: { sessionId: session.id.toString() } });
  }
  async presentFilter() {
    this.setState(() => ({
      showFilterModal: true
    }));
  }

  updateSearchTerm(e: CustomEvent) {
    this.props.setSearchText(e.detail.value);
  }

  openSocial(network: string) {
    this.setState(() => ({
      loadingMessage: `Posting to ${network}`,
      showLoading: true
    }));

    setTimeout(() => {
      this.setState(() => ({ showLoading: false}))
    }, (Math.random() * 1000) + 500);

    if (this.ionFabRef.current) {
      this.ionFabRef.current.close();
    }
  }

  updateSegment(e: CustomEvent) {
    this.setState((prevState) => ({
      ...prevState,
      segment: e.detail.value
    }));
  }

  doRefresh() {
    setTimeout(() => {
      this.setState(() => ({ 'isRefreshing': true }));
      if (this.ionRefresherRef.current) {
        this.ionRefresherRef.current.complete();
      }
    }, 500);
  }

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
          <IonRefresher ref={this.ionRefresherRef} onIonRefresh={this.doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonToast
            show={this.state.isRefreshing}
            message="Updating content"
            showCloseButton={true}
            duration={2000}
            onIonToastDidDismiss={() => this.setState(() => ({ 'isRefreshing': false }))}
          ></IonToast>

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

        <IonModal show={this.state.showFilterModal}>
          <SessionListFilter
            filteredTracks={this.props.filteredTracks}
            allTracks={this.props.allTracks}
            updateTrackFilters={this.props.updateTrackFilters}
            dismissModal={() => this.setState(() => ({ showFilterModal: false}))}
          />
        </IonModal>

        <IonLoading
          show={this.state.showLoading}
          message={this.state.loadingMessage}
          duration={2000}
          onIonLoadingDidDismiss={() => this.setState(() => ({ 'showLoading': false }))}
        />
        <IonFab ref={this.ionFabRef} slot="fixed" vertical="bottom" horizontal="end">
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
  favoriteSessions: state.sessions.favoriteSessions,
  filteredTracks: state.sessions.trackFilters,
  allTracks: selectors.sessions.allTracks(state.sessions)
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
