import { fireEvent, screen } from '@testing-library/react';
import { useContext } from 'react';
import { describe, expect, it } from 'vitest';

import { AppContext } from '../data/AppContext';
import { getFilteredSchedule } from '../data/selectors';
import { breakfast, ionicTooling, makeState } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import SessionList from './SessionList';

// Shows the favorited session ids from the app state.
const Favorites = () => <output>{useContext(AppContext).state.data.favorites.join(',')}</output>;

const renderList = (favorites: number[]) => {
  const state = makeState({ data: { favorites } });
  return renderWithState(
    <>
      <SessionList schedule={getFilteredSchedule(state)} listType="all" hide={false} />
      <Favorites />
    </>,
    { state },
  );
};

// The Favorite option revealed by swiping a session's item.
const favoriteOption = (container: HTMLElement, name: string) => {
  const item = Array.from(container.querySelectorAll('ion-item-sliding')).find(
    (sliding) => sliding.querySelector('h3')?.textContent === name,
  )!;
  return item.querySelector('ion-item-option') as HTMLElement;
};

describe('SessionList', () => {
  it('favorites a session from its item', () => {
    const { container } = renderList([]);

    fireEvent.click(favoriteOption(container, 'Ionic Tooling'));

    expect(screen.getByRole('status')).toHaveTextContent(new RegExp(`^${ionicTooling.id}$`));
  });

  it('does not favorite a session twice when it is already a favorite', () => {
    const { container } = renderList([ionicTooling.id, breakfast.id]);

    // This asks whether to remove the favorite instead, and leaves the favorites alone until it is answered.
    fireEvent.click(favoriteOption(container, 'Ionic Tooling'));

    expect(screen.getByRole('status')).toHaveTextContent(new RegExp(`^${ionicTooling.id},${breakfast.id}$`));
  });
});
