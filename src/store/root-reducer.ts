import { combineReducers } from 'redux';

import locations from './locations/reducer';
import sessions from './sessions/reducer';
import speakers from './speakers/reducer';
import user from './user/reducer';

const rootReducer = combineReducers({
  locations,
  sessions,
  speakers,
  user
});


export default rootReducer;
