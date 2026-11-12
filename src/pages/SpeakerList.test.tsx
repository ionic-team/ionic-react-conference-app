import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { makeState } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import SpeakerList from './SpeakerList';

describe('SpeakerList', () => {
  it('shows each speaker with their sessions', () => {
    renderWithState(<SpeakerList />, { state: makeState() });

    const rachel = screen.getByRole('heading', { name: 'Rachel Rabbit' }).closest('ion-card') as HTMLElement;
    expect(within(rachel).getByText('Software Engineer')).toBeInTheDocument();
    expect(
      within(rachel)
        .getAllByRole('heading', { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(['Ionic Tooling', "What's New in React", 'About Rachel Rabbit']);

    const ted = screen.getByRole('heading', { name: 'Ted Turtle' }).closest('ion-card') as HTMLElement;
    expect(within(ted).getByText('Getting Started with Ionic')).toBeInTheDocument();
  });

  it('links each session to its detail page under the speakers tab', () => {
    renderWithState(<SpeakerList />, { state: makeState() });

    const rachel = screen.getByRole('heading', { name: 'Rachel Rabbit' }).closest('ion-card') as HTMLElement;
    const session = within(rachel).getByText('Ionic Tooling').closest('ion-item');
    expect(session).toHaveAttribute('router-link', '/tabs/speakers/sessions/2');
  });
});
