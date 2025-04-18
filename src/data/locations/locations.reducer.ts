import { LocationState, initialState } from '../../models/Location';
import { SET_LOCATIONS } from './locations.actions';

export const locationsReducer = (
  state: LocationState = initialState,
  action: { type: string; payload: any }
): LocationState => {
  switch (action.type) {
    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    default:
      return state;
  }
};
