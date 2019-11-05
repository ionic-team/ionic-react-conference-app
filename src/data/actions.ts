import { getData, setIsLoggedInData, setUsernameData, setHasSeenTutorialData } from './dataApi';

export const loadData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'fetch-init' });
  const data = await getData();
  dispatch({ type: 'set-data', payload: data });
  dispatch({ type: 'fetch-success' });
}

export const addFavorite = (sessionId: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'add-favorite', payload: sessionId });
}

export const removeFavorite = (sessionId: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'remove-favorite', payload: sessionId });
}

export const updateFilteredTracks = (filteredTracks: string[]) => async (dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'update-filtered-tracks', payload: filteredTracks });
}

export const setSearchText = (searchText?: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'set-search-text', payload: searchText });
}

export const setIsLoggedIn = (isLoggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(isLoggedIn);
  dispatch({ type: 'set-islogged-in', payload: isLoggedIn });
}

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setHasSeenTutorialData(hasSeenTutorial);
  dispatch({ type: 'set-has-seen-tutorial', payload: hasSeenTutorial });
}

export const setUsername = (username?: string) => async (dispatch: React.Dispatch<any>) => {
  await setUsernameData(username);
  dispatch({ type: 'set-username', payload: username });
}
