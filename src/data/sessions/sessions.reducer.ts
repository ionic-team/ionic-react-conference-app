import type { ConfState } from './conf.state';
import type { SessionsActions } from './sessions.actions';

export const sessionsReducer = (state: ConfState, action: SessionsActions): ConfState => {
  switch (action.type) {
    case 'set-conf-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-conf-data': {
      return { ...state, ...action.data };
    }
    case 'add-favorite': {
      return { ...state, favorites: [...state.favorites, action.sessionId] };
    }
    case 'remove-favorite': {
      return {
        ...state,
        favorites: [...state.favorites.filter((x) => x !== action.sessionId)],
      };
    }
    case 'update-filtered-tracks': {
      return { ...state, filteredTracks: action.filteredTracks };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.searchText };
    }
    case 'set-menu-enabled': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
};
