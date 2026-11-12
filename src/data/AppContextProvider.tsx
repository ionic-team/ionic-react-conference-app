import type { PropsWithChildren } from 'react';
import React, { useReducer } from 'react';

import { AppContext } from './AppContext';
import { initialState, reducers } from './state';

export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
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
