import {
  UPDATE_SEEN_TUTORIAL
} from '../actions'

const defaultState = {
  hasSeenTutorial: false,
};

const user = (state = defaultState, action) => {
  switch (action.type) {
  case UPDATE_SEEN_TUTORIAL:
    return {
      ...state,
      hasSeenTutorial: action.hasSeenTutorial
    };
  default:
    return state;
  }
};

export default user;
