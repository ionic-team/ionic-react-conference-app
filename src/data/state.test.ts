import { describe, expect, it } from 'vitest';

import { makeState } from '../testing/fixtures';

import { setLocations } from './locations/locations.actions';
import {
  addFavorite,
  removeFavorite,
  setData as setConfData,
  setLoading as setConfLoading,
  setMenuEnabled,
  setSearchText,
  updateFilteredTracks,
} from './sessions/sessions.actions';
import { initialState, reducers } from './state';
import { setDarkMode, setData as setUserData, setLoading as setUserLoading } from './user/user.actions';

describe('initialState', () => {
  it('starts logged out, before the tutorial, with no conference data', () => {
    expect(initialState.user).toEqual({ hasSeenTutorial: false, darkMode: false, isLoggedin: false, loading: false });
    expect(initialState.data.schedule.groups).toEqual([]);
    expect(initialState.data.favorites).toEqual([]);
    expect(initialState.data.menuEnabled).toBe(true);
  });
});

describe('sessions reducer', () => {
  it('adds and removes favorites', () => {
    let state = reducers(makeState(), addFavorite(4));
    state = reducers(state, addFavorite(2));
    expect(state.data.favorites).toEqual([4, 2]);

    state = reducers(state, removeFavorite(4));
    expect(state.data.favorites).toEqual([2]);
  });

  it('does not add a favorite twice', () => {
    const state = makeState({ data: { favorites: [4] } });
    const next = reducers(state, addFavorite(4));

    expect(next.data.favorites).toEqual([4]);
    expect(next.data).toBe(state.data);
  });

  it('removes every copy of a favorite', () => {
    const state = reducers(makeState({ data: { favorites: [2, 3, 2] } }), removeFavorite(2));

    expect(state.data.favorites).toEqual([3]);
  });

  it('updates the filtered tracks and the search text', () => {
    let state = reducers(makeState(), updateFilteredTracks(['Food']));
    state = reducers(state, setSearchText('ionic'));

    expect(state.data.filteredTracks).toEqual(['Food']);
    expect(state.data.searchText).toBe('ionic');
  });

  it('merges loaded conference data and tracks loading', () => {
    let state = reducers(initialState, setConfLoading(true));
    expect(state.data.loading).toBe(true);

    state = reducers(state, setConfData({ allTracks: ['Ionic'], filteredTracks: ['Ionic'] }));
    expect(state.data.allTracks).toEqual(['Ionic']);
    expect(state.data.favorites).toEqual([]);
  });

  it('enables and disables the menu', () => {
    expect(reducers(initialState, setMenuEnabled(false)).data.menuEnabled).toBe(false);
  });
});

describe('user reducer', () => {
  it('handles the user actions', () => {
    let state = reducers(initialState, setUserLoading(true));
    expect(state.user.loading).toBe(true);

    state = reducers(state, setUserData({ isLoggedin: true, username: 'ionitron', hasSeenTutorial: true }));
    expect(state.user).toMatchObject({ isLoggedin: true, username: 'ionitron', hasSeenTutorial: true });

    state = reducers(state, { type: 'set-username', username: 'capacitor' });
    expect(state.user.username).toBe('capacitor');

    state = reducers(state, { type: 'set-is-loggedin', loggedIn: false });
    expect(state.user.isLoggedin).toBe(false);

    state = reducers(state, { type: 'set-has-seen-tutorial', hasSeenTutorial: false });
    expect(state.user.hasSeenTutorial).toBe(false);

    expect(reducers(state, setDarkMode(true)).user.darkMode).toBe(true);
  });
});

describe('locations reducer', () => {
  it('stores the locations', () => {
    const locations = [{ id: 1, name: 'Ionic HQ', lat: 1, lng: 2 }];

    expect(reducers(initialState, setLocations(locations)).locations.locations).toBe(locations);
  });
});

describe('combined reducers', () => {
  it('keeps the other slices when one changes', () => {
    const state = makeState();
    const next = reducers(state, setDarkMode(true));

    expect(next.data).toBe(state.data);
    expect(next.locations).toBe(state.locations);
  });

  it('leaves the state unchanged for unknown actions', () => {
    const state = makeState();

    expect(reducers(state, { type: 'unknown' })).toEqual(state);
  });
});
