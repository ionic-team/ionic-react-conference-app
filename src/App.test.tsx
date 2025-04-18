import App from './App';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
  const { asFragment, container } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
