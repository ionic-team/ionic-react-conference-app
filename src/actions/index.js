export const SEARCH_TEXT = 'SEARCH_TEXT';
export const ADD_TRACK_FILTER = 'ADD_TRACK_FILTER';
export const REMOVE_TRACK_FILTER = 'REMOVE_TRACK_FILTER';
export const REFRESH_TRACK_FILTERS = 'REFRESH_TRACK_FILTERS';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const searchSessionsByName = (text) => (
  {
    type: SEARCH_TEXT,
    text
  }
);

export const addTrackFilter = (trackName) => (
  {
    type: ADD_TRACK_FILTER,
    trackName
  }
);

export const removeTrackFilter = (trackName) => (
  {
    type: REMOVE_TRACK_FILTER,
    trackName
  }
);

export const refreshTrackFilters = (trackNames) => (
  {
    type: REFRESH_TRACK_FILTERS,
    trackFilters: trackNames.split()
  }
);

export const addFavoriteSession = (sessionId) => (
  {
    type: ADD_FAVORITE,
    sessionId
  }
);

export const removeFavoriteSession = (sessionId) => (
  {
    type: REMOVE_FAVORITE,
    sessionId
  }
);
