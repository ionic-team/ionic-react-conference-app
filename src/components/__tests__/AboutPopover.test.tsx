import React from 'react';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import AboutPopover from '../AboutPopover';
import 'jest-dom/extend-expect'

afterEach(cleanup)


describe('AboutPopover', () => {


  it('should render', () => {
    const { getByText } = render(<AboutPopover dismissPopover={() => {}} />);
    expect(getByText(/^GitHub Repo:/)).toHaveTextContent('GitHub Repo')
  });
});
