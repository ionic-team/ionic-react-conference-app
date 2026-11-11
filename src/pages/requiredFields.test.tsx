import { fireEvent } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it } from 'vitest';

import { makeState } from '../testing/fixtures';
import { renderWithState } from '../testing/render';
import { validationClasses } from '../util/validation';

import Login from './Login';
import Signup from './Signup';
import Support from './Support';

// Ionic only shows an input's error text when it has both the ion-invalid and ion-touched classes.
// Vitest loads the server build of Ionic's React wrappers, which doesn't pass props or events to the inputs, so
// typing and leaving an input are covered by the e2e tests.
const showsError = (input: Element) =>
  input.classList.contains('ion-invalid') && input.classList.contains('ion-touched');

const fields = (container: HTMLElement) => Array.from(container.querySelectorAll('ion-input, ion-textarea'));

describe('validationClasses', () => {
  it('marks a field valid or invalid, and touched or untouched', () => {
    expect(validationClasses(true, false)).toBe('ion-valid ion-untouched');
    expect(validationClasses(false, true)).toBe('ion-invalid ion-touched');
  });
});

describe.each<[string, React.ReactElement, number]>([
  ['Login', <Login key="login" />, 2],
  ['Signup', <Signup key="signup" />, 2],
  ['Support', <Support key="support" />, 1],
])('%s required fields', (_name, page, count) => {
  const renderPage = () => renderWithState(page, { state: makeState() });

  it('do not show an error before they are used', () => {
    const { container } = renderPage();

    expect(fields(container)).toHaveLength(count);
    expect(fields(container).some(showsError)).toBe(false);
  });

  it('show an error on every empty field when the form is submitted', () => {
    const { container } = renderPage();

    fireEvent.submit(container.querySelector('form')!);

    expect(fields(container)).toHaveLength(count);
    expect(fields(container).every(showsError)).toBe(true);
  });
});
