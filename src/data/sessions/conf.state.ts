import type { Location } from '../../models/Location';
import type { Schedule, Session } from '../../models/Schedule';
import type { Speaker } from '../../models/Speaker';

export interface ConfState {
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}
