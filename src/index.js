import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import conferenceApp from './reducers';
import App from './App';
import { loadState, saveState } from './utils/loadState';

import * as locations from './data/locations.json';
import * as sessions from './data/sessions.json';
import * as speakers from './data/speakers.json';

let store = createStore(conferenceApp, {
    ...loadState(),
    locations: locations,
    sessions: {
      searchText: '',
      trackFilters: [],
      sessions,
      favoriteSessions: [],
      filterFavorites: 'all'
    },
    speakers: speakers
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    tutorial: store.getState().tutorial
  });
})

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
