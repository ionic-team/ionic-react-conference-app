import { Session } from './Schedule';
export interface SessionGroup {
  startTime: string;
  sessions: Session[];
}
