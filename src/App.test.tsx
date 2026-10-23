import { render } from '@testing-library/react';

import App from './App';

it('renders without crashing', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
