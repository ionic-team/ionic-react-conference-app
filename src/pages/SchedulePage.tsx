import './SchedulePage.css';

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
  IonToolbar,
} from '@ionic/react';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import SessionList from '../components/SessionList';
import SessionListFilter from '../components/SessionListFilter';
import { actions, RootState, selectors } from '../store';

type Props = RouteComponentProps<{}> &
  typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>;

interface State {
  segment: string;
  isRefreshing: boolean;
  showLoading: boolean;
  showFilterModal: boolean;
  loadingMessage: string;
}

const SchedulePage: FunctionComponent<Props> = props => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const ionFabRef = useRef<HTMLIonFabElement>(null);
  const [state, setState] = useState<State>({
    segment: 'all',
    isRefreshing: false,
    showLoading: false,
    showFilterModal: false,
    loadingMessage: ''
  });

  useEffect(() => {
    props.updateLocations();
    props.updateSessions();
    props.updateSpeakers();
  }, []);

  const presentFilter = () => {
    setState({
      ...state,
      showFilterModal: true
    });
  };

  const updateSearchTerm = (e: CustomEvent) => {
    props.setSearchText(e.detail.value);
  };

  const openSocial = (network: string) => {
    setState({
      ...state,
      loadingMessage: `Posting to ${network}`,
      showLoading: true
    });

    setTimeout(() => {
      setState({
        ...state,
        showLoading: false
      });
    }, Math.random() * 1000 + 500);

    if (ionFabRef.current) {
      ionFabRef.current.close();
    }
  };

  const updateSegment = (e: CustomEvent) => {
    setState(prevState => ({
      ...prevState,
      segment: e.detail.value
    }));
  };

  const doRefresh = () => {
    setTimeout(() => {
      setState({ ...state, isRefreshing: true });
      if (ionRefresherRef.current) {
        ionRefresherRef.current.complete();
      }
    }, 500);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonSegment onIonChange={updateSegment}>
            <IonSegmentButton value="all" checked={state.segment === 'all'}>
              All
            </IonSegmentButton>
            <IonSegmentButton value="favorites" checked={state.segment === 'favorites'}>
              Favorites
            </IonSegmentButton>
          </IonSegment>

          <IonButtons slot="end">
            <IonButton onClick={presentFilter}>
              <IonIcon name="options" slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar color="primary">
          <IonSearchbar
            placeholder="Search"
            onIonChange={(e: CustomEvent) => props.setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonToast
          show={state.isRefreshing}
          message="Updating content"
          showCloseButton={true}
          duration={2000}
          onIonToastDidDismiss={() => setState({ ...state, isRefreshing: false })}
        />

        <SessionList
          sessions={props.allFiltered}
          listType={'all'}
          hidden={state.segment === 'favorites'}
        />
        <SessionList
          sessions={props.favoritesFiltered}
          listType={'favorites'}
          hidden={state.segment === 'all'}
        />
      </IonContent>

      <IonModal show={state.showFilterModal}>
        <SessionListFilter
          filteredTracks={props.filteredTracks}
          allTracks={props.allTracks}
          updateTrackFilters={props.updateTrackFilters}
          dismissModal={() => setState({ ...state, showFilterModal: false })}
        />
      </IonModal>

      <IonLoading
        show={state.showLoading}
        message={state.loadingMessage}
        duration={2000}
        onIonLoadingDidDismiss={() => setState({ ...state, showLoading: false })}
      />
      <IonFab ref={ionFabRef} slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon name="share" />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton color="vimeo" onClick={() => openSocial('Vimeo')}>
            <IonIcon name="logo-vimeo" />
          </IonFabButton>
          <IonFabButton color="google" onClick={() => openSocial('Google+')}>
            <IonIcon name="logo-googleplus" />
          </IonFabButton>
          <IonFabButton color="twitter" onClick={() => openSocial('Twitter')}>
            <IonIcon name="logo-twitter" />
          </IonFabButton>
          <IonFabButton color="facebook" onClick={() => openSocial('Facebook')}>
            <IonIcon name="logo-facebook" />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  allFiltered: selectors.sessions.allFiltered(state.sessions),
  favoritesFiltered: selectors.sessions.favoritesFiltered(state.sessions),
  searchText: state.sessions.searchText,
  favoriteSessions: state.sessions.favoriteSessions,
  filteredTracks: state.sessions.trackFilters,
  allTracks: selectors.sessions.allTracks(state.sessions)
});

const mapDispatchToProps = {
  updateLocations: () => actions.locations.updateLocations(),
  updateSessions: () => actions.sessions.updateSessions(),
  updateSpeakers: () => actions.speakers.updateSpeakers(),
  setSearchText: (searchText: string) => actions.sessions.setSearchText(searchText),
  updateTrackFilters: (trackList: string[]) => actions.sessions.updateTrackFilters(trackList)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulePage);
