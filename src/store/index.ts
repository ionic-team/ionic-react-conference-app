import { StateType } from 'typesafe-actions';
import rootReducer from './root-reducer';

export { default } from './store';
export { default as rootReducer } from './root-reducer';

export type RootState = StateType<typeof rootReducer>;
