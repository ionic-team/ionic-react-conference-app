import React from 'react';
import SessionContainer from '../containers/Session';
import SessionList from '../components/SessionList';
import { wc } from '../utils/stencil';
import './Schedule.scss';

const SchedulePage = () => (
  <SessionContainer>
    {(props) => (
      <ion-page class="page-schedule">
        <ion-header md-height="96px" ios-height="96px">
          <ion-navbar no-border-bottom>
            <ion-buttons slot="start">
              <ion-button menuToggle>
                <ion-icon slot="icon-only" name="menu"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-segment
              value={props.filterFavorites}
              ref={wc({
                ionChange: (e) => props.updateFavoriteFilter(e.target.value)
              })}
            >
              <ion-segment-button value="all">
                All
              </ion-segment-button>
              <ion-segment-button value="favorites">
                Favorites
              </ion-segment-button>
            </ion-segment>

            <ion-buttons slot="end">
              <ion-button icon-only onClick={() => this.presentFilter()}>
                <ion-icon slot="icon-only" name="options"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-navbar>

          <ion-toolbar no-border-top>
            <ion-searchbar
              color="primary"
              placeholder="Search"
              ref={wc({
                ionInput:(e) => props.searchSessionsByName(e.target.value)
              })}
            >
            </ion-searchbar>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-refresher ionRefresh={(e) => this.doRefresh(e)}>
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>

          <SessionList
            sessions={props.filteredSessions}
            addFavoriteSession={props.addFavoriteSession}
            removeFavoriteSession={props.removeFavoriteSession}
            hidden={props.filterFavorites !== "all"}
            filterFavorites={props.filterFavorites}
          />
          <SessionList
            sessions={props.filteredSessions.filter(session => props.favoriteSessions.includes(session.id))}
            addFavoriteSession={props.addFavoriteSession}
            removeFavoriteSession={props.removeFavoriteSession}
            hidden={props.filterFavorites !== "favorites"}
            filterFavorites={props.filterFavorites}
          />
        </ion-content>
        <ion-fixed>
          <ion-fab bottom right>
            <ion-fab-button>
              <ion-icon name="share"></ion-icon>
            </ion-fab-button>
            <ion-fab-list side="top">
              <ion-fab-button color="vimeo" onClick={() => this.openSocial('Vimeo')}>
                <ion-icon name="logo-vimeo"></ion-icon>
              </ion-fab-button>
              <ion-fab-button color="google" onClick={() => this.openSocial('Google+')}>
                <ion-icon name="logo-googleplus"></ion-icon>
              </ion-fab-button>
              <ion-fab-button color="twitter" onClick={() => this.openSocial('Twitter')}>
                <ion-icon name="logo-twitter"></ion-icon>
              </ion-fab-button>
              <ion-fab-button color="facebook" onClick={() => this.openSocial('Facebook')}>
                <ion-icon name="logo-facebook"></ion-icon>
              </ion-fab-button>
            </ion-fab-list>
          </ion-fab>
        </ion-fixed>
      </ion-page>
    )}
  </SessionContainer>
);

export default SchedulePage;
