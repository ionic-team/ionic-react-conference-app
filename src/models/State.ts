import { Session } from './Session';
import { Speaker } from './Speaker';
import { Location } from './Location';

export interface State {
  sessions: Session[];
  speakers: Speaker[];
  locations: Location[];
  allTracks: string[];
  filteredTracks: string[];
  favorites: number[];
  isLoading: boolean;
  isError: boolean;
  error?: any;
  searchText?: string;
  mapCenterId: number;
  hasLoggedIn: boolean;
  hasSeenTutorial: boolean;
  username?: string;
}