import { combineReducers } from 'redux'
import sessions from './sessions'
import speakers from './speakers'
import locations from './locations'
import user from './user'
import tutorial from './tutorial';

const conferenceApp = combineReducers({
  sessions,
  speakers,
  locations,
  user,
  tutorial
});

export default conferenceApp;
