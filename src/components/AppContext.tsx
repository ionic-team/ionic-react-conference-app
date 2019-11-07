import React, { createContext, useReducer } from 'react';
import { dataReducer, initialState } from '../data/dataReducer';

export interface AppContextState {
  state?: any;
  dispatch: React.Dispatch<any>;
}

export const AppContext = createContext<AppContextState>({
  dispatch: () => undefined
});

export const AppContextProvider: React.FC = (props => {

  const [store, dispatch] = useReducer(dataReducer, initialState);

  return (
    <AppContext.Provider value={{
      state: store,
      dispatch
    }}>
      {props.children}
    </AppContext.Provider>
  )
});