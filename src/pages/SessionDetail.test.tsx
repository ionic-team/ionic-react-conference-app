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

// The favorite button is the first icon-only button in the toolbar, before the share button.
const favoriteButton = (container: HTMLElement) => container.querySelector('ion-header ion-button') as HTMLElement;

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
    expect(screen.getByRole('status')).toHaveTextContent(String(ionicTooling.id));

    fireEvent.click(favoriteButton(container));
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('unfavorites a session that is already a favorite', () => {
    const { container } = renderSession(String(ionicTooling.id), [ionicTooling.id]);

    fireEvent.click(favoriteButton(container));

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('shows a message for an unknown session', () => {
    renderSession('999');

    expect(screen.getByText('Session not found')).toBeInTheDocument();
  });
});
