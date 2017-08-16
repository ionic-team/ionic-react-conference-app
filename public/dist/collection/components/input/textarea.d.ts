import { EventEmitter } from '@stencil/core';
import { TextareaComponent } from './input-base';
/**
 * @name TextArea
 * @description
 *
 * `ion-textarea` is used for multi-line text inputs. Ionic still
 * uses an actual `<textarea>` HTML element within the component;
 * however, with Ionic wrapping the native HTML text area element, Ionic
 * is able to better handle the user experience and interactivity.
 *
 * Note that `<ion-textarea>` must load its value from the `value` or
 * `[(ngModel)]` attribute. Unlike the native `<textarea>` element,
 * `<ion-textarea>` does not support loading its value from the
 * textarea's inner content.
 *
 * When requiring only a single-line text input, we recommend using
 * `<ion-input>` instead.
 *
 * @usage
 * ```html
 *  <ion-item>
 *    <ion-label>Comments</ion-label>
 *    <ion-textarea></ion-textarea>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label stacked>Message</ion-label>
 *    <ion-textarea [(ngModel)]="msg"></ion-textarea>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label floating>Description</ion-label>
 *    <ion-textarea></ion-textarea>
 *  </ion-item>
 *
 * <ion-item>
 *    <ion-label>Long Description</ion-label>
 *    <ion-textarea rows="6" placeholder="enter long description here..."></ion-textarea>
 *  </ion-item>
 * ```
 *
 * @demo /docs/demos/src/textarea/
 */
export declare class Textarea implements TextareaComponent {
    mode: string;
    color: string;
    didBlurAfterEdit: boolean;
    styleTmr: number;
    el: HTMLElement;
    /**
     * @output {event} Emitted when the styles change.
     */
    ionStyle: EventEmitter;
    /**
     * @output {event} Emitted when the input no longer has focus.
     */
    ionBlur: EventEmitter;
    /**
     * @output {event} Emitted when the input has focus.
     */
    ionFocus: EventEmitter;
    /**
     * @input {string} Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Defaults to `"none"`.
     */
    autocapitalize: string;
    /**
     * @input {string} Indicates whether the value of the control can be automatically completed by the browser. Defaults to `"off"`.
     */
    autocomplete: string;
    /**
     * @input {string} This Boolean attribute lets you specify that a form control should have input focus when the page loads. Defaults to `false`.
     */
    autofocus: boolean;
    /**
     * @input {boolean} If true, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
     */
    clearOnEdit: boolean;
    /**
     * @input {boolean} If true, the user cannot interact with this element. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * @hidden
     */
    setDisabled(): void;
    /**
     * @input {number} If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
     */
    maxlength: number;
    /**
     * @input {number} If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
     */
    minlength: number;
    /**
     * @input {string} The name of the control, which is submitted with the form data.
     */
    name: string;
    /**
     * @input {string} Instructional text that shows before the input has a value.
     */
    placeholder: string;
    /**
     * @input {boolean} If true, the user cannot modify the value. Defaults to `false`.
     */
    readonly: boolean;
    /**
     * @input {boolean} If true, the user must fill in a value before submitting a form.
     */
    required: boolean;
    /**
     * @input {string} If true, the element will have its spelling and grammar checked. Defaults to `false`.
     */
    spellcheck: boolean;
    /**
     * @input {number} The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.
     */
    cols: number;
    /**
     * @input {number} The number of visible text lines for the control.
     */
    rows: number;
    /**
     * @input {string} Indicates how the control wraps text. Possible values are: `"hard"`, `"soft"`, `"off"`.
     */
    wrap: string;
    /**
     * @input {string} The text value of the input.
     */
    value: string;
    /**
     * @hidden
     * Update the native input element when the value changes
     */
    setValue(): void;
    ionViewDidLoad(): void;
    private emitStyle();
    /**
     * @hidden
     */
    clearTextInput(): void;
    /**
     * @hidden
     */
    inputBlurred(ev: any): void;
    /**
     * @hidden
     */
    inputChanged(ev: any): void;
    /**
     * @hidden
     */
    inputFocused(ev: any): void;
    /**
     * @hidden
     */
    inputKeydown(): void;
    /**
    * Check if we need to clear the text input if clearOnEdit is enabled
    * @hidden
    */
    checkClearOnEdit(): void;
    /**
     * @hidden
     */
    focusChange(inputHasFocus: boolean): void;
    /**
     * @hidden
     */
    hasFocus(): boolean;
    /**
     * @hidden
     */
    hasValue(): boolean;
    render(): JSX.Element;
}
