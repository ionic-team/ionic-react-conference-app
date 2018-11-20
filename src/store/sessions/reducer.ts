import * as sessions from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { SessionState } from './types';

const defaultState: SessionState = {
  searchText: '',
  trackFilters: [],
  sessions: [],
  favoriteSessions: []
}

export type SessionAction = ActionType<typeof sessions>;

export default (state = defaultState, action: SessionAction): SessionState => {
  switch (action.type) {
  case getType(sessions.setSearchText):
    return {
      ...state,
      searchText: action.payload
    };
  case getType(sessions.addTrackFilter):
    const updatedTrackFilters = state.trackFilters
      .concat(action.payload)
      .reduce((updatedList, item) => {
        if (!updatedList.indexOf(item)) {
          updatedList.push(item);
        }
        return updatedList;
      }, <string[]>[]);
    return {
      ...state,
    };
  case getType(sessions.removeTrackFilter):
    return {
      ...state,
      trackFilters: state.trackFilters.filter(tn => tn !== action.payload)
    };
  case getType(sessions.updateTrackFilters):
    return {
      ...state,
      trackFilters: action.payload
    };
  case getType(sessions.addFavorite):
    const updatedFavoriteSessions = state.favoriteSessions
      .concat(action.payload)
      .reduce((updatedList, item) => {
        if (updatedList.indexOf(item) !== -1) {
          updatedList.push(item);
        }
        return updatedList;
      }, <number[]>[])
    return {
      ...state,
      favoriteSessions: updatedFavoriteSessions
    };
  case getType(sessions.removeFavorite):
    return {
      ...state,
      favoriteSessions: state.favoriteSessions.filter(sid => sid !== action.payload)
    };
  case getType(sessions.updateFavoriteFilter):
    return {
      ...state,
      favoriteSessions: action.payload
    };
  case getType(sessions.fetchSessions.success):
    return {
      ...state,
      sessions: action.payload
    }
  default:
    return state;
  }
}



