import { setupIonicReact } from '@ionic/react';
import { fireEvent, screen } from '@testing-library/react';
import { useContext } from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

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

const renderFilter = () => {
  const onDismissModal = vi.fn();
  renderWithState(
    <>
      <SessionListFilter onDismissModal={onDismissModal} />
      <FilteredTracks />
    </>,
    { state: makeState() },
  );
  return { onDismissModal };
};

describe('SessionListFilter', () => {
  it('Deselect All excludes every track and Select All includes them again once Done is tapped', () => {
    const { onDismissModal } = renderFilter();

    fireEvent.click(screen.getByText('Deselect All'));
    expect(screen.getByRole('status')).toHaveTextContent('Food,Ionic,React,Tooling');
    fireEvent.click(screen.getByText('Done'));
    expect(screen.getByRole('status')).toHaveTextContent(/^$/);
    expect(onDismissModal).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByText('Select All'));
    fireEvent.click(screen.getByText('Done'));
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

  it('Cancel closes the filter without applying the track changes', () => {
    const { onDismissModal } = renderFilter();

    fireEvent.click(screen.getByText('Deselect All'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(onDismissModal).toHaveBeenCalledOnce();
    expect(screen.getByRole('status')).toHaveTextContent('Food,Ionic,React,Tooling');
  });
});
