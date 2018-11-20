import * as speakers from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { SpeakerState } from "./types";

const defaultState: SpeakerState = {
  speakers: []
}

export type SpeakerAction = ActionType<typeof speakers>;

export default (state = defaultState, action: SpeakerAction): SpeakerState => {
  switch (action.type) {
    case getType(speakers.fetchSpeakers.success):
      return {
        ...state,
        speakers: action.payload
      }
    default:
      return state;
  }
};

