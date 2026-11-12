/**
 * The classes Ionic's inputs need to show their error text: it only shows on an input that is both
 * `ion-invalid` and `ion-touched`. Nothing adds these to a plain input, so each form sets them from its own state.
 */
export const validationClasses = (valid: boolean, touched: boolean): string =>
  `${valid ? 'ion-valid' : 'ion-invalid'} ${touched ? 'ion-touched' : 'ion-untouched'}`;
