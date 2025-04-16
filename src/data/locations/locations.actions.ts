import { DispatchObject } from '../../util/types';
import { Location } from '../../models/Location';

export const SET_LOCATIONS = 'SET_LOCATIONS';

export const setLocations = (locations: Location[]): DispatchObject => ({
  type: SET_LOCATIONS,
  payload: locations,
});

export const loadLocations =
  () => async (dispatch: (action: DispatchObject) => void) => {
    try {
      const response = await fetch('/assets/data/locations.json');
      const locations = await response.json();
      dispatch(setLocations(locations));
    } catch (error) {
      console.error('Error loading locations:', error);
      // Set default locations if data cannot be loaded
      dispatch(
        setLocations([
          {
            id: 1,
            name: 'Monona Terrace Convention Center',
            lat: 43.071584,
            lng: -89.38012,
            center: true,
          },
        ])
      );
    }
  };
