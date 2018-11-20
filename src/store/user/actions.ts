import { createAction } from 'typesafe-actions';

export const sawTutorial = createAction('user/SAW_TUTORIAL', resolve =>
  () => resolve(true)
);

export const logIn = createAction('user/LOG_IN', resolve =>
  () => resolve(true)
);

export const logOut = createAction('user/LOG_OUT', resolve =>
  () => resolve(false)
);

export const updateUserPicture = createAction('user/UPDATE_PICTURE', resolve =>
  (pictureLocation: string) => resolve(pictureLocation)
);
