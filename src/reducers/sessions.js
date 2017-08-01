import {
  SEARCH_TEXT,
  ADD_TRACK_FILTER,
  REMOVE_TRACK_FILTER,
  REFRESH_TRACK_FILTERS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UPDATE_FAVORITE_FILTER,
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
    const updatedTrackFilters = state.trackFilters
      .concat(action.trackName)
      .reduce((updatedList, item) => {
        if (!updatedList.includes(item)) {
          updatedList.push(item);
        }
        return updatedList;
      }, [])
    return {
      ...state,
      trackFilters: updatedTrackFilters
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
    const updatedFavoriteSessions = state.favoriteSessions
      .concat(action.sessionId)
      .reduce((updatedList, item) => {
        if (!updatedList.includes(item)) {
          updatedList.push(item);
        }
        return updatedList;
      }, [])
    return {
      ...state,
      favoriteSessions: updatedFavoriteSessions
    };
  case REMOVE_FAVORITE:
    return {
      ...state,
      favoriteSessions: state.favoriteSessions.filter(sid => sid !== action.sessionId)
    };
  case UPDATE_FAVORITE_FILTER:
    return {
      ...state,
      filterFavorites: action.filterFavorites
    };
  default:
    return state;
  }
};

export default sessions;
