import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenuButton,
  IonModal,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonToast,
  IonToolbar
} from '@ionic/react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import SessionList from '../components/SessionList';
import SessionListFilter from '../components/SessionListFilter';
import { actions, RootState, selectors } from '../store';
import './SchedulePage.css';
import { share, logoVimeo, logoGoogleplus, logoTwitter, logoFacebook, options } from 'ionicons/icons';

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

type State = {
  segment: string;
  isRefreshing: boolean;
  showLoading: boolean;
  showFilterModal: boolean;
  loadingMessage: string;
};

class SchedulePage extends Component<Props, State> {
  ionRefresherRef: React.RefObject<HTMLIonRefresherElement>;
  ionFabRef: React.RefObject<HTMLIonFabElement>;
  state = {
    segment: 'all',
    isRefreshing: false,
    showLoading: false,
    showFilterModal: false,
    loadingMessage: ''
  };

  constructor(props: Props) {
    super(props);
    this.ionRefresherRef = React.createRef<HTMLIonRefresherElement>();
    this.ionFabRef = React.createRef<HTMLIonFabElement>();
  }

  presentFilter = () => {
    this.setState(() => ({
      showFilterModal: true
    }));
  };

  updateSearchTerm = (e: CustomEvent) => {
    this.props.setSearchText(e.detail.value);
  };

  openSocial = (network: string) => {
    this.setState(() => ({
      loadingMessage: `Posting to ${network}`,
      showLoading: true
    }));

    setTimeout(() => {
      this.setState(() => ({ showLoading: false }));
    }, Math.random() * 1000 + 500);

    if (this.ionFabRef.current) {
      this.ionFabRef.current.close();
    }
  };

  updateSegment = (e: CustomEvent) => {
    this.setState(prevState => ({
      ...prevState,
      segment: e.detail.value
    }));
  };

  doRefresh = () => {
    setTimeout(() => {
      this.setState(() => ({ isRefreshing: true }));
      if (this.ionRefresherRef.current) {
        this.ionRefresherRef.current.complete();
      }
    }, 500);
  };

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
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
                <IonIcon icon={options} slot="icon-only" />
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar color="primary">
            <IonSearchbar
              placeholder="Search"
              onIonChange={(e: CustomEvent) => this.props.setSearchText(e.detail.value)}
            />
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonRefresher ref={this.ionRefresherRef} onIonRefresh={this.doRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          <IonToast
            isOpen={this.state.isRefreshing}
            message="Updating content"
            showCloseButton={true}
            duration={2000}
            onDidDismiss={() => this.setState(() => ({ isRefreshing: false }))}
          />

          <SessionList
            sessions={this.props.allFiltered}
            listType={'all'}
            hidden={this.state.segment === 'favorites'}
          />
          <SessionList
            sessions={this.props.favoritesFiltered}
            listType={'favorites'}
            hidden={this.state.segment === 'all'}
          />
        </IonContent>

        <IonModal
          isOpen={this.state.showFilterModal}
          onDidDismiss={() => this.setState(() => ({ showFilterModal: false }))}
        >
          <SessionListFilter
            filteredTracks={this.props.filteredTracks}
            allTracks={this.props.allTracks}
            updateTrackFilters={this.props.updateTrackFilters}
            dismissModal={() => this.setState(() => ({ showFilterModal: false }))}
          />
        </IonModal>

        <IonLoading
          isOpen={this.state.showLoading}
          message={this.state.loadingMessage}
          duration={2000}
          onDidDismiss={() => this.setState(() => ({ showLoading: false }))}
        />
        <IonFab ref={this.ionFabRef} slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={share} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton color="vimeo" onClick={() => this.openSocial('Vimeo')}>
              <IonIcon icon={logoVimeo} />
            </IonFabButton>
            <IonFabButton color="google" onClick={() => this.openSocial('Google+')}>
              <IonIcon icon={logoGoogleplus} />
            </IonFabButton>
            <IonFabButton color="twitter" onClick={() => this.openSocial('Twitter')}>
              <IonIcon icon={logoTwitter} />
            </IonFabButton>
            <IonFabButton color="facebook" onClick={() => this.openSocial('Facebook')}>
              <IonIcon icon={logoFacebook} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </>
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

const mapDispatchToProps = {
  setSearchText: (searchText: string) => actions.sessions.setSearchText(searchText),
  updateTrackFilters: (trackList: string[]) => actions.sessions.updateTrackFilters(trackList)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulePage);
