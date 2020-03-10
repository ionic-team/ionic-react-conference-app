import React, { useState } from 'react';
import { Session } from '../models/Session';
import { Speaker } from '../models/Speaker';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList, IonActionSheet } from '@ionic/react';
import { ActionSheetButton } from '@ionic/core';

interface SpeakerItemProps {
  speaker: Speaker;
  sessions: Session[];
}

const SpeakerItem: React.FC<SpeakerItemProps> = ({ speaker, sessions }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader] = useState('');

  // function openSpeakerShare(speaker: Speaker) {
  //   setActionSheetButtons([
  //     {
  //       text: 'Copy Link',
  //       handler: () => {
  //         console.log('Copy Link clicked');
  //       }
  //     },
  //     {
  //       text: 'Share via ...',
  //       handler: () => {
  //         console.log('Share via clicked');
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }
  //   ]);
  //   setActionSheetHeader(`Share ${speaker.name}`);
  //   setShowActionSheet(true);
  // }

  // function openContact(speaker: Speaker) {
  //   setActionSheetButtons([
  //     {
  //       text: `Email ( ${speaker.email} )`,
  //       handler: () => {
  //         window.open('mailto:' + speaker.email);
  //       }
  //     },
  //     {
  //       text: `Call ( ${speaker.phone} )`,
  //       handler: () => {
  //         window.open('tel:' + speaker.phone);
  //       }
  //     }
  //   ]);
  //   setActionSheetHeader(`Share ${speaker.name}`);
  //   setShowActionSheet(true);
  // }

  return (
    <>
      <IonCard className="speaker-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="speaker-item" routerLink={`/tabs/speakers/${speaker.id}`}>
            <IonAvatar slot="start">
              <img src={process.env.PUBLIC_URL + speaker.profilePic} alt="Speaker profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{speaker.name}</h2>
              <p>{speaker.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {sessions.map(session => (
              <IonItem detail={false} routerLink={`/tabs/speakers/sessions/${session.id}`} key={session.name}>
                <IonLabel>
                  <h3>{session.name}</h3>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem detail={false} routerLink={`/tabs/speakers/${speaker.id}`}>
              <IonLabel>
                <h3>About {speaker.name}</h3>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </>
  );
};

export default SpeakerItem;