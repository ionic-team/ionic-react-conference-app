import { setupIonicReact } from '@ionic/react';
import { screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import { ionicTooling, makeState, reactSession } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import SchedulePage from './SchedulePage';

// The page reads the mode from Ionic's config.
beforeAll(() => {
  setupIonicReact({ mode: 'md' });
});

// The page renders the All and Favorites lists, and hides the one that isn't selected.
const lists = (container: HTMLElement) => {
  const [all, favorites] = Array.from(container.querySelectorAll('ion-content ion-list'));
  return { all: all as HTMLElement, favorites: favorites as HTMLElement };
};
const sessionNames = (list: HTMLElement) => Array.from(list.querySelectorAll('h3'), (heading) => heading.textContent);
const groupTimes = (list: HTMLElement) =>
  Array.from(list.querySelectorAll('ion-item-divider')).map((divider) => divider.textContent);

describe('SchedulePage', () => {
  it('lists the sessions grouped by time', () => {
    const { container } = renderWithState(<SchedulePage />, { state: makeState() });
    const { all } = lists(container);

    expect(groupTimes(all)).toEqual(['8:00 am', '9:00 am', '12:00 pm', '1:00 pm']);
    expect(sessionNames(all)).toEqual([
      'Breakfast',
      'Getting Started with Ionic',
      'Ionic Tooling',
      'Lunch',
      "What's New in React",
    ]);
    expect(within(all).getByText(/9:45 am — 10:00 am: Executive Ballroom/)).toBeInTheDocument();
  });

  it('lists only the sessions matching the search text', () => {
    const { container } = renderWithState(<SchedulePage />, { state: makeState({ data: { searchText: 'ionic' } }) });

    expect(groupTimes(lists(container).all)).toEqual(['9:00 am']);
    expect(sessionNames(lists(container).all)).toEqual(['Getting Started with Ionic', 'Ionic Tooling']);
  });

  it('leaves out the sessions of excluded tracks', () => {
    const { container } = renderWithState(<SchedulePage />, {
      state: makeState({ data: { filteredTracks: ['Ionic', 'React', 'Tooling'] } }),
    });

    expect(sessionNames(lists(container).all)).toEqual([
      'Getting Started with Ionic',
      'Ionic Tooling',
      "What's New in React",
    ]);
  });

  it('shows the favorited sessions in the hidden favorites list', () => {
    const { container } = renderWithState(<SchedulePage />, {
      state: makeState({ data: { favorites: [reactSession.id, ionicTooling.id] } }),
    });

    expect(sessionNames(lists(container).favorites)).toEqual(['Ionic Tooling', "What's New in React"]);
    expect(lists(container).favorites).toHaveStyle({ display: 'none' });
  });

  it('shows an empty state when no session matches', () => {
    renderWithState(<SchedulePage />, { state: makeState({ data: { filteredTracks: [] } }) });

    expect(screen.getByText('No Sessions Found')).toBeInTheDocument();
  });
});
