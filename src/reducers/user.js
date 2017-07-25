import {
  SIGN_UP_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
  UPDATE_USER_PICTURE
} from '../actions'

const defaultState = {
  pictureLocation: null,
  userName: null,
  loggedIn: false
};

const user = (state = defaultState, action) => {
  switch (action.type) {
  case SIGN_UP_USER:
    return {
      ...state,
      userName: action.userName
    };
  case LOG_IN_USER:
    return {
      ...state,
      userName: action.userName
    };
  case LOG_OUT_USER:
    return defaultState
  case UPDATE_USER_PICTURE:
    return {
      ...state,
      pictureLocation: action.pictureLocation
    };
  default:
    return state;
  }
};

export default user;
