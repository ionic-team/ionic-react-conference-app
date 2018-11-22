import React from 'react';
import { connect } from 'react-redux';
import { RootState, selectors } from '../store';
import { Session } from '../store/sessions/types'
import SessionList from '../components/SessionList';
import { IonIcon, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonSearchbar, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabList, IonFabButton } from '../ionic';
import './Schedule.scss';

type Props = {
  allFiltered: Session[],
  favoritesFiltered: Session[]
}

const SchedulePage = (props: Props) => {

  function presentFilter() {}
  function doRefresh() {}
  function openSocial(socialName: string) {}

  return (
    <>
      <IonHeader md-height="96px" ios-height="96px" key={1}>
        <IonToolbar no-border-bottom>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonSegment
            value={props.filterFavorites}
            onIonChange={(e) => props.updateFavoriteFilter(e.detail.value)}
          >
            <IonSegmentButton value="all">
              All
            </IonSegmentButton>
            <IonSegmentButton value="favorites">
              Favorites
            </IonSegmentButton>
          </IonSegment>

          <IonButtons slot="end">
            <IonButton icon-only onClick={() => presentFilter()}>
              <IonIcon slot="icon-only" name="options"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar no-border-top>
          <IonSearchbar
            color="primary"
            placeholder="Search"
            onIonInput={(e) => props.searchSessionsByName()}
          >
          </IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent class="page-schedule">
        <IonRefresher onIonRefresh={() => doRefresh()}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <SessionList
          nav={nav}
          sessions={props.filteredSessions}
          addFavoriteSession={props.addFavoriteSession}
          removeFavoriteSession={props.removeFavoriteSession}
          hidden={props.filterFavorites !== "all"}
          filterFavorites={props.filterFavorites}
        />
        <SessionList
          nav={nav}
          sessions={props.filteredSessions.filter(session => props.favoriteSessions.includes(session.id))}
          addFavoriteSession={props.addFavoriteSession}
          removeFavoriteSession={props.removeFavoriteSession}
          hidden={props.filterFavorites !== "favorites"}
          filterFavorites={props.filterFavorites}
        />
      </IonContent>

      <IonFab>
        <IonFabButton>
          <IonIcon name="share"></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton color="vimeo" onClick={() => openSocial('Vimeo')}>
            <IonIcon name="logo-vimeo"></IonIcon>
          </IonFabButton>
          <IonFabButton color="google" onClick={() => openSocial('Google+')}>
            <IonIcon name="logo-googleplus"></IonIcon>
          </IonFabButton>
          <IonFabButton color="twitter" onClick={() => openSocial('Twitter')}>
            <IonIcon name="logo-twitter"></IonIcon>
          </IonFabButton>
          <IonFabButton color="facebook" onClick={() => openSocial('Facebook')}>
            <IonIcon name="logo-facebook"></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  allFiltered: selectors.sessions.allFiltered,
  favoritesFiltered: selectors.sessions.favoritesFiltered,
  searchText: state.sessions.searchText
});

export default connect(mapStateToProps, {
  logOutUser: () => actions.user.logOut()
})(SchedulePage);
