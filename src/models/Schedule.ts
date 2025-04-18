export interface Schedule {
  date: string;
  groups: ScheduleGroup[];
}

export interface ScheduleGroup {
  time: string;
  sessions: Session[];
}

export interface Session {
  id: number;
  timeStart: string;
  timeEnd: string;
  name: string;
  location: string;
  description: string;
  speakerNames: string[];
  tracks: string[];
}
