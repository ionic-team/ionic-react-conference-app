
import * as users from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { User } from "./types";

const defaultState: User = {
  pictureLocation: null,
  userName: null,
  isAuthenticated: false,
  hasSeenTutorial: true
};

export type UserAction = ActionType<typeof users>;

export default (state = defaultState, action: UserAction): User => {
  switch (action.type) {
    case getType(users.logIn):
    case getType(users.logOut):
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case getType(users.sawTutorial):
      return {
        ...state,
        hasSeenTutorial: action.payload
      };
    case getType(users.updateUserPicture):
      return {
        ...state,
        pictureLocation: action.payload
      };
    case getType(users.setUsername):
      return {
        ...state,
        userName: action.payload
      }
    default:
      return state;
  }
};

