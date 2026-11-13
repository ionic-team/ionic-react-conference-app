import type { ActionSheetButton } from '@ionic/core';
import { fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { makeState, rachel } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import SpeakerDetail from './SpeakerDetail';

const renderSpeaker = () =>
  renderWithState(<SpeakerDetail />, {
    state: makeState(),
    url: `/tabs/speakers/${rachel.id}`,
    path: '/tabs/speakers/:id',
  });

const toolbarButton = (container: HTMLElement, name: string) =>
  container.querySelector(`ion-button[aria-label="${name}"]`) as HTMLElement;

// The action sheet renders outside the page, and its header and buttons are properties, not attributes.
const actionSheet = () =>
  document.querySelector('ion-action-sheet') as HTMLElement & { header: string; buttons: ActionSheetButton[] };

describe('SpeakerDetail', () => {
  it('offers to email or call the speaker', async () => {
    const { container } = renderSpeaker();

    fireEvent.click(toolbarButton(container, 'Contact'));

    await waitFor(() => expect(actionSheet().header).toBe(`Contact ${rachel.name}`));
    expect(actionSheet().buttons.map(({ text, role }) => ({ text, role }))).toEqual([
      { text: `Email ( ${rachel.email} )`, role: undefined },
      { text: `Call ( ${rachel.phone} )`, role: undefined },
      { text: 'Cancel', role: 'cancel' },
    ]);
  });

  it('offers to share the speaker', async () => {
    const { container } = renderSpeaker();

    fireEvent.click(toolbarButton(container, 'Share'));

    await waitFor(() => expect(actionSheet().header).toBe(`Share ${rachel.name}`));
    expect(actionSheet().buttons.map(({ text }) => text)).toEqual(['Copy Link', 'Share via ...', 'Cancel']);
  });
});
