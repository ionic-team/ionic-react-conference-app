import { EventEmitter } from '@stencil/core';
/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar
 *   [(ngModel)]="myInput"
 *   [showCancelButton]="shouldShowCancel"
 *   (ionInput)="onInput($event)"
 *   (ionCancel)="onCancel($event)">
 * </ion-searchbar>
 * ```
 *
 * @demo /docs/demos/src/searchbar/
 * @see {@link /docs/components#searchbar Searchbar Component Docs}
 */
export declare class Searchbar {
    private _isCancelVisible;
    private _shouldBlur;
    private _shouldAlignLeft;
    el: HTMLElement;
    mode: string;
    color: string;
    activated: boolean;
    focused: boolean;
    /**
     * @output {event} Emitted when the Searchbar input has changed, including when it's cleared.
     */
    ionInput: EventEmitter;
    /**
     * @output {event} Emitted when the cancel button is clicked.
     */
    ionCancel: EventEmitter;
    /**
     * @output {event} Emitted when the clear input button is clicked.
     */
    ionClear: EventEmitter;
    /**
     * @output {event}
     */
    ionBlur: EventEmitter;
    /**
     * @output {event}
     */
    ionFocus: EventEmitter;
    /**
     * @input {boolean} If true, enable searchbar animation. Default `false`.
     */
    animated: boolean;
    /**
     * @input {string} Set the input's autocomplete property. Values: `"on"`, `"off"`. Default `"off"`.
     */
    autocomplete: string;
    /**
     * @input {string} Set the input's autocorrect property. Values: `"on"`, `"off"`. Default `"off"`.
     */
    autocorrect: string;
    /**
     * @input {string} Set the the cancel button text. Default: `"Cancel"`.
     */
    cancelButtonText: string;
    /**
     * @input {number} Set the amount of time, in milliseconds, to wait to trigger the `ionInput` event after each keystroke. Default `250`.
     */
    debounce: number;
    /**
     * @input {string} Set the input's placeholder. Default `"Search"`.
     */
    placeholder: string;
    /**
     * @input {boolean} If true, show the cancel button. Default `false`.
     */
    showCancelButton: boolean;
    /**
     * @input {boolean} If true, enable spellcheck on the input. Default `false`.
     */
    spellcheck: boolean;
    /**
     * @input {string} Set the type of the input. Values: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, `"url"`. Default `"search"`.
     */
    type: string;
    /**
     * @input {string} Set the value of the searchbar.
     */
    value: string;
    ionViewDidLoad(): void;
    /**
     * @hidden
     * Clears the input field and triggers the control change.
     */
    clearInput(ev: UIEvent): void;
    /**
     * @hidden
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    cancelSearchbar(ev: UIEvent): void;
    /**
     * @hidden
     * Update the Searchbar input value when the input changes
     */
    inputChanged(ev: any): void;
    /**
     * @hidden
     */
    inputUpdated(): void;
    /**
     * @hidden
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     */
    inputBlurred(): void;
    /**
     * @hidden
     * Sets the Searchbar to focused and active on input focus.
     */
    inputFocused(): void;
    /**
     * @hidden
     * Positions the input search icon, placeholder, and the cancel button
     * based on the input value and if it is focused. (ios only)
     */
    positionElements(): void;
    /**
     * @hidden
     * Positions the input placeholder
     */
    positionPlaceholder(): void;
    /**
     * @hidden
     * Show the iOS Cancel button on focus, hide it offscreen otherwise
     */
    positionCancelButton(): void;
    hostData(): {
        class: {
            'searchbar-active': boolean;
            'searchbar-animated': boolean;
            'searchbar-has-value': boolean;
            'searchbar-show-cancel': boolean;
            'searchbar-left-aligned': boolean;
            'searchbar-has-focus': boolean;
        };
    };
    render(): JSX.Element[];
}
