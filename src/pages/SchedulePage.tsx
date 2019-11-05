import React, { useState, useRef } from 'react';
import { IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader } from '@ionic/react';
import { connect } from '../data/connect';
import { options } from 'ionicons/icons';
import { SessionList } from '../components/SessionList';
import SessionListFilter from '../components/SessionListFilter';
import './SchedulePage.css'
import * as selectors from '../data/selectors';
import { setSearchText } from '../data/actions';
import ShareSocialFab from '../components/ShareSocialFab';
import { SessionGroup } from '../models/SessionGroup';

interface OwnProps { }

interface StateProps {
  sessionGroups: SessionGroup[];
  favoriteGroups: SessionGroup[];
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type SchedulePageProps = OwnProps & StateProps & DispatchProps;

const SchedulePage: React.FC<SchedulePageProps> = ({ favoriteGroups, sessionGroups, setSearchText }) => {
  const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const [showFilterModal, setShowFilterModal] = useState(false); 
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);  
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const doRefresh = () => { 
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  }; 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonSegment onIonChange={(e) => setSegment(e.detail.value as any)}>
            <IonSegmentButton value="all" checked={segment === 'all'}>
              All
            </IonSegmentButton>
            <IonSegmentButton value="favorites" checked={segment === 'favorites'}>
              Favorites
            </IonSegmentButton>
          </IonSegment>

          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilterModal(true)}>
              <IonIcon icon={options} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar color="primary">
          <IonSearchbar
            placeholder="Search"
            onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />

        <SessionList
          sessionGroups={sessionGroups}
          listType={segment}
          hide={segment === 'favorites'}
        />
        <SessionList
          sessionGroups={favoriteGroups}
          listType={segment}
          hide={segment === 'all'}
        />
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      >
        <SessionListFilter
          onDismissModal={() => setShowFilterModal(false)}
        />
      </IonModal>

      <ShareSocialFab />
      
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => {
    return {
      sessionGroups: selectors.getGroupedSessions(state),
      favoriteGroups: selectors.getGroupedFavorites(state),
      allTracks: state.allTracks,
      filteredTracks: state.filteredTracks
    }
  },
  mapDispatchToProps: {
    setSearchText
  },
  component: SchedulePage
});