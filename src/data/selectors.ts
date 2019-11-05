import { State } from './../models/State';
import { createSelector } from 'reselect';
import { parseISO as parseDate } from 'date-fns';
import { SessionGroup } from '../models/SessionGroup';
import { Session } from '../models/Session';
import { Location } from '../models/Location';

const getSessions = (state: State) => state.sessions;
export const getSpeakers = (state: State) => state.speakers;
const getFilteredTracks = (state: State) => state.filteredTracks;
const getFavoriteIds = (state: State) => state.favorites;
const getSearchText = (state: State) => state.searchText;

export const getFilteredSessions = createSelector(
  getSessions, getFilteredTracks,
  (sessions, filteredTracks) => {
    return sessions.filter(session => {
      let include = false;
      session.tracks.forEach(track => {
        if (filteredTracks.indexOf(track) > -1) {
          include = true;
        }
      });
      return include;
    });
  }
);

export const getSearchedSessions = createSelector(
  getFilteredSessions, getSearchText,
  (sessions, searchText) => {
    if (!searchText) {
      return sessions;
    }
    return sessions.filter(session => session.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
  }
)

export const getGroupedSessions = createSelector(
  getSearchedSessions,
  (sessions) => {
    return groupSessions(sessions);
  }
);

export const getFavorites = createSelector(
  getSearchedSessions, getFavoriteIds,
  (sessions, favoriteIds) => sessions.filter(x => favoriteIds.indexOf(x.id) > -1)
);

export const getGroupedFavorites = createSelector(
  getFavorites,
  (sessions) => {
    return groupSessions(sessions);
  }
)

const getIdParam = (_state: State, props: any) => {
  const stringParam = props.match.params["id"];
  return parseInt(stringParam, 10);
}

export const getSession = createSelector(
  getSessions, getIdParam,
  (sessions, id) => sessions.find(x => x.id === id)
);

function groupSessions(sessions: Session[]) {
  return sessions
    .sort((a, b) => (
      parseDate(a.dateTimeStart).valueOf() - parseDate(b.dateTimeStart).valueOf()
    ))
    .reduce((groups, session) => {
      let starterHour = parseDate(session.dateTimeStart);
      starterHour.setMinutes(0);
      starterHour.setSeconds(0);
      const starterHourStr = starterHour.toJSON();
      const foundGroup = groups.find(group => group.startTime === starterHourStr);
      if (foundGroup) {
        foundGroup.sessions.push(session);
      } else {
        groups.push({
          startTime: starterHourStr,
          sessions: [session]
        });
      }
      return groups;
    }, [] as SessionGroup[]);
}

export const getSpeaker = createSelector(
  getSpeakers, getIdParam,
  (speakers, id) => speakers.find(x => x.id === id)
);

export const getSpeakerSessions = createSelector(
  getSessions,
  (sessions) => {
    const speakerSessions: {[key: number]: Session[]} = {};
    sessions.forEach(session => {
      session.speakerIds.forEach(speakerId => {
        if(speakerSessions[speakerId]) {
          speakerSessions[speakerId].push(session);
        } else {
          speakerSessions[speakerId] = [session];
        }
      })
    });
    return speakerSessions;
  }
);

export const mapCenter = (state: State): Location => {
  const item = state.locations.find(l => l.id === state.mapCenterId);

  if (item == null) {
    return {
      id: 1,
      name: "Map Center",
      lat: 43.071584,
      lng: -89.380120
    };
  }

  return item;
}
