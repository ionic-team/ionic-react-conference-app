import { describe, expect, it } from 'vitest';

import type { ScheduleGroup } from '../models/Schedule';
import {
  breakfast,
  gettingStarted,
  ionicTooling,
  lunch,
  makeSession,
  makeState,
  rachel,
  reactSession,
  ted,
} from '../testing/fixtures';

import {
  getFilteredSchedule,
  getGroupedFavorites,
  getSearchedSchedule,
  getSession,
  getSpeaker,
  getSpeakerSessions,
  mapCenter,
} from './selectors';

const summarize = (schedule: { groups: { time: string; sessions: { name: string }[] }[] }) =>
  schedule.groups.map((group) => [group.time, group.sessions.map((session) => session.name)]);

describe('getFilteredSchedule', () => {
  it('sorts the groups and their sessions by time', () => {
    expect(summarize(getFilteredSchedule(makeState()))).toEqual([
      ['8:00 am', ['Breakfast']],
      ['9:00 am', ['Getting Started with Ionic', 'Ionic Tooling']],
      ['12:00 pm', ['Lunch']],
      ['1:00 pm', ["What's New in React"]],
    ]);
  });

  it('keeps the schedule date', () => {
    expect(getFilteredSchedule(makeState()).date).toBe('2047-05-17');
  });

  it('sorts 12 am before morning sessions and 12 pm after them', () => {
    const midnight = makeSession({ id: 10, name: 'Midnight', timeStart: '12:00 am' });
    const state = makeState({
      data: {
        schedule: {
          date: '2047-05-17',
          groups: [
            { time: '12:30 pm', sessions: [lunch] },
            { time: '11:00 am', sessions: [breakfast] },
            { time: '12:00 am', sessions: [midnight] },
          ],
        },
      },
    });

    expect(getFilteredSchedule(state).groups.map((group) => group.time)).toEqual(['12:00 am', '11:00 am', '12:30 pm']);
  });

  it('leaves out the sessions of excluded tracks and groups left empty', () => {
    const state = makeState({ data: { filteredTracks: ['Ionic', 'React', 'Tooling'] } });

    expect(summarize(getFilteredSchedule(state))).toEqual([
      ['9:00 am', ['Getting Started with Ionic', 'Ionic Tooling']],
      ['1:00 pm', ["What's New in React"]],
    ]);
  });

  it('shows no sessions when every track is excluded', () => {
    expect(getFilteredSchedule(makeState({ data: { filteredTracks: [] } })).groups).toEqual([]);
  });

  it('does not reorder the schedule in the state', () => {
    const state = makeState();
    getFilteredSchedule(state);

    expect(state.data.schedule.groups.map((group: ScheduleGroup) => group.time)).toEqual([
      '1:00 pm',
      '8:00 am',
      '12:00 pm',
      '9:00 am',
    ]);
  });
});

describe('getSearchedSchedule', () => {
  it('returns the filtered schedule when there is no search text', () => {
    const state = makeState({ data: { searchText: '' } });

    expect(getSearchedSchedule(state)).toBe(getFilteredSchedule(state));
  });

  it('keeps the sessions whose name contains the search text, ignoring case', () => {
    const state = makeState({ data: { searchText: 'IONIC' } });

    expect(summarize(getSearchedSchedule(state))).toEqual([
      ['9:00 am', ['Getting Started with Ionic', 'Ionic Tooling']],
    ]);
  });

  it('only matches session names', () => {
    // "Dining Hall" is a location and "Food" a track, so neither matches.
    expect(getSearchedSchedule(makeState({ data: { searchText: 'dining' } })).groups).toEqual([]);
    expect(getSearchedSchedule(makeState({ data: { searchText: 'food' } })).groups).toEqual([]);
  });

  it('searches within the tracks that are not excluded', () => {
    const state = makeState({ data: { searchText: 'ionic', filteredTracks: ['Tooling'] } });

    expect(summarize(getSearchedSchedule(state))).toEqual([['9:00 am', ['Ionic Tooling']]]);
  });
});

describe('getGroupedFavorites', () => {
  it('shows only the favorited sessions, grouped by time', () => {
    const state = makeState({ data: { favorites: [reactSession.id, ionicTooling.id] } });

    expect(summarize(getGroupedFavorites(state))).toEqual([
      ['9:00 am', ['Ionic Tooling']],
      ['1:00 pm', ["What's New in React"]],
    ]);
  });

  it('is empty when nothing is favorited', () => {
    expect(getGroupedFavorites(makeState()).groups).toEqual([]);
  });

  it('applies the search and the track filter to the favorites', () => {
    const favorites = [breakfast.id, ionicTooling.id, gettingStarted.id];

    expect(summarize(getGroupedFavorites(makeState({ data: { favorites, searchText: 'tool' } })))).toEqual([
      ['9:00 am', ['Ionic Tooling']],
    ]);
    expect(summarize(getGroupedFavorites(makeState({ data: { favorites, filteredTracks: ['Food'] } })))).toEqual([
      ['8:00 am', ['Breakfast']],
    ]);
  });
});

describe('getSession', () => {
  it('finds a session by id', () => {
    expect(getSession(makeState(), { id: ionicTooling.id })).toBe(ionicTooling);
  });

  it('returns undefined for an unknown id', () => {
    expect(getSession(makeState(), { id: 'missing' })).toBeUndefined();
  });
});

describe('getSpeaker', () => {
  it('finds a speaker by id', () => {
    expect(getSpeaker(makeState(), { id: ted.id })).toBe(ted);
    expect(getSpeaker(makeState(), { id: 'missing' })).toBeUndefined();
  });
});

describe('getSpeakerSessions', () => {
  it("maps each speaker's name to the sessions they speak at", () => {
    expect(getSpeakerSessions(makeState())).toEqual({
      [rachel.name]: [ionicTooling, reactSession],
      [ted.name]: [gettingStarted, reactSession],
    });
  });

  it('skips sessions without speakers', () => {
    const state = makeState({ data: { sessions: [{ ...breakfast, speakerNames: undefined as unknown as string[] }] } });

    expect(getSpeakerSessions(state)).toEqual({});
  });
});

describe('mapCenter', () => {
  const locations = [
    { id: 1, name: 'Map Center', lat: 1, lng: 2 },
    { id: 2, name: 'Ionic HQ', lat: 3, lng: 4 },
  ];

  it('returns the location chosen as the map center', () => {
    expect(mapCenter(makeState({ data: { locations, mapCenterId: 2 } }))).toBe(locations[1]);
  });

  it('falls back to the conference center when no location matches', () => {
    expect(mapCenter(makeState({ data: { locations, mapCenterId: 99 } }))).toEqual({
      id: 1,
      name: 'Map Center',
      lat: 43.071584,
      lng: -89.38012,
    });
  });
});
