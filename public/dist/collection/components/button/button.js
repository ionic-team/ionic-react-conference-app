var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { getElementClassObject } from '../../utils/theme';
var Button = (function () {
    function Button() {
        this.itemButton = false;
        /**
         * @Prop {string} The type of button.
         * Possible values are: `"button"`, `"bar-button"`.
         */
        this.buttonType = 'button';
        /**
         * @Prop {boolean} If true, activates the large button size.
         * Type: size
         */
        this.large = false;
        /**
         * @Prop {boolean} If true, activates the small button size.
         * Type: size
         */
        this.small = false;
        /**
         * @Prop {boolean} If true, activates the default button size. Normally the default, useful for buttons in an item.
         * Type: size
         */
        this.default = false;
        /**
         * @Prop {boolean} If true, sets the button into a disabled state.
         */
        this.disabled = false;
        /**
         * @Prop {boolean} If true, activates a transparent button style with a border.
         * Type: style
         */
        this.outline = false;
        /**
         * @Prop {boolean} If true, activates a transparent button style without a border.
         * Type: style
         */
        this.clear = false;
        /**
         * @Prop {boolean} If true, activates a solid button style. Normally the default, useful for buttons in a toolbar.
         * Type: style
         */
        this.solid = false;
        /**
         * @Prop {boolean} If true, activates a button with rounded corners.
         * Type: shape
         */
        this.round = false;
        /**
         * @Prop {boolean} If true, activates a button style that fills the available width.
         * Type: display
         */
        this.block = false;
        /**
         * @Prop {boolean} If true, activates a button style that fills the available width without
         * a left and right border.
         * Type: display
         */
        this.full = false;
        /**
         * @Prop {boolean} If true, activates a button with a heavier font weight.
         * Type: decorator
         */
        this.strong = false;
    }
    Button.prototype.render = function () {
        var buttonType = this.buttonType;
        var mode = this.mode;
        var size = (this.large ? 'large' : null) ||
            (this.small ? 'small' : null) ||
            (this.default ? 'default' : null);
        var shape = (this.round ? 'round' : null);
        var display = (this.block ? 'block' : null) ||
            (this.full ? 'full' : null);
        var decorator = (this.strong ? 'strong' : null);
        var hostClasses = getElementClassObject(this.el.classList);
        var elementClasses = []
            .concat(getButtonClassList(buttonType, mode), getClassList(buttonType, shape, mode), getClassList(buttonType, display, mode), getClassList(buttonType, size, mode), getClassList(buttonType, decorator, mode), getStyleClassList(mode, this.color, buttonType, this.outline, this.clear, this.solid), getItemClassList(this.itemButton, size))
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        var TagType = this.href ? 'a' : 'button';
        var buttonClasses = __assign({}, hostClasses, elementClasses);
        return (h(TagType, { "c": buttonClasses, "a": { "disabled": this.disabled } },
            h("span", { "c": { "button-inner": true } },
                h(0, { "a": { "name": 'icon-only' } }),
                h(0, { "a": { "name": 'start' } }),
                h(0, 0),
                h(0, { "a": { "name": 'end' } })),
            h("div", { "c": { "button-effect": true } })));
    };
    return Button;
}());
export { Button };
/**
 * Get the classes based on the button type
 * e.g. alert-button, action-sheet-button
 */
function getButtonClassList(buttonType, mode) {
    if (!buttonType) {
        return [];
    }
    return [
        buttonType,
        buttonType + "-" + mode
    ];
}
/**
 * Get the classes based on the type
 * e.g. block, full, round, large
 */
function getClassList(buttonType, type, mode) {
    if (!type) {
        return [];
    }
    type = type.toLocaleLowerCase();
    return [
        buttonType + "-" + type,
        buttonType + "-" + type + "-" + mode
    ];
}
/**
 * Get the classes for the color
 */
function getColorClassList(color, buttonType, style, mode) {
    style = (buttonType !== 'bar-button' && style === 'solid') ? 'default' : style;
    var className = buttonType +
        ((style && style !== 'default') ?
            '-' + style.toLowerCase() :
            '');
    // special case for a default bar button
    // if the bar button is default it should get the style
    // but if a color is passed the style shouldn't be added
    if (buttonType === 'bar-button' && style === 'default') {
        className = buttonType;
        if (!color) {
            className += '-' + style.toLowerCase();
        }
    }
    return [className + "-" + mode].concat(style !== 'default' ? "" + className : [], color ? className + "-" + mode + "-" + color : []);
}
/**
 * Get the classes for the style
 * e.g. outline, clear, solid
 */
function getStyleClassList(mode, color, buttonType, outline, clear, solid) {
    var classList = [].concat(outline ? getColorClassList(color, buttonType, 'outline', mode) : [], clear ? getColorClassList(color, buttonType, 'clear', mode) : [], solid ? getColorClassList(color, buttonType, 'solid', mode) : []);
    if (classList.length === 0) {
        classList = getColorClassList(color, buttonType, 'default', mode);
    }
    return classList;
}
/**
 * Get the item classes for the button
 */
function getItemClassList(itemButton, size) {
    return itemButton && !size ? ['item-button'] : [];
}
