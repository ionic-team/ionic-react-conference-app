import type { AppState } from '../data/state';
import { initialState } from '../data/state';
import type { Session } from '../models/Schedule';
import type { Speaker } from '../models/Speaker';

// The data files store ids as strings, which is what the route params are matched against.
const id = (value: string) => value as unknown as number;

export const makeSession = (overrides: Partial<Session> & Pick<Session, 'id' | 'name'>): Session => ({
  timeStart: '9:00 am',
  timeEnd: '9:30 am',
  location: 'Hall 1',
  description: `About ${overrides.name}`,
  speakerNames: [],
  tracks: ['Ionic'],
  ...overrides,
});

export const breakfast = makeSession({
  id: id('1'),
  name: 'Breakfast',
  timeStart: '8:00 am',
  timeEnd: '9:00 am',
  location: 'Dining Hall',
  tracks: ['Food'],
});
export const ionicTooling = makeSession({
  id: id('2'),
  name: 'Ionic Tooling',
  timeStart: '9:45 am',
  timeEnd: '10:00 am',
  location: 'Executive Ballroom',
  tracks: ['Tooling'],
  speakerNames: ['Rachel Rabbit'],
});
export const gettingStarted = makeSession({
  id: id('3'),
  name: 'Getting Started with Ionic',
  timeStart: '9:15 am',
  timeEnd: '9:45 am',
  location: 'Hall 2',
  tracks: ['Ionic'],
  speakerNames: ['Ted Turtle'],
});
export const reactSession = makeSession({
  id: id('4'),
  name: "What's New in React",
  timeStart: '1:00 pm',
  timeEnd: '1:30 pm',
  location: 'Hall 3',
  tracks: ['React'],
  speakerNames: ['Rachel Rabbit', 'Ted Turtle'],
});
export const lunch = makeSession({
  id: id('5'),
  name: 'Lunch',
  timeStart: '12:00 pm',
  timeEnd: '1:00 pm',
  location: 'Dining Hall',
  tracks: ['Food'],
});

export const makeSpeaker = (overrides: Partial<Speaker> & Pick<Speaker, 'id' | 'name'>): Speaker => ({
  profilePic: `/assets/img/speakers/${overrides.name}.jpg`,
  twitter: 'ionicframework',
  instagram: 'ionicframework',
  about: `${overrides.name} is a speaker.`,
  title: 'Software Engineer',
  location: 'Everywhere',
  email: 'speaker@example.com',
  phone: '555-555-5555',
  ...overrides,
});

export const rachel = makeSpeaker({ id: id('1'), name: 'Rachel Rabbit' });
export const ted = makeSpeaker({ id: id('2'), name: 'Ted Turtle' });

export const sessions = [breakfast, ionicTooling, gettingStarted, reactSession, lunch];

/**
 * App state with a small conference loaded. The groups are deliberately out of time order, and so are the
 * sessions in the 9:00 am group, like the real data.
 */
export const makeState = ({
  data,
  user,
}: { data?: Partial<AppState['data']>; user?: Partial<AppState['user']> } = {}): AppState => ({
  ...initialState,
  data: {
    ...initialState.data,
    schedule: {
      date: '2047-05-17',
      groups: [
        { time: '1:00 pm', sessions: [reactSession] },
        { time: '8:00 am', sessions: [breakfast] },
        { time: '12:00 pm', sessions: [lunch] },
        { time: '9:00 am', sessions: [ionicTooling, gettingStarted] },
      ],
    },
    sessions,
    speakers: [rachel, ted],
    allTracks: ['Food', 'Ionic', 'React', 'Tooling'],
    filteredTracks: ['Food', 'Ionic', 'React', 'Tooling'],
    ...data,
  },
  user: { ...initialState.user, hasSeenTutorial: true, ...user },
});
