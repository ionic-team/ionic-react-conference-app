import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}

interface RedirectToLoginProps extends OwnProps {
  setIsLoggedIn: Function;
  setUsername: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setUsername, history }) => {
  //const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setUsername(undefined);
    history.push('/tabs/schedule')
  }, [setIsLoggedIn, setUsername]);
  return null;
};

export default RedirectToLogin;
