export const SEARCH_TEXT = 'SEARCH_TEXT';
export const ADD_TRACK_FILTER = 'ADD_TRACK_FILTER';
export const REMOVE_TRACK_FILTER = 'REMOVE_TRACK_FILTER';
export const REFRESH_TRACK_FILTERS = 'REFRESH_TRACK_FILTERS';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const UPDATE_FAVORITE_FILTER = 'UPDATE_FAVORITE_FILTER';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOG_IN_USER = 'LOG_IN_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const UPDATE_USER_PICTURE = 'UPDATE_USER_PICTURE';

export const UPDATE_SEEN_TUTORIAL = 'HAS_SEEN_TUTORIAL';

export const searchSessionsByName = (text) => (
  {
    type: SEARCH_TEXT,
    text
  }
);

export const addTrackFilter = (trackName) => (
  {
    type: ADD_TRACK_FILTER,
    trackName
  }
);

export const removeTrackFilter = (trackName) => (
  {
    type: REMOVE_TRACK_FILTER,
    trackName
  }
);

export const refreshTrackFilters = (trackNames) => (
  {
    type: REFRESH_TRACK_FILTERS,
    trackFilters: trackNames.split()
  }
);

export const addFavoriteSession = (sessionId) => (
  {
    type: ADD_FAVORITE,
    sessionId
  }
);

export const removeFavoriteSession = (sessionId) => (
  {
    type: REMOVE_FAVORITE,
    sessionId
  }
);

export const updateFavoriteFilter = (filterFavorites) => (
  {
    type: UPDATE_FAVORITE_FILTER,
    filterFavorites
  }
);

export const signUpUser = (userName) => (
  {
    type: SIGN_UP_USER,
    userName
  }
)

export const logInUser = (userName) => (
  {
    type: LOG_IN_USER,
    userName
  }
);

export const logOutUser = (userName) => (
  {
    type: LOG_OUT_USER,
    userName
  }
);

export const updatePicture = (userName, pictureLocation) => (
  {
    type: UPDATE_USER_PICTURE,
    userName,
    pictureLocation
  }
);

export const updateSeenTutorial = (hasSeenTutorial) => (
  {
    type: UPDATE_SEEN_TUTORIAL,
    hasSeenTutorial
  }
);
