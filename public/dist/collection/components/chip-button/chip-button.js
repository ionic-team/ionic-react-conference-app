var ChipButton = (function () {
    function ChipButton() {
        /**
         * @Prop {boolean} If true, activates a transparent button style.
         */
        this.clear = false;
        /**
         * @Prop {boolean} If true, sets the button into a disabled state.
         */
        this.disabled = false;
    }
    /**
     * @hidden
     * Get the classes based on the button type
     * e.g. alert-button, action-sheet-button
     */
    ChipButton.prototype.getButtonClassList = function (buttonType, mode) {
        if (!buttonType) {
            return [];
        }
        return [
            buttonType,
            buttonType + "-" + mode
        ];
    };
    /**
     * @hidden
     * Get the classes for the color
     */
    ChipButton.prototype.getColorClassList = function (color, buttonType, style, mode) {
        var className = (style === 'default') ? "" + buttonType : buttonType + "-" + style;
        return [className + "-" + mode].concat(style !== 'default' ? "" + className : [], color ? className + "-" + mode + "-" + color : []);
    };
    /**
     * @hidden
     * Get the classes for the style
     * Chip buttons can only be clear or default (solid)
     */
    ChipButton.prototype.getStyleClassList = function (buttonType) {
        var classList = [].concat(this.clear ? this.getColorClassList(this.color, buttonType, 'clear', this.mode) : []);
        if (classList.length === 0) {
            classList = this.getColorClassList(this.color, buttonType, 'default', this.mode);
        }
        return classList;
    };
    /**
     * @hidden
     * Get the element classes to add to the child element
     */
    ChipButton.prototype.getElementClassList = function () {
        var classList = [].concat(this.el.className.length ? this.el.className.split(' ') : []);
        return classList;
    };
    ChipButton.prototype.render = function () {
        var buttonType = 'chip-button';
        var buttonClasses = []
            .concat(this.getButtonClassList(buttonType, this.mode), this.getElementClassList(), this.getStyleClassList(buttonType))
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        var TagType = this.href ? 'a' : 'button';
        return (h(TagType, { "c": buttonClasses, "a": { "disabled": this.disabled } },
            h("span", { "c": { "button-inner": true } },
                h(0, 0)),
            h("div", { "c": { "button-effect": true } })));
    };
    return ChipButton;
}());
export { ChipButton };
