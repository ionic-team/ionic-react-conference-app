import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    sessions: state.sessions.sessions,
    speakers: state.speakers
  }
}

const VisibleSessionList = connect(
  mapStateToProps,
)(
  ({children, ...props}) => children(props)
);

export default VisibleSessionList
