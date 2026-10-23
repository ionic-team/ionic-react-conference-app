import { render } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import App from './App';

// The app loads its conference data on mount. Node's fetch can't resolve the app's
// relative URLs, so serve empty data instead.
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) => {
      const body = url.endsWith('locations.json') ? [] : { schedule: [{ date: '', groups: [] }], speakers: [] };
      return Promise.resolve(new Response(JSON.stringify(body)));
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

it('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
