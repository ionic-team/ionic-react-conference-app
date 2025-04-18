import { getConfData } from '../dataApi';
import { ActionType } from '../../util/types';
import { ConfState } from './conf.state';

export const loadConfData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getConfData();
  dispatch(setData(data));
  dispatch(setLoading(false));
};

export const setLoading = (isLoading: boolean) =>
  ({
    type: 'set-conf-loading',
    isLoading,
  } as const);

export const setData = (data: Partial<ConfState>) =>
  ({
    type: 'set-conf-data',
    data,
  } as const);

export const addFavorite = (sessionId: number) =>
  ({
    type: 'add-favorite',
    sessionId,
  } as const);

export const removeFavorite = (sessionId: number) =>
  ({
    type: 'remove-favorite',
    sessionId,
  } as const);

export const updateFilteredTracks = (filteredTracks: string[]) =>
  ({
    type: 'update-filtered-tracks',
    filteredTracks,
  } as const);

export const setSearchText = (searchText?: string) =>
  ({
    type: 'set-search-text',
    searchText,
  } as const);

export const setMenuEnabled = (menuEnabled: boolean) =>
  ({
    type: 'set-menu-enabled',
    menuEnabled,
  } as const);

export type SessionsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof addFavorite>
  | ActionType<typeof removeFavorite>
  | ActionType<typeof updateFilteredTracks>
  | ActionType<typeof setSearchText>
  | ActionType<typeof setMenuEnabled>;
