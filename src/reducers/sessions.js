import {
  SEARCH_TEXT,
  ADD_TRACK_FILTER,
  REMOVE_TRACK_FILTER,
  REFRESH_TRACK_FILTERS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_FAVORITE_FILTER,
  REMOVE_FAVORITE_FILTER
} from '../actions'


const defaultState = {
  searchText: '',
  trackFilters: [],
  sessions: [],
  favoriteSessions: [],
  filterFavorites: false
};

const sessions = (state = defaultState, action) => {
  switch (action.type) {
  case SEARCH_TEXT:
    return {
      ...state,
      searchText: action.text
    };
  case ADD_TRACK_FILTER:
    return {
      ...state,
      trackFilters: state.trackFilters.concat(action.trackName)
    };
  case REMOVE_TRACK_FILTER:
    return {
      ...state,
      trackFilters: state.trackFilters.filter(tn => tn !== action.trackName)
    };
  case REFRESH_TRACK_FILTERS:
    return {
      ...state,
      trackFilters: action.trackNames
    };
  case ADD_FAVORITE:
    return {
      ...state,
      favoriteSessions: state.favoriteSessions.concat(action.sessionId)
    };
  case REMOVE_FAVORITE:
    return {
      ...state,
      favoriteSessions: state.favoriteSessions.filter(sid => sid !== action.sessionId)
    };
  case ADD_FAVORITE_FILTER:
    return {
      ...state,
      filterFavorites: true
    };
  case REMOVE_FAVORITE_FILTER:
    return {
      ...state,
      filterFavorites: false
    };
  default:
    return state;
  }
};

export default sessions;
