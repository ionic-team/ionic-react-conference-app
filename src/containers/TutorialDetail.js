import { connect } from 'react-redux'
import {
  updateSeenTutorial
} from '../actions';

const mapStateToProps = (state) => {
  return {
    hasSeenTutorial: state.tutorial.hasSeenTutorial
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePicture: (hasSeenTutorial) => dispatch(updateSeenTutorial(hasSeenTutorial)),
  }
}

const TutorialDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({children, ...props}) => children(props)
);

export default TutorialDetail;
