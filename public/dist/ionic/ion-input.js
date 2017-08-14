/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents(

/**** module id (dev mode) ****/
"ion-input",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
function createThemedClasses(mode, color, classes) {
    var classObj = {};
    return classes.split(' ')
        .reduce(function (classObj, classString) {
        classObj[classString] = true;
        if (mode) {
            classObj[classString + "-" + mode] = true;
            if (color) {
                classObj[classString + "-" + color] = true;
                classObj[classString + "-" + mode + "-" + color] = true;
            }
        }
        return classObj;
    }, classObj);
}
/**
 * Get the classes from a class list and return them as an object
 */

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

exports['ION-INPUT'] = Input;
exports['ION-TEXTAREA'] = Textarea;
},


/***************** ion-input *****************/
[
/** ion-input: tag **/
"ION-INPUT",

/** ion-input: members **/
[
  [ "accept", /** prop **/ 1 ],
  [ "autocapitalize", /** prop **/ 1 ],
  [ "autocomplete", /** prop **/ 1 ],
  [ "autocorrect", /** prop **/ 1 ],
  [ "autofocus", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "checked", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "clearInput", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "clearOnEdit", /** prop state **/ 2, /** type boolean **/ 1 ],
  [ "disabled", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "el", /** element ref **/ 7 ],
  [ "inputmode", /** prop **/ 1 ],
  [ "max", /** prop **/ 1 ],
  [ "maxlength", /** prop **/ 1, /** type number **/ 2 ],
  [ "min", /** prop **/ 1 ],
  [ "minlength", /** prop **/ 1, /** type number **/ 2 ],
  [ "multiple", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "name", /** prop **/ 1 ],
  [ "pattern", /** prop **/ 1 ],
  [ "placeholder", /** prop **/ 1 ],
  [ "readonly", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "required", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "results", /** prop **/ 1, /** type number **/ 2 ],
  [ "size", /** prop **/ 1, /** type number **/ 2 ],
  [ "spellcheck", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "step", /** prop **/ 1 ],
  [ "type", /** prop **/ 1 ],
  [ "value", /** prop state **/ 2 ]
],

/** ion-input: host **/
{"theme":"input"},

/** ion-input: events **/
[
  [
    /*****  ion-input ionStyle ***** /
    /* event name ***/ "ionStyle"
  ],
  [
    /*****  ion-input ionBlur ***** /
    /* event name ***/ "ionBlur"
  ],
  [
    /*****  ion-input ionFocus ***** /
    /* event name ***/ "ionFocus"
  ]
],

/** ion-input: propWillChanges **/
0 /* no prop will change methods */,

/** ion-input: propDidChanges **/
[
  [
    /*****  ion-input prop did change [0] ***** /
    /* prop name **/ "checked",
    /* call fn *****/ "setChecked"
  ],
  [
    /*****  ion-input prop did change [1] ***** /
    /* prop name **/ "disabled",
    /* call fn *****/ "setDisabled"
  ],
  [
    /*****  ion-input prop did change [2] ***** /
    /* prop name **/ "value",
    /* call fn *****/ "setValue"
  ]
]

],

/***************** ion-textarea *****************/
[
/** ion-textarea: tag **/
"ION-TEXTAREA",

/** ion-textarea: members **/
[
  [ "autocapitalize", /** prop **/ 1 ],
  [ "autocomplete", /** prop **/ 1 ],
  [ "autofocus", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "clearOnEdit", /** prop state **/ 2, /** type boolean **/ 1 ],
  [ "cols", /** prop **/ 1, /** type number **/ 2 ],
  [ "disabled", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "el", /** element ref **/ 7 ],
  [ "maxlength", /** prop **/ 1, /** type number **/ 2 ],
  [ "minlength", /** prop **/ 1, /** type number **/ 2 ],
  [ "name", /** prop **/ 1 ],
  [ "placeholder", /** prop **/ 1 ],
  [ "readonly", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "required", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "rows", /** prop **/ 1, /** type number **/ 2 ],
  [ "spellcheck", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "value", /** prop state **/ 2 ],
  [ "wrap", /** prop **/ 1 ]
],

/** ion-textarea: host **/
{"theme":"input"},

/** ion-textarea: events **/
[
  [
    /*****  ion-textarea ionStyle ***** /
    /* event name ***/ "ionStyle"
  ],
  [
    /*****  ion-textarea ionBlur ***** /
    /* event name ***/ "ionBlur"
  ],
  [
    /*****  ion-textarea ionFocus ***** /
    /* event name ***/ "ionFocus"
  ]
],

/** ion-textarea: propWillChanges **/
0 /* no prop will change methods */,

/** ion-textarea: propDidChanges **/
[
  [
    /*****  ion-textarea prop did change [0] ***** /
    /* prop name **/ "disabled",
    /* call fn *****/ "setDisabled"
  ],
  [
    /*****  ion-textarea prop did change [1] ***** /
    /* prop name **/ "value",
    /* call fn *****/ "setValue"
  ]
]

]
)