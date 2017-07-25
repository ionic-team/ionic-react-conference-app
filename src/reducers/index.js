import { combineReducers } from 'redux'
import sessions from './sessions'
import speakers from './speakers'
import locations from './locations'

const conferenceApp = combineReducers({
  sessions,
  speakers,
  locations
});

export default conferenceApp;
