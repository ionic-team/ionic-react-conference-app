import { setupIonicReact } from '@ionic/react';
import { fireEvent, screen } from '@testing-library/react';
import { useContext } from 'react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppContext } from '../data/AppContext';
import { makeState } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import SessionListFilter from './SessionListFilter';

// The filter reads the mode from Ionic's config. In md it shows Reset in the header as well as the footer.
beforeAll(() => {
  setupIonicReact({ mode: 'md' });
});

// Shows the included tracks from the app state.
const FilteredTracks = () => <output>{useContext(AppContext).state.data.filteredTracks.join(',')}</output>;

const renderFilter = () =>
  renderWithState(
    <>
      <SessionListFilter onDismissModal={() => undefined} />
      <FilteredTracks />
    </>,
    { state: makeState() },
  );

describe('SessionListFilter', () => {
  it('Deselect All excludes every track and Select All includes them again', () => {
    renderFilter();

    fireEvent.click(screen.getByText('Deselect All'));
    expect(screen.getByRole('status')).toHaveTextContent(/^$/);

    fireEvent.click(screen.getByText('Select All'));
    expect(screen.getByRole('status')).toHaveTextContent('Food,Ionic,React,Tooling');
  });
});

describe('SessionListFilter in iOS', () => {
  beforeAll(() => {
    setupIonicReact({ mode: 'ios' });
  });

  afterAll(() => {
    setupIonicReact({ mode: 'md' });
  });

  it('Cancel puts back the tracks that were included when it opened', () => {
    renderFilter();

    fireEvent.click(screen.getByText('Deselect All'));
    expect(screen.getByRole('status')).toHaveTextContent(/^$/);

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByRole('status')).toHaveTextContent('Food,Ionic,React,Tooling');
  });
});
