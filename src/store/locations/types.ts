export interface Location {
  id: number;
  name?: string;
  lat: number;
  lng: number;
}

export interface LocationState {
  mapCenterId: number
  locations: Location[]
}