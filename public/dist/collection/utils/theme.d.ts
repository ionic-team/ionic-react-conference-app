import { CssClassMap } from '@stencil/core';
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
export declare function createThemedClasses(mode: string, color: string, classes: string): CssClassMap;
/**
 * Get the classes from a class list and return them as an object
 */
export declare function getElementClassObject(classList: DOMTokenList): CssClassMap;
