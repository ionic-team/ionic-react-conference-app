import { isRightSide } from '../../utils/helpers';
var ItemOptions = (function () {
    function ItemOptions() {
        /**
         * @input {string} The side the option button should be on. Defaults to `"right"`.
         * If you have multiple `ion-item-options`, a side must be provided for each.
         */
        this.side = 'right';
    }
    /**
     * @output {event} Emitted when the item has been fully swiped.
     */
    // @Event() ionSwipe: EventEmitter;
    /**
     * @hidden
     */
    ItemOptions.prototype.isRightSide = function () {
        var isRTL = document.dir === 'rtl';
        return isRightSide(this.side, isRTL, true);
    };
    /**
     * @hidden
     */
    ItemOptions.prototype.width = function () {
        return this.el.offsetWidth;
    };
    ItemOptions.prototype.render = function () {
        return h(0, 0);
    };
    return ItemOptions;
}());
export { ItemOptions };
