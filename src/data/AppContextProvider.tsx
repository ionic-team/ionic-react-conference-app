import type { PropsWithChildren } from 'react';
import React, { useReducer } from 'react';

import { AppContext } from './AppContext';
import type { AppState } from './state';
import { initialState as defaultInitialState, reducers } from './state';

interface AppContextProviderProps {
  // Lets tests render with preset state; the app always starts from the default.
  initialState?: AppState;
}

export const AppContextProvider: React.FC<PropsWithChildren<AppContextProviderProps>> = ({
  children,
  initialState = defaultInitialState,
}) => {
  const [store, dispatch] = useReducer(reducers, initialState);

  return (
    <AppContext.Provider
      value={{
        state: store,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
