import { createSelector } from 'reselect';
import { Schedule, Session, ScheduleGroup } from '../models/Schedule';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';
import { AppState } from './state';

const getSchedule = (state: AppState) => {
  return state.data.schedule;
};
export const getSpeakers = (state: AppState) => state.data.speakers;
const getSessions = (state: AppState) => state.data.sessions;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getFavoriteIds = (state: AppState) => state.data.favorites;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredSchedule = createSelector(
  getSchedule,
  getFilteredTracks,
  (schedule, filteredTracks) => {
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach((group: ScheduleGroup) => {
      const sessions: Session[] = [];
      group.sessions.forEach((session) => {
        session.tracks.forEach((track) => {
          if (filteredTracks.indexOf(track) > -1) {
            sessions.push(session);
          }
        });
      });
      if (sessions.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions,
        };
        groups.push(groupToAdd);
      }
    });

    return {
      date: schedule.date,
      groups,
    } as Schedule;
  }
);

export const getSearchedSchedule = createSelector(
  getFilteredSchedule,
  getSearchText,
  (schedule, searchText) => {
    if (!searchText) {
      return schedule;
    }
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach((group) => {
      const sessions = group.sessions.filter(
        (s) => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
      if (sessions.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions,
        };
        groups.push(groupToAdd);
      }
    });
    return {
      date: schedule.date,
      groups,
    } as Schedule;
  }
);

export const getScheduleList = createSelector(
  getSearchedSchedule,
  (schedule) => schedule
);

export const getGroupedFavorites = createSelector(
  getScheduleList,
  getFavoriteIds,
  (schedule, favoriteIds) => {
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach((group) => {
      const sessions = group.sessions.filter(
        (s) => favoriteIds.indexOf(s.id) > -1
      );
      if (sessions.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions,
        };
        groups.push(groupToAdd);
      }
    });
    return {
      date: schedule.date,
      groups,
    } as Schedule;
  }
);

const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getSession = createSelector(
  getSessions,
  getIdParam,
  (sessions, id) => {
    return sessions.find((s: Session) => s.id === id);
  }
);

export const getSpeaker = createSelector(
  getSpeakers,
  getIdParam,
  (speakers, id) => speakers.find((x: Speaker) => x.id === id)
);

export const getSpeakerSessions = createSelector(getSessions, (sessions) => {
  const speakerSessions: { [key: string]: Session[] } = {};

  sessions.forEach((session: Session) => {
    session.speakerNames &&
      session.speakerNames.forEach((name) => {
        if (speakerSessions[name]) {
          speakerSessions[name].push(session);
        } else {
          speakerSessions[name] = [session];
        }
      });
  });
  return speakerSessions;
});

export const mapCenter = (state: AppState) => {
  const item = state.data.locations.find(
    (l: Location) => l.id === state.data.mapCenterId
  );
  if (item == null) {
    return {
      id: 1,
      name: 'Map Center',
      lat: 43.071584,
      lng: -89.38012,
    };
  }
  return item;
};
