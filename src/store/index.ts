import { StateType } from 'typesafe-actions';
import { Middleware } from 'redux';

import rootReducer from './root-reducer';

import { fetchLocationsMiddleware } from './locations/middleware';
import { fetchSessionsMiddleware } from './sessions/middleware';
import { fetchSpeakersMiddleware } from './speakers/middleware';

import * as locationsSelectors from './locations/selectors';
import * as sessionsSelectors from './sessions/selectors';

import * as locationsActions from './locations/actions';
import * as sessionsActions from './sessions/actions';
import * as speakersActions from './speakers/actions';
import * as userActions from './user/actions';

export { default } from './store';
export { default as rootReducer } from './root-reducer';

export const selectors = {
  sessions: sessionsSelectors,
  locations: locationsSelectors
};

export const actions = {
  sessions: sessionsActions,
  locations: locationsActions,
  speakers: speakersActions,
  user: userActions
}

export const middlewares: Middleware[] = [
  fetchLocationsMiddleware,
  fetchSessionsMiddleware,
  fetchSpeakersMiddleware
]

export type RootState = StateType<typeof rootReducer>;
