import { combineReducers } from 'redux'
import sessions from './sessions'
import speakers from './speakers'
import locations from './locations'
import user from './user'

const conferenceApp = combineReducers({
  sessions,
  speakers,
  locations,
  user
});

export default conferenceApp;
