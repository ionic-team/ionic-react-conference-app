import { combineReducers } from './combineReducers';
import { sessionsReducer } from './sessions/sessions.reducer';
import { userReducer } from './user/user.reducer';
import { locationsReducer } from './locations/locations.reducer';

export const initialState: AppState = {
  data: {
    schedule: { groups: [] } as any,
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false,
    menuEnabled: true,
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: false,
    loading: false,
  },
  locations: {
    locations: [],
  },
};

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer,
  locations: locationsReducer,
});

export type AppState = ReturnType<typeof reducers>;
