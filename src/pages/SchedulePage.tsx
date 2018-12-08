import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors, actions } from '../store';
import { Session } from '../store/sessions/types'
import SessionList from '../components/SessionList';
import { IonIcon, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonSearchbar, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabList, IonFabButton } from '../ionic';
import './SchedulePage.css';

type Props = {
  allFiltered: Session[],
  favoritesFiltered: Session[],
  searchText: string,
  setSearchText: (searchText: string) => void,
  addFavorite: (sessionId: number) => void,
  removeFavorite: (sessionId: number) => void,
  updateLocations: () => void
  updateSessions: () => void
  updateSpeakers: () => void
}

type State = {
  segment: string
}

class SchedulePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      segment: 'all'
    }
    this.presentFilter = this.presentFilter.bind(this);
    this.doRefresh = this.doRefresh.bind(this);
    this.openSocial = this.openSocial.bind(this);
    this.updateSegment = this.updateSegment.bind(this);

    props.updateLocations();
    props.updateSessions();
    props.updateSpeakers();
  }

  presentFilter() {}
  doRefresh() {}
  openSocial(socialName: string) {}
  updateSegment(e: CustomEvent) {}

  render() {
    return (
      <div className="ion-page">
        <IonHeader>
          <IonToolbar color="primary" no-border-bottom>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>

            <IonSegment
              onIonChange={this.updateSegment}
            >
              <IonSegmentButton value="all" checked={this.state.segment === 'all'}>
                All
              </IonSegmentButton>
              <IonSegmentButton value="favorites" checked={this.state.segment === 'favorites'}>
                Favorites
              </IonSegmentButton>
            </IonSegment>

            <IonButtons slot="end">
              <IonButton icon-only onClick={this.presentFilter}>
                <IonIcon slot="icon-only" name="options"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar no-border-top>
            <IonSearchbar
              color="primary"
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
            addFavoriteSession={this.props.addFavorite}
            removeFavoriteSession={this.props.removeFavorite}
            hidden={this.state.segment !== "all"}
            filterFavorites={true}
          />
          <SessionList
            sessions={this.props.favoritesFiltered}
            addFavoriteSession={this.props.addFavorite}
            removeFavoriteSession={this.props.removeFavorite}
            hidden={this.state.segment !== "favorites"}
            filterFavorites={false}
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
  searchText: state.sessions.searchText
});

export default connect(mapStateToProps, {
  setSearchText: (searchText: string) => actions.sessions.setSearchText(searchText),
  addFavorite: (sessionId: number) => actions.sessions.addFavorite(sessionId),
  removeFavorite: (sessionId: number) => actions.sessions.removeFavorite(sessionId),
  updateLocations: () => actions.locations.updateLocations(),
  updateSessions: () => actions.sessions.updateSessions(),
  updateSpeakers: () => actions.speakers.updateSpeakers()
})(SchedulePage);
