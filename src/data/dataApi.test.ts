import { Preferences } from '@capacitor/preferences';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getConfData, getUserData, setHasSeenTutorialData, setIsLoggedInData, setUsernameData } from './dataApi';

vi.mock('@capacitor/preferences', () => {
  const store = new Map<string, string>();
  return {
    Preferences: {
      get: vi.fn(async ({ key }: { key: string }) => ({ value: store.has(key) ? store.get(key) : null })),
      set: vi.fn(async ({ key, value }: { key: string; value: string }) => {
        store.set(key, value);
      }),
      remove: vi.fn(async ({ key }: { key: string }) => {
        store.delete(key);
      }),
      clear: vi.fn(async () => store.clear()),
    },
  };
});

const readData = (file: string) => readFileSync(join(import.meta.dirname, '../../public/assets/data', file), 'utf8');

beforeEach(async () => {
  vi.clearAllMocks();
  await Preferences.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getConfData', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => new Response(readData(url.replace('/assets/data/', '')))),
    );
  });

  it('loads the schedule, sessions, speakers and locations', async () => {
    const data = await getConfData();

    expect(fetch).toHaveBeenCalledWith('/assets/data/data.json');
    expect(fetch).toHaveBeenCalledWith('/assets/data/locations.json');
    expect(data.schedule.date).toBe('2047-05-17');
    expect(data.schedule.groups).toHaveLength(8);
    expect(data.speakers).toHaveLength(13);
    expect(data.locations.map((location) => location.name)).toContain('Ionic HQ');
  });

  it('flattens the schedule into a list of sessions', async () => {
    const data = await getConfData();

    expect(data.sessions).toHaveLength(20);
    expect(data.sessions[0].name).toBe('Breakfast');
    expect(data.sessions.at(-1)?.name).toBe('Mobile States');
  });

  it('collects each track once, sorted, and starts with every track shown', async () => {
    const data = await getConfData();

    expect(data.allTracks).toEqual([
      'Communication',
      'Design',
      'Documentation',
      'Food',
      'Ionic',
      'Navigation',
      'React',
      'Services',
      'Tooling',
      'Workshop',
    ]);
    expect(data.filteredTracks).toEqual(data.allTracks);
    expect(data.filteredTracks).not.toBe(data.allTracks);
  });
});

describe('user data', () => {
  it('is logged out, before the tutorial and without a username when nothing is saved', async () => {
    expect(await getUserData()).toEqual({ isLoggedin: false, hasSeenTutorial: false, username: undefined });
  });

  it('saves and reads back the logged in state, tutorial flag and username', async () => {
    await setIsLoggedInData(true);
    await setHasSeenTutorialData(true);
    await setUsernameData('ionitron');

    expect(Preferences.set).toHaveBeenCalledWith({ key: 'hasLoggedIn', value: 'true' });
    expect(Preferences.set).toHaveBeenCalledWith({ key: 'hasSeenTutorial', value: 'true' });
    expect(Preferences.set).toHaveBeenCalledWith({ key: 'username', value: 'ionitron' });
    expect(await getUserData()).toEqual({ isLoggedin: true, hasSeenTutorial: true, username: 'ionitron' });
  });

  it('saves logging out', async () => {
    await setIsLoggedInData(true);
    await setIsLoggedInData(false);

    expect((await getUserData()).isLoggedin).toBe(false);
  });

  it('removes the saved username when it is cleared', async () => {
    await setUsernameData('ionitron');
    await setUsernameData(undefined);

    expect(Preferences.remove).toHaveBeenCalledWith({ key: 'username' });
    expect((await getUserData()).username).toBeUndefined();
  });
});
