import { Location } from '../../models/Location';
import { Speaker } from '../../models/Speaker';
import { Schedule } from '../../models/Schedule';
export interface ConfState {
  schedule: Schedule;
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
}
