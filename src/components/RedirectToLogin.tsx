import React, { useEffect, useContext } from 'react';
import { IonRouterContext } from '@ionic/react';

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
  setUsername: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({
  setIsLoggedIn,
  setUsername,
}) => {
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setUsername(undefined);
    ionRouterContext.push('/tabs/schedule');
  }, [setIsLoggedIn, setUsername]);
  return null;
};

export default RedirectToLogin;
