import type React from 'react';
import { createContext } from 'react';

import type { AppState } from './state';
import { initialState } from './state';

export interface AppContextState {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const AppContext = createContext<AppContextState>({
  state: initialState,
  dispatch: () => undefined,
});
