import { createThemedClasses } from '../../utils/theme';
var Textarea = (function () {
    function Textarea() {
        /**
         * @input {string} Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Defaults to `"none"`.
         */
        this.autocapitalize = 'none';
        /**
         * @input {string} Indicates whether the value of the control can be automatically completed by the browser. Defaults to `"off"`.
         */
        this.autocomplete = 'off';
        /**
         * @input {string} This Boolean attribute lets you specify that a form control should have input focus when the page loads. Defaults to `false`.
         */
        this.autofocus = false;
        /**
         * @input {boolean} If true, the user cannot interact with this element. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * @input {boolean} If true, the user cannot modify the value. Defaults to `false`.
         */
        this.readonly = false;
        /**
         * @input {boolean} If true, the user must fill in a value before submitting a form.
         */
        this.required = false;
        /**
         * @input {string} If true, the element will have its spelling and grammar checked. Defaults to `false`.
         */
        this.spellcheck = false;
    }
    /**
     * @hidden
     */
    Textarea.prototype.setDisabled = function () {
        this.emitStyle();
    };
    /**
     * @hidden
     * Update the native input element when the value changes
     */
    Textarea.prototype.setValue = function () {
        var inputEl = this.el.querySelector('textarea');
        if (inputEl.value !== this.value) {
            inputEl.value = this.value;
        }
    };
    Textarea.prototype["componentDidLoad"] = function () {
        this.emitStyle();
    };
    Textarea.prototype.emitStyle = function () {
        var _this = this;
        clearTimeout(this.styleTmr);
        var styles = {
            'textarea': true,
            'input': true,
            'input-disabled': this.disabled,
            'input-has-value': this.hasValue(),
            'input-has-focus': this.hasFocus()
        };
        this.styleTmr = setTimeout(function () {
            _this.ionStyle.emit(styles);
        });
    };
    /**
     * @hidden
     */
    Textarea.prototype.clearTextInput = function () {
        this.value = '';
    };
    /**
     * @hidden
     */
    Textarea.prototype.inputBlurred = function (ev) {
        this.ionBlur.emit(ev);
        this.focusChange(this.hasFocus());
        this.emitStyle();
    };
    /**
     * @hidden
     */
    Textarea.prototype.inputChanged = function (ev) {
        this.value = ev.target && ev.target.value;
        this.emitStyle();
    };
    /**
     * @hidden
     */
    Textarea.prototype.inputFocused = function (ev) {
        this.ionFocus.emit(ev);
        this.focusChange(this.hasFocus());
        this.emitStyle();
    };
    /**
     * @hidden
     */
    Textarea.prototype.inputKeydown = function () {
        this.checkClearOnEdit();
    };
    /**
    * Check if we need to clear the text input if clearOnEdit is enabled
    * @hidden
    */
    Textarea.prototype.checkClearOnEdit = function () {
        if (!this.clearOnEdit) {
            return;
        }
        // Did the input value change after it was blurred and edited?
        if (this.didBlurAfterEdit && this.hasValue()) {
            // Clear the input
            this.clearTextInput();
        }
        // Reset the flag
        this.didBlurAfterEdit = false;
    };
    /**
     * @hidden
     */
    Textarea.prototype.focusChange = function (inputHasFocus) {
        // If clearOnEdit is enabled and the input blurred but has a value, set a flag
        if (this.clearOnEdit && !inputHasFocus && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
    };
    /**
     * @hidden
     */
    Textarea.prototype.hasFocus = function () {
        // check if an input has focus or not
        return this.el && (this.el.querySelector(':focus') === this.el.querySelector('textarea'));
    };
    /**
     * @hidden
     */
    Textarea.prototype.hasValue = function () {
        return (this.value !== null && this.value !== undefined && this.value !== '');
    };
    Textarea.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'text-input');
        // TODO aria-labelledby={this.item.labelId}
        return (h("textarea", { "c": themedClasses, "o": { "blur": this.inputBlurred.bind(this), "input": this.inputChanged.bind(this), "focus": this.inputFocused.bind(this), "keydown": this.inputKeydown.bind(this) }, "a": { "disabled": this.disabled }, "p": { "autoCapitalize": this.autocapitalize, "autoFocus": this.autofocus, "maxLength": this.maxlength, "minLength": this.minlength, "name": this.name, "placeholder": this.placeholder, "readOnly": this.readonly, "required": this.required, "spellCheck": this.spellcheck, "cols": this.cols, "rows": this.rows, "wrap": this.wrap } }, this.value));
    };
    return Textarea;
}());
export { Textarea };
