import { screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { makeState } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import HomeOrTutorial from './HomeOrTutorial';

const renderAtHome = (hasSeenTutorial: boolean) =>
  renderWithState(<HomeOrTutorial />, { state: makeState({ user: { hasSeenTutorial } }), path: '/' }, [
    <Route key="tutorial" path="/tutorial" element={<p>Tutorial page</p>} />,
    <Route key="schedule" path="/tabs/schedule" element={<p>Schedule page</p>} />,
  ]);

describe('HomeOrTutorial', () => {
  it('opens the tutorial when it has not been seen', () => {
    renderAtHome(false);

    expect(screen.getByText('Tutorial page')).toBeInTheDocument();
  });

  it('opens the schedule once the tutorial has been seen', () => {
    renderAtHome(true);

    expect(screen.getByText('Schedule page')).toBeInTheDocument();
  });
});
