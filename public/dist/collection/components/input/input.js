import { createThemedClasses } from '../../utils/theme';
var Input = (function () {
    function Input() {
        /**
         * @input {string} Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Defaults to `"none"`.
         */
        this.autocapitalize = 'none';
        /**
         * @input {string} Indicates whether the value of the control can be automatically completed by the browser. Defaults to `"off"`.
         */
        this.autocomplete = 'off';
        /**
         * @input {string} Whether autocorrection should be enabled when the user is entering/editing the text value. Defaults to `"off"`.
         */
        this.autocorrect = 'off';
        /**
         * @input {string} This Boolean attribute lets you specify that a form control should have input focus when the page loads. Defaults to `false`.
         */
        this.autofocus = false;
        /**
         * @input {boolean} If true and the type is `checkbox` or `radio`, the control is selected by default. Defaults to `false`.
         */
        this.checked = false;
        /**
         * @input {boolean} If true, a clear icon will appear in the input when there is a value. Clicking it clears the input. Defaults to `false`.
         */
        this.clearInput = false;
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
        /**
         * @input {string} The type of control to display. The default type is text. Possible values are: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, or `"url"`.
         */
        this.type = 'text';
    }
    /**
     * @hidden
     */
    Input.prototype.setChecked = function () {
        this.emitStyle();
    };
    /**
     * @hidden
     */
    Input.prototype.setDisabled = function () {
        this.emitStyle();
    };
    /**
     * @hidden
     * Update the native input element when the value changes
     */
    Input.prototype.setValue = function () {
        var inputEl = this.el.querySelector('input');
        if (inputEl.value !== this.value) {
            inputEl.value = this.value;
        }
    };
    Input.prototype["componentDidLoad"] = function () {
        this.emitStyle();
        // By default, password inputs clear after focus when they have content
        if (this.type === 'password' && this.clearOnEdit !== false) {
            this.clearOnEdit = true;
        }
    };
    Input.prototype.emitStyle = function () {
        var _this = this;
        clearTimeout(this.styleTmr);
        var styles = {
            'input': true,
            'input-checked': this.checked,
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
    Input.prototype.inputBlurred = function (ev) {
        this.ionBlur.emit(ev);
        this.focusChange(this.hasFocus());
        this.emitStyle();
    };
    /**
     * @hidden
     */
    Input.prototype.inputChanged = function (ev) {
        this.value = ev.target && ev.target.value;
        this.emitStyle();
    };
    /**
     * @hidden
     */
    Input.prototype.inputFocused = function (ev) {
        this.ionFocus.emit(ev);
        this.focusChange(this.hasFocus());
        this.emitStyle();
    };
    /**
     * @hidden
     */
    Input.prototype.focusChange = function (inputHasFocus) {
        // If clearOnEdit is enabled and the input blurred but has a value, set a flag
        if (this.clearOnEdit && !inputHasFocus && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
    };
    /**
     * @hidden
     */
    Input.prototype.inputKeydown = function () {
        this.checkClearOnEdit();
    };
    /**
    * Check if we need to clear the text input if clearOnEdit is enabled
    * @hidden
    */
    Input.prototype.checkClearOnEdit = function () {
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
    Input.prototype.clearTextInput = function () {
        this.value = '';
    };
    /**
     * @hidden
     */
    Input.prototype.hasFocus = function () {
        // check if an input has focus or not
        return this.el && (this.el.querySelector(':focus') === this.el.querySelector('input'));
    };
    /**
     * @hidden
     */
    Input.prototype.hasValue = function () {
        return (this.value !== null && this.value !== undefined && this.value !== '');
    };
    Input.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'text-input');
        // TODO aria-labelledby={this.item.labelId}
        return [
            h("input", { "c": themedClasses, "o": { "blur": this.inputBlurred.bind(this), "input": this.inputChanged.bind(this), "focus": this.inputFocused.bind(this), "keydown": this.inputKeydown.bind(this) }, "a": { "aria-disabled": this.disabled ? 'true' : false, "disabled": this.disabled }, "p": { "accept": this.accept, "autoCapitalize": this.autocapitalize, "autoComplete": this.autocomplete, "autoCorrect": this.autocorrect, "autoFocus": this.autofocus, "checked": this.checked, "inputMode": this.inputmode, "min": this.min, "max": this.max, "minLength": this.minlength, "maxLength": this.maxlength, "multiple": this.multiple, "name": this.name, "pattern": this.pattern, "placeholder": this.placeholder, "results": this.results, "readOnly": this.readonly, "required": this.required, "spellCheck": this.spellcheck, "step": this.step, "size": this.size, "type": this.type, "value": this.value } }),
            h("button", { "c": { "text-input-clear-icon": true }, "o": { "click": this.clearTextInput.bind(this), "mousedown": this.clearTextInput.bind(this) }, "a": { "hidden": this.clearInput !== true } })
        ];
    };
    return Input;
}());
export { Input };
