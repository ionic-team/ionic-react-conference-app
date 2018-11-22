import { LocationState } from './types';

export function mapCenter(state: LocationState) {
  return state.locations.filter(l => l.id === state.mapCenterId)[0];
}

export function allLocations(state: LocationState) {
  return state.locations.filter(l => l.id !== state.mapCenterId)
}
