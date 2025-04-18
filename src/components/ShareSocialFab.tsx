import {
  IonLoading,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
} from '@ionic/react';
import {
  shareSocial,
  logoVimeo,
  logoInstagram,
  logoTwitter,
  logoFacebook,
} from 'ionicons/icons';
import React, { useState } from 'react';

const ShareSocialFab: React.FC = () => {
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const openSocial = (network: string) => {
    setLoadingMessage(`Posting to ${network}`);
    setShowLoading(true);
  };

  return (
    <>
      <IonLoading
        isOpen={showLoading}
        message={loadingMessage}
        duration={2000}
        spinner="crescent"
        onDidDismiss={() => setShowLoading(false)}
      />
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={shareSocial} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton color="vimeo" onClick={() => openSocial('Vimeo')}>
            <IonIcon icon={logoVimeo} />
          </IonFabButton>
          <IonFabButton
            color="instagram"
            onClick={() => openSocial('Instagram')}
          >
            <IonIcon icon={logoInstagram} />
          </IonFabButton>
          <IonFabButton color="twitter" onClick={() => openSocial('Twitter')}>
            <IonIcon icon={logoTwitter} />
          </IonFabButton>
          <IonFabButton color="facebook" onClick={() => openSocial('Facebook')}>
            <IonIcon icon={logoFacebook} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  );
};

export default ShareSocialFab;
