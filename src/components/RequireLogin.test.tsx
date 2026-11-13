import { screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import type { AppState } from '../data/state';
import { makeState } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import RequireLogin from './RequireLogin';

const renderAccount = (user: Partial<AppState['user']>) =>
  renderWithState(
    <RequireLogin>
      <p>Account page</p>
    </RequireLogin>,
    { state: makeState({ user }), url: '/account', path: '/account' },
    [<Route key="login" path="/login" element={<p>Login page</p>} />],
  );

describe('RequireLogin', () => {
  it('shows the page while logged in', () => {
    renderAccount({ isLoggedin: true, username: 'ionitron' });

    expect(screen.getByText('Account page')).toBeInTheDocument();
  });

  it('opens the login page while logged out', () => {
    renderAccount({ isLoggedin: false });

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Account page')).not.toBeInTheDocument();
  });

  it('waits for the saved login to load', () => {
    renderAccount({ isLoggedin: false, loading: true });

    expect(screen.queryByText('Login page')).not.toBeInTheDocument();
    expect(screen.queryByText('Account page')).not.toBeInTheDocument();
  });
});
