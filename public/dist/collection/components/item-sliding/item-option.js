import { createThemedClasses } from '../../utils/theme';
var ItemOption = (function () {
    function ItemOption() {
        /**
         * @Prop {boolean} If true, sets the button into a disabled state.
         */
        this.disabled = false;
    }
    ItemOption.prototype.notCaptured = function () {
        // if (!clickedOptionButton(ev)) {
        //   this.closeOpened();
        // }
    };
    ItemOption.prototype.clickedOptionButton = function (ev) {
        var ele = ev.target.closest('ion-item-option');
        return !!ele;
    };
    ItemOption.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'item-option-button');
        var TagType = this.href ? 'a' : 'button';
        return (h(TagType, { "c": themedClasses, "o": { "click": this.clickedOptionButton.bind(this) }, "a": { "disabled": this.disabled } },
            h("span", { "c": { "button-inner": true } },
                h(0, 0)),
            h("div", { "c": { "button-effect": true } })));
    };
    return ItemOption;
}());
export { ItemOption };
