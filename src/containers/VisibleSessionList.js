import { connect } from 'react-redux'
import SessionList from '../components/SessionList'

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

const mapStateToProps = state => {
  return {
    sessions: getVisibleSessions(state.sessions, state.trackFilters, state.searchText)
  }
}

const VisibleSessionList = connect(
  mapStateToProps
)(SessionList)

export default VisibleSessionList
