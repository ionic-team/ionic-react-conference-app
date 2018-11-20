import React from 'react';
import SessionContainer from '../containers/Session';
import SessionList from '../components/SessionList';
import { wc } from '../utils/stencil';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonSearchbar, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton } from '../ionic';
import './Schedule.scss';

const SchedulePage = ({ nav }) => (
  <SessionContainer>
    {(props) => (
      <>
        <IonHeader md-height="96px" ios-height="96px" key={1}>
          <IonToolbar no-border-bottom>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonSegment
              value={props.filterFavorites}
              ref={wc({
                ionChange: (e) => props.updateFavoriteFilter(e.target.value)
              })}
            >
              <IonSegmentButton value="all">
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
              ref={wc({
                ionInput:(e) => props.searchSessionsByName(e.target.value)
              })}
            >
            </IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonContent class="page-schedule" key={2}>
          <IonRefresher onIonRefresh={(e) => this.doRefresh(e)}>
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

        <IonFab bottom right>
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
    )}
  </SessionContainer>
);

export default SchedulePage;
