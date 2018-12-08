import { createAction, createAsyncAction } from 'typesafe-actions';
import { Session } from './types';

export const fetchSessions = createAsyncAction(
  'sessions/FETCH_REQUEST',
  'sessions/FETCH_SUCCESS',
  'sessions/FETCH_FAILURE'
)<void, Session[], Error>();

export const updateSessions = createAction('sessions/UPDATE_SESSIONS', resolve =>
  () => resolve()
);

export const setSearchText = createAction('sessions/SET_SEARCH_TEXT', resolve =>
  (searchText: string) => resolve(searchText)
);

export const addTrackFilter = createAction('sessions/ADD_TRACK_FILTER', resolve =>
  (trackName: string) => resolve(trackName)
);

export const removeTrackFilter = createAction('sessions/REMOVE_TRACK_FILTER', resolve =>
  (trackName: string) => resolve(trackName)
);

export const updateTrackFilters = createAction('sessions/UPDATE_TRACK_FILTERS', resolve =>
  (trackNames: string[]) => resolve(trackNames)
);

export const addFavorite = createAction('sessions/ADD_FAVORITE', resolve =>
  (sessionId: number) => resolve(sessionId)
);

export const removeFavorite = createAction('sessions/REMOVE_FAVORITE', resolve =>
  (sessionId: number) => resolve(sessionId)
);

export const updateFavoriteFilter = createAction('sessions/UPDATE_FAVORITE_FILTER', resolve =>
  (sessionIds: number[]) => resolve(sessionIds)
);
