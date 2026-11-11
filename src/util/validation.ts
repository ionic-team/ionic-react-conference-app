/**
 * The classes Ionic's inputs need to show their error text: it only shows on an input that is both
 * `ion-invalid` and `ion-touched`. Angular's forms module adds these for us, but in React we add them ourselves.
 */
export const validationClasses = (valid: boolean, touched: boolean): string =>
  `${valid ? 'ion-valid' : 'ion-invalid'} ${touched ? 'ion-touched' : 'ion-untouched'}`;
