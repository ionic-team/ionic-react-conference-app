import { EventEmitter } from '@stencil/core';
import { InputComponent } from './input-base';
export declare class Input implements InputComponent {
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
     * @input {string} If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
     */
    accept: string;
    /**
     * @input {string} Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Defaults to `"none"`.
     */
    autocapitalize: string;
    /**
     * @input {string} Indicates whether the value of the control can be automatically completed by the browser. Defaults to `"off"`.
     */
    autocomplete: string;
    /**
     * @input {string} Whether autocorrection should be enabled when the user is entering/editing the text value. Defaults to `"off"`.
     */
    autocorrect: string;
    /**
     * @input {string} This Boolean attribute lets you specify that a form control should have input focus when the page loads. Defaults to `false`.
     */
    autofocus: boolean;
    /**
     * @input {boolean} If true and the type is `checkbox` or `radio`, the control is selected by default. Defaults to `false`.
     */
    checked: boolean;
    /**
     * @hidden
     */
    setChecked(): void;
    /**
     * @input {boolean} If true, a clear icon will appear in the input when there is a value. Clicking it clears the input. Defaults to `false`.
     */
    clearInput: boolean;
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
     * @input {string} A hint to the browser for which keyboard to display. This attribute applies when the value of the type attribute is `"text"`, `"password"`, `"email"`, or `"url"`. Possible values are: `"verbatim"`, `"latin"`, `"latin-name"`, `"latin-prose"`, `"full-width-latin"`, `"kana"`, `"katakana"`, `"numeric"`, `"tel"`, `"email"`, `"url"`.
     */
    inputmode: string;
    /**
     * @input {string} The maximum value, which must not be less than its minimum (min attribute) value.
     */
    max: string;
    /**
     * @input {number} If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
     */
    maxlength: number;
    /**
     * @input {string} The minimum value, which must not be greater than its maximum (max attribute) value.
     */
    min: string;
    /**
     * @input {number} If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
     */
    minlength: number;
    /**
     * @input {boolean} If true, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.
     */
    multiple: boolean;
    /**
     * @input {string} The name of the control, which is submitted with the form data.
     */
    name: string;
    /**
     * @input {string} A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
     */
    pattern: string;
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
     * @input {number} This is a nonstandard attribute supported by Safari that only applies when the type is `"search"`. Its value should be a nonnegative decimal integer.
     */
    results: number;
    /**
     * @input {string} If true, the element will have its spelling and grammar checked. Defaults to `false`.
     */
    spellcheck: boolean;
    /**
     * @input {string} Works with the min and max attributes to limit the increments at which a value can be set. Possible values are: `"any"` or a positive floating point number.
     */
    step: string;
    /**
     * @input {number} The initial size of the control. This value is in pixels unless the value of the type attribute is `"text"` or `"password"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
     */
    size: number;
    /**
     * @input {string} The type of control to display. The default type is text. Possible values are: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, or `"url"`.
     */
    type: string;
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
    focusChange(inputHasFocus: boolean): void;
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
    clearTextInput(): void;
    /**
     * @hidden
     */
    hasFocus(): boolean;
    /**
     * @hidden
     */
    hasValue(): boolean;
    render(): JSX.Element[];
}
