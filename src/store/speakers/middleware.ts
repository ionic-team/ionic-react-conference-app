import * as locations from './actions';
import { Speaker, SpeakerState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchSpeakersMiddleware: Middleware<{}, SpeakerState> = ({ getState }) => next => async (action: ActionType<typeof locations>) => {
  next(action);

  if (action.type != getType(locations.updateSpeakers)) {
    return;
  }

  next(locations.fetchSpeakers.request());
  try {
    const response = await fetch('/data/speakers.json');
    const sessionList: Speaker[] = await response.json();
    next(locations.fetchSpeakers.success(sessionList));
  } catch (e) {
    next(locations.fetchSpeakers.failure(e));
  }
};
