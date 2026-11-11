import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { makeState } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import Menu from './Menu';

describe('Menu', () => {
  it('links to the conference pages', async () => {
    renderWithState(<Menu />, { state: makeState() });

    expect(await screen.findByText('Schedule')).toBeInTheDocument();
    for (const page of ['Schedule', 'Speakers', 'Map', 'About', 'Support']) {
      expect(screen.getByText(page)).toBeInTheDocument();
    }
    expect(screen.getByText('Show Tutorial')).toBeInTheDocument();
  });

  it('offers login and signup when logged out', async () => {
    renderWithState(<Menu />, { state: makeState({ user: { isLoggedin: false } }) });

    expect(await screen.findByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
    // Only the account section's heading says "Account".
    expect(screen.getAllByText('Account')).toHaveLength(1);
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('offers the account and logout when logged in', async () => {
    renderWithState(<Menu />, { state: makeState({ user: { isLoggedin: true, username: 'ionitron' } }) });

    expect(await screen.findByText('Logout')).toBeInTheDocument();
    // "Account" is also the heading of the account section.
    expect(screen.getAllByText('Account')).toHaveLength(2);
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Signup')).not.toBeInTheDocument();
  });

  it('toggles dark mode', async () => {
    renderWithState(<Menu />, { state: makeState() });
    const toggle = (await screen.findByText('Dark Mode')) as HTMLIonToggleElement;
    expect(toggle.checked).toBe(false);

    fireEvent.click(toggle);
    await waitFor(() => expect(toggle.checked).toBe(true));

    fireEvent.click(toggle);
    await waitFor(() => expect(toggle.checked).toBe(false));
  });
});
