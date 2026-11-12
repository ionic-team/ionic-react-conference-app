import { IonRouterContext } from '@ionic/react';
import type React from 'react';
import { useEffect, useContext, useRef } from 'react';

import type { setIsLoggedIn, setUsername } from '../data/user/user.actions';

interface RedirectToLoginProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setUsername }) => {
  const ionRouterContext = useContext(IonRouterContext);
  const hasRedirected = useRef(false);
  useEffect(() => {
    if (hasRedirected.current) {
      return;
    }
    hasRedirected.current = true;
    setIsLoggedIn(false);
    setUsername(undefined);
    ionRouterContext.push('/tabs/schedule');
  }, [ionRouterContext, setIsLoggedIn, setUsername]);
  return null;
};

export default RedirectToLogin;
