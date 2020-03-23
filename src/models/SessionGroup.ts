import { Schedule } from './Schedule';
export interface SessionGroup {
  startTime: string;
  sessions: Schedule[];
}
