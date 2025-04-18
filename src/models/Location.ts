export interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  center?: boolean;
}

export interface LocationState {
  locations: Location[];
}

export const initialState: LocationState = {
  locations: [],
};
