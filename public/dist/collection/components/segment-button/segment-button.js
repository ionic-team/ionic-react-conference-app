import { createThemedClasses } from '../../utils/theme';
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
     * Get the element classes to add to the child element
     */
    SegmentButton.prototype.getElementClassList = function () {
        var classList = [].concat(this.disabled ? 'segment-button-disabled' : [], this.activated ? 'segment-activated' : []);
        return classList;
    };
    SegmentButton.prototype.render = function () {
        var segmentButtonCss = createThemedClasses(this.mode, this.color, 'segment-button');
        var segmentButtonClasses = []
            .concat(this.getElementClassList())
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        segmentButtonClasses = Object.assign(segmentButtonClasses, segmentButtonCss);
        return [
            h("button", { "c": segmentButtonClasses, "o": { "click": this.segmentButtonClick.bind(this) }, "a": { "aria-pressed": this.activated } },
                h(0, 0))
        ];
    };
    return SegmentButton;
}());
export { SegmentButton };
