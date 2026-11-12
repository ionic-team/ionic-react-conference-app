import { IonRouterContext } from '@ionic/react';
import type React from 'react';
import { useEffect, useContext } from 'react';

import type { setIsLoggedIn, setUsername } from '../data/user/user.actions';

interface RedirectToLoginProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setUsername }) => {
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setUsername(undefined);
    ionRouterContext.push('/tabs/schedule');
  }, [setIsLoggedIn, setUsername]);
  return null;
};

export default RedirectToLogin;
