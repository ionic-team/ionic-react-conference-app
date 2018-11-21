import { parse as parseDate } from 'date-fns';
import { SessionState, Session } from './types';

export function conferenceStart(state: SessionState) {
  const firstSession = state.sessions
    .concat()
    .sort((a, b) => (
      parseDate(a.dateTimeStart).valueOf() - parseDate(b.dateTimeStart).valueOf()
    ))[0];
  return firstSession ? firstSession.dateTimeStart : null;
}

export function allTracks(state: SessionState) {
  return state.sessions
    .reduce((all, session) => all.concat(session.tracks), <string[]>[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();
}

export function allFiltered(state: SessionState) {
  let searchSessions = searchText(state.searchText);
  let searchTracks = filterByTrack(state.trackFilters);

  return state.sessions
    .filter(searchSessions)
    .filter(searchTracks);
}

export function favoritesFiltered(state: SessionState) {
  let searchSessions = searchText(state.searchText);
  let searchTracks = filterByTrack(state.trackFilters);

  function isFavorite(session: Session) {
    return state.favoriteSessions.indexOf(session.id) !== -1;
  }

  return state.sessions
    .filter(isFavorite)
    .filter(searchSessions)
    .filter(searchTracks);
}

function searchText(searchText: string) {
  if (!searchText) {
    return () => true;
  }
  const lowerSearchText = searchText.toLowerCase();
  return (session: Session) => session.name.toLowerCase().indexOf(lowerSearchText) !== -1;
}

function filterByTrack(trackFilters: string[]) {
  if (trackFilters.length === 0) {
    return () => true;
  }
  return (session: Session) => (
    session.tracks.some(sessionTrackName => (
      trackFilters.some(trackName => trackName === sessionTrackName)
    ))
  );
}
