import { connect } from 'react-redux';
import {
  searchSessionsByName,
  addFavoriteSession,
  removeFavoriteSession
} from '../actions';
import Schedule from '../components/Schedule';

const getVisibleSessions = (sessions, trackFilters, searchText) => {
  let filteredSessions = sessions;

  if (searchText) {
    filteredSessions = filteredSessions.filter(session => session.indexOf(searchText !== -1));
  }

  if (trackFilters.length > 0) {
    filteredSessions = filteredSessions.filter(session => (
      session.tracks.some(sessionTrackName => (
        trackFilters.some(trackName => trackName === sessionTrackName)
      ))
    ));
  }

  return filteredSessions;
};

const mapStateToProps = (state) => {
  return {
    filteredSessions: getVisibleSessions(state.sessions, state.trackFilters, state.searchText),
    allSessions: state.sessions,
    filterFavorites: state.filterFavorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchSessionsByName: (text) => dispatch(searchSessionsByName(text)),
    addFavoriteSession: (sessionId) => dispatch(addFavoriteSession(sessionId)),
    removeFavoriteSession: (sessionId) => dispatch(removeFavoriteSession(sessionId)),
  }
}

const VisibleSessionList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule)

export default VisibleSessionList
