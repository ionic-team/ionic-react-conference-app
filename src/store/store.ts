import { createStore } from 'redux';

import rootReducer from './root-reducer';

function configureStore(initialState?: {}) {
  return createStore(rootReducer, initialState!);
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
