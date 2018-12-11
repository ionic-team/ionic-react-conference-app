import { LocationState, Location } from './types';

export function mapCenter(state: LocationState): Location {
  const item = state.locations.filter(l => l.id === state.mapCenterId)[0];

  if (item == null) {
    return {
      id: 1,
      name: "Map Center",
      lat: 43.071584,
      lng: -89.380120
    };
  }

  return item;
}

export function allLocations(state: LocationState) {
  return state.locations.filter(l => l.id !== state.mapCenterId)
}
