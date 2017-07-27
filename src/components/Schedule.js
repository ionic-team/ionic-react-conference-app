import React, { Component } from 'react';
import SessionList from './SessionList';

export default class Schedule extends Component {
  render() {
    return (
      <ion-page class="page-schedule">
        <ion-header md-height="96px" ios-height="96px">
          <ion-navbar no-border-bottom>
            <ion-buttons slot="start">
              <ion-button menuToggle>
                <ion-icon slot="icon-only" name="menu"></ion-icon>
              </ion-button>
            </ion-buttons>

            <ion-segment value={this.props.filterFavorites} ionClick={(e) => console.log(e)}>
              <ion-segment-button value={false}>
                All
              </ion-segment-button>
              <ion-segment-button value={true}>
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
              ionInput={(e) => this.props.searchSessionsByName(e.value)}
              placeholder="Search"
            >
            </ion-searchbar>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-refresher ionRefresh={(e) => this.doRefresh(e)}>
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>

          <SessionList
            sessions={this.props.filteredSessions}
            addFavoriteSession={this.props.addFavoriteSession}
            removeFavoriteSession={this.props.removeFavoriteSession}
            filterFavorites={this.props.filterFavorites}
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
    );
  }
}
