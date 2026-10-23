import type { ActionType } from '../../util/types';
import { getUserData, setIsLoggedInData, setUsernameData, setHasSeenTutorialData } from '../dataApi';

import type { UserState } from './user.state';

export const loadUserData =
  () =>
  async (dispatch: React.Dispatch<any>): Promise<void> => {
    dispatch(setLoading(true));
    const data = await getUserData();
    dispatch(setData(data));
    dispatch(setLoading(false));
  };

export const setLoading = (isLoading: boolean) =>
  ({
    type: 'set-user-loading',
    isLoading,
  }) as const;

export const setData = (data: Partial<UserState>) =>
  ({
    type: 'set-user-data',
    data,
  }) as const;

export const logoutUser =
  () =>
  async (dispatch: React.Dispatch<any>): Promise<void> => {
    await setIsLoggedInData(false);
    dispatch(setUsername());
  };

export const setIsLoggedIn =
  (loggedIn: boolean) =>
  async (_dispatch: React.Dispatch<any>): Promise<{ readonly type: 'set-is-loggedin'; readonly loggedIn: boolean }> => {
    await setIsLoggedInData(loggedIn);
    return {
      type: 'set-is-loggedin',
      loggedIn,
    } as const;
  };

export const setUsername =
  (username?: string) =>
  async (
    _dispatch: React.Dispatch<any>,
  ): Promise<{ readonly type: 'set-username'; readonly username: string | undefined }> => {
    await setUsernameData(username);
    return {
      type: 'set-username',
      username,
    } as const;
  };

export const setHasSeenTutorial =
  (hasSeenTutorial: boolean) =>
  async (
    _dispatch: React.Dispatch<any>,
  ): Promise<{ readonly type: 'set-has-seen-tutorial'; readonly hasSeenTutorial: boolean }> => {
    await setHasSeenTutorialData(hasSeenTutorial);
    return {
      type: 'set-has-seen-tutorial',
      hasSeenTutorial,
    } as const;
  };

export const setDarkMode = (darkMode: boolean) =>
  ({
    type: 'set-dark-mode',
    darkMode,
  }) as const;

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setUsername>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setDarkMode>;
