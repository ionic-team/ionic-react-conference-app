import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors, actions } from '../store';
import { Session } from '../store/sessions/types'
import SessionList from '../components/SessionList';
import { IonIcon, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonSearchbar, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabList, IonFabButton } from '../ionic';

type Props = {
  allFiltered: Session[],
  favoritesFiltered: Session[],
  searchText: string,
  setSearchText: (searchText: string) => any,
  addFavorite: (sessionId: number) => any,
  removeFavorite: (sessionId: number) => any
}

type State = {
  segment: string
}

class SchedulePage extends Component<Props, State> {

  presentFilter() {}
  doRefresh() {}
  openSocial(socialName: string) {}
  updateSegment(segment?: string | null) {}

  render() {
    return (
      <>
        <IonHeader md-height="96px" ios-height="96px" key={1}>
          <IonToolbar no-border-bottom>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonSegment
              onIonChange={(e) => this.updateSegment(e.detail.value)}
            >
              <IonSegmentButton value="all" checked={this.state.segment === 'all'}>
                All
              </IonSegmentButton>
              <IonSegmentButton value="favorites">
                Favorites
              </IonSegmentButton>
            </IonSegment>

            <IonButtons slot="end">
              <IonButton icon-only onClick={() => this.presentFilter()}>
                <IonIcon slot="icon-only" name="options"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar no-border-top>
            <IonSearchbar
              color="primary"
              placeholder="Search"
              onIonInput={(e: CustomEvent) => this.props.setSearchText(e.detail.value)}
            >
            </IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonContent class="page-schedule">
          <IonRefresher onIonRefresh={() => this.doRefresh()}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          <SessionList
            nav={nav}
            sessions={this.props.allFiltered}
            addFavoriteSession={this.props.addFavorite}
            removeFavoriteSession={this.props.removeFavorite}
            hidden={this.state.segment !== "all"}
            filterFavorites={this.props.filterFavorites}
          />
          <SessionList
            nav={nav}
            sessions={this.props.favoritesFiltered}
            addFavoriteSession={this.props.addFavorite}
            removeFavoriteSession={this.props.removeFavorite}
            hidden={this.state.segment !== "favorites"}
            filterFavorites={this.props.filterFavorites}
          />
        </IonContent>

        <IonFab>
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
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  allFiltered: selectors.sessions.allFiltered,
  favoritesFiltered: selectors.sessions.favoritesFiltered,
  searchText: state.sessions.searchText
});

export default connect(mapStateToProps, {
  setSearchText: (searchText: string) => actions.sessions.setSearchText(searchText),
  addFavorite: (sessionId: number) => actions.sessions.addFavorite(sessionId),
  removeFavorite: (sessionId: number) => actions.sessions.removeFavorite(sessionId)
})(SchedulePage);
