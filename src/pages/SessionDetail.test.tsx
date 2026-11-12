import { fireEvent, screen } from '@testing-library/react';
import { useContext } from 'react';
import { describe, expect, it } from 'vitest';

import { AppContext } from '../data/AppContext';
import { ionicTooling, makeState } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import SessionDetail from './SessionDetail';

// Shows the favorited session ids from the app state.
const Favorites = () => <output>{useContext(AppContext).state.data.favorites.join(',')}</output>;

const renderSession = (id: string, favorites: number[] = []) =>
  renderWithState(
    <>
      <SessionDetail />
      <Favorites />
    </>,
    { state: makeState({ data: { favorites } }), url: `/tabs/schedule/${id}`, path: '/tabs/schedule/:id' },
  );

// The favorite button's label says what pressing it does.
const favoriteButton = (container: HTMLElement) =>
  container.querySelector('ion-button[aria-label="Add favorite"]') as HTMLElement;
const removeFavoriteButton = (container: HTMLElement) =>
  container.querySelector('ion-button[aria-label="Remove favorite"]') as HTMLElement;

describe('SessionDetail', () => {
  it('shows the session from the URL', () => {
    renderSession(String(ionicTooling.id));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ionic Tooling');
    expect(screen.getByText('Tooling')).toBeInTheDocument();
    expect(screen.getByText(/9:45 am – 10:00 am/)).toHaveTextContent('Executive Ballroom');
  });

  it('favorites and unfavorites the session', () => {
    const { container } = renderSession(String(ionicTooling.id));

    fireEvent.click(favoriteButton(container));
    expect(screen.getByRole('status')).toHaveTextContent(new RegExp(`^${ionicTooling.id}$`));
    expect(favoriteButton(container)).toBeNull();

    fireEvent.click(removeFavoriteButton(container));
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(removeFavoriteButton(container)).toBeNull();
  });

  it('labels its icon-only buttons', () => {
    const { container } = renderSession(String(ionicTooling.id));

    expect(
      Array.from(container.querySelectorAll('ion-header ion-button'), (button) => button.getAttribute('aria-label')),
    ).toEqual(['Add favorite', 'Share']);
  });

  it('shows a message for an unknown session', () => {
    renderSession('999');

    expect(screen.getByText('Session not found')).toBeInTheDocument();
  });
});
