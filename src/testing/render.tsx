import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import type React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AppContextProvider } from '../data/AppContextProvider';
import type { AppState } from '../data/state';

interface RenderOptions {
  state: AppState;
  // The URL to start at, and the route pattern the element is rendered at (for route params).
  url?: string;
  path?: string;
}

/**
 * Renders a connected page or component with preset app state inside a router, without booting the whole app.
 */
export function renderWithState(
  element: React.ReactElement,
  { state, url = '/', path = '*' }: RenderOptions,
  // Other routes to render, such as the pages the element navigates to.
  otherRoutes: React.ReactElement[] = [],
): RenderResult {
  return render(
    <AppContextProvider initialState={state}>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path={path} element={element} />
          {otherRoutes}
        </Routes>
      </MemoryRouter>
    </AppContextProvider>,
  );
}
