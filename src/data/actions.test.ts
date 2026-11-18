import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import * as dataApi from './dataApi';
import { loadLocations } from './locations/locations.actions';
import { loadConfData } from './sessions/sessions.actions';
import { loadUserData, setHasSeenTutorial, setIsLoggedIn, setUsername } from './user/user.actions';

vi.mock('./dataApi', () => ({
  getConfData: vi.fn(),
  getUserData: vi.fn(),
  setIsLoggedInData: vi.fn(),
  setHasSeenTutorialData: vi.fn(),
  setUsernameData: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('loadConfData', () => {
  it('loads the conference data between loading flags', async () => {
    const data = { allTracks: ['Ionic'] } as Awaited<ReturnType<typeof dataApi.getConfData>>;
    vi.mocked(dataApi.getConfData).mockResolvedValue(data);
    const dispatch = vi.fn();

    await loadConfData()(dispatch);

    expect(dispatch.mock.calls.map(([action]) => action)).toEqual([
      { type: 'set-conf-loading', isLoading: true },
      { type: 'set-conf-data', data },
      { type: 'set-conf-loading', isLoading: false },
    ]);
  });
});

describe('loadUserData', () => {
  it('loads the saved user data between loading flags', async () => {
    const data = { isLoggedin: true, hasSeenTutorial: true, username: 'ionitron' };
    vi.mocked(dataApi.getUserData).mockResolvedValue(data);
    const dispatch = vi.fn();

    await loadUserData()(dispatch);

    expect(dispatch.mock.calls.map(([action]) => action)).toEqual([
      { type: 'set-user-loading', isLoading: true },
      { type: 'set-user-data', data },
      { type: 'set-user-loading', isLoading: false },
    ]);
  });
});

describe('user actions that are saved', () => {
  it('setIsLoggedIn saves the logged in state before returning its action', async () => {
    expect(await setIsLoggedIn(true)(vi.fn())).toEqual({ type: 'set-is-loggedin', loggedIn: true });
    expect(dataApi.setIsLoggedInData).toHaveBeenCalledWith(true);
  });

  it('setUsername saves the username before returning its action', async () => {
    expect(await setUsername('ionitron')(vi.fn())).toEqual({ type: 'set-username', username: 'ionitron' });
    expect(dataApi.setUsernameData).toHaveBeenCalledWith('ionitron');

    expect(await setUsername()(vi.fn())).toEqual({ type: 'set-username', username: undefined });
    expect(dataApi.setUsernameData).toHaveBeenLastCalledWith(undefined);
  });

  it('setHasSeenTutorial saves the tutorial flag before returning its action', async () => {
    expect(await setHasSeenTutorial(true)(vi.fn())).toEqual({ type: 'set-has-seen-tutorial', hasSeenTutorial: true });
    expect(dataApi.setHasSeenTutorialData).toHaveBeenCalledWith(true);
  });

  it('does not report the change until it has been saved', async () => {
    vi.mocked(dataApi.setIsLoggedInData).mockRejectedValue(new Error('storage full'));

    await expect(setIsLoggedIn(true)(vi.fn())).rejects.toThrow('storage full');
  });
});

describe('loadLocations', () => {
  it('loads the map locations', async () => {
    const locations = [{ id: 1, name: 'Ionic HQ', lat: 1, lng: 2 }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(locations))));
    const dispatch = vi.fn();

    await loadLocations()(dispatch);

    expect(fetch).toHaveBeenCalledWith('/assets/data/locations.json');
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_LOCATIONS', payload: locations });
  });

  it('falls back to the convention center when the locations cannot be loaded', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const dispatch = vi.fn();

    await loadLocations()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_LOCATIONS',
      payload: [{ id: 1, name: 'Monona Terrace Convention Center', lat: 43.071584, lng: -89.38012, center: true }],
    });
  });
});
