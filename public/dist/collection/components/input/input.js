import { createThemedClasses } from '../../utils/theme';
var Input = (function () {
    function Input() {
        /**
         * @input {string} Indicates whether the value of the control can be automatically completed by the browser. Defaults to `"off"`.
         */
        this.autocomplete = 'off';
        /**
         * @input {string} Whether autocorrection should be enabled when the user is entering/editing the text value. Defaults to `"off"`.
         */
        this.autocorrect = 'off';
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
    Input.prototype.hasValue = function () {
        return (this.value !== null && this.value !== undefined && this.value !== '');
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
    Input.prototype.hasFocus = function () {
        // check if an input has focus or not
        return this.el && (this.el.querySelector(':focus') === this.el.querySelector('input'));
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
        console.debug('Should clear input', this.el);
        this.value = '';
    };
    Input.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'text-input');
        // TODO aria-labelledby={this.item.labelId}
        // OLD RENDER
        // '<input [(ngModel)]="_value" [type]="type" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly" class="text-input" [ngClass]="\'text-input-\' + _mode" *ngIf="_type!==\'textarea\'"  #input>' +
        // '<textarea [(ngModel)]="_value" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly" class="text-input" [ngClass]="\'text-input-\' + _mode" *ngIf="_type===\'textarea\'" #textarea></textarea>' +
        // '<input [type]="type" aria-hidden="true" next-input *ngIf="_useAssist">' +
        // '<ion-button clear [hidden]="!clearInput" type="button" class="text-input-clear-icon" (click)="clearTextInput()" (mousedown)="clearTextInput()"></ion-button>' +
        // '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>',
        return (h("input", { "c": themedClasses, "o": { "blur": this.inputBlurred.bind(this), "input": this.inputChanged.bind(this), "focus": this.inputFocused.bind(this), "keydown": this.inputKeydown.bind(this) }, "a": { "aria-disabled": this.disabled ? 'true' : false, "disabled": this.disabled }, "p": { "autoComplete": this.autocomplete, "autoCorrect": this.autocorrect, "autoFocus": this.autofocus, "checked": this.checked, "min": this.min, "max": this.max, "placeholder": this.placeholder, "readOnly": this.readonly, "spellCheck": this.spellcheck, "step": this.step, "type": this.type, "value": this.value } }));
    };
    return Input;
}());
export { Input };
