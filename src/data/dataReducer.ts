import { State } from '../models/State';

export const initialState: State = {
  sessions: [],
  favorites: [],
  speakers: [],
  locations: [],
  allTracks: [],
  filteredTracks: [],
  isLoading: false,
  isError: false,
  mapCenterId: 1,
  hasLoggedIn: false,
  hasSeenTutorial: false
};

export const dataReducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'fetch-init': {
      return { ...state, isLoading: true };
    }
    case 'fetch-success': {
      return { ...state, isLoading: false };
    }
    case 'fetch-error': {
      return { ...state, isLoading: false, isError: true, error: action.payload };
    }
    case 'set-data': {
      return { ...state, ...action.payload };
    }
    case 'add-favorite': {
      return { ...state, favorites: [...state.favorites, action.payload] };
    }
    case 'remove-favorite': {
      return { ...state, favorites: [...state.favorites.filter(x => x !== action.payload)] };
    }
    case 'update-filtered-tracks': {
      return { ...state, filteredTracks: action.payload };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.payload };
    }
    case 'set-islogged-in': {
      return { ...state, hasLoggedIn: action.payload };
    }
    case 'set-has-seen-tutorial': {
      return { ...state, hasSeenTutorial: action.payload };
    }
    case 'set-username': {
      return { ...state, username: action.payload };
    }
  }
  return state;
}