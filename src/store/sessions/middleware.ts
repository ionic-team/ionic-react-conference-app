import * as sessions from './actions';
import { Session, SessionState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchSessionsMiddleware: Middleware<{}, SessionState> = ({ getState }) => next => async (action: ActionType<typeof sessions>) => {
  next(action);

  if (action.type == getType(sessions.updateSessions)) {
    next(sessions.fetchSessions.request());

    try {
      const response = await fetch('/data/sessions.json');
      const sessionList: Session[] = await response.json();
      next(sessions.fetchSessions.success(sessionList));
    } catch (e) {
      next(sessions.fetchSessions.failure(e));
    }
  };
};
