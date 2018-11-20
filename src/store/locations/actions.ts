import { createAsyncAction } from 'typesafe-actions';
import { Location } from './types';

export const fetchLocations = createAsyncAction(
  'locations/FETCH_REQUEST',
  'locations/FETCH_SUCCESS',
  'locations/FETCH_FAILURE'
)<void, Location[], Error>();