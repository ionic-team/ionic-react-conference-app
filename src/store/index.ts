import { StateType } from 'typesafe-actions';
import rootReducer from './root-reducer';

import * as sessionsSelectors from './sessions/selectors';
import * as locationsSelectors from './locations/selectors';

import * as sessionsActions from './sessions/actions';
import * as locationsActions from './locations/actions';
import * as speakerActions from './speakers/actions';
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
  speakers: speakerActions,
  user: userActions
}

export type RootState = StateType<typeof rootReducer>;
