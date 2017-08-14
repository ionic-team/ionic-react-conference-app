var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { createThemedClasses, getElementClassObject } from '../../utils/theme';
var SegmentButton = (function () {
    function SegmentButton() {
        this.activated = false;
        /*
         * @input {boolean} If true, the button is selected. Default false.
         */
        this.checked = false;
        /*
         * @input {boolean} If true, the user cannot interact with this element. Default false.
         */
        this.disabled = false;
    }
    SegmentButton.prototype.segmentButtonClick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        console.log('in segment button click');
        this.emitClick();
    };
    /**
     * Emit the click event to the parent segment
     */
    SegmentButton.prototype.emitClick = function () {
        var _this = this;
        clearTimeout(this.styleTmr);
        this.styleTmr = setTimeout(function () {
            var ev = {
                'segmentButton': _this
            };
            _this.ionClick.emit(ev);
        });
    };
    /**
     * @hidden
     * Get the classes for the segment button state
     */
    SegmentButton.prototype.getElementClassList = function () {
        var classList = [].concat(this.disabled ? 'segment-button-disabled' : [], this.activated ? 'segment-activated' : []);
        return classList;
    };
    SegmentButton.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'segment-button');
        var hostClasses = getElementClassObject(this.el.classList);
        var elementClasses = []
            .concat(this.getElementClassList())
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        var buttonClasses = __assign({}, themedClasses, hostClasses, elementClasses);
        return [
            h("button", { "c": buttonClasses, "o": { "click": this.segmentButtonClick.bind(this) }, "a": { "aria-pressed": this.activated } },
                h(0, 0))
        ];
    };
    return SegmentButton;
}());
export { SegmentButton };
