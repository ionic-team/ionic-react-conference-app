export interface Session {
    id: number,
    dateTimeStart: string,
    dateTimeEnd: string,
    name: string,
    location: string,
    description: string,
    speakerIds: number[],
    tracks: string[]
  }
  
  export interface SessionState {
    searchText: string;
    trackFilters: string[];
    sessions: Session[];
    favoriteSessions: number[];
  }
  
  export interface SessionGroup {
    startTime: string,
    sessions: Session[]
  }
  