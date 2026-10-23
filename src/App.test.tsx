import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import App from './App';

// The app loads its conference data on mount and renders nothing until the schedule has
// loaded. Node's fetch can't resolve the app's relative URLs, so serve the real data files.
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn((url: unknown) => {
      // Other requests (such as ionicons loading SVGs) get an empty response.
      const body =
        typeof url === 'string' && url.startsWith('/assets/data/')
          ? readFileSync(join(process.cwd(), 'public', url), 'utf8')
          : '';
      return Promise.resolve(new Response(body));
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

it('opens the tutorial on first launch', async () => {
  render(<App />);

  expect(await screen.findByText('Skip')).toBeInTheDocument();
});
