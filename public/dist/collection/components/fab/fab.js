import { createThemedClasses } from '../../utils/theme';
var FabButton = (function () {
    function FabButton() {
        this.activated = false;
        this.show = false;
        this.inContainer = false;
        this.inList = false;
        /**
         * @Prop {boolean} If true, sets the button into a disabled state.
         */
        this.disabled = false;
    }
    FabButton.prototype["componentDidLoad"] = function () {
        var parentNode = this.el.parentNode.nodeName;
        this.inList = (parentNode === 'ION-FAB-LIST');
        this.inContainer = (parentNode === 'ION-FAB');
    };
    FabButton.prototype.clickedFab = function () {
        if (this.inContainer) {
            var activated = !this.activated;
            this.setActiveLists(activated);
        }
    };
    /**
     * @hidden
     */
    FabButton.prototype.setActiveLists = function (activated) {
        var lists = this.el.parentElement.querySelectorAll('ion-fab-list');
        if (lists.length > 0) {
            this.activated = activated;
        }
        for (var i = 0; i < lists.length; i++) {
            var list = lists[i].$instance;
            list.activated = activated;
        }
    };
    /**
     * Close an active FAB list container
     */
    FabButton.prototype.close = function () {
        this.setActiveLists(false);
    };
    /**
     * @hidden
     * Get the element classes to add to the child element
     */
    FabButton.prototype.getElementClassList = function () {
        var classList = [].concat(this.el.className.length ? this.el.className.split(' ') : []);
        return classList;
    };
    /**
     * @hidden
     * Get the classes for fab buttons in lists
     */
    FabButton.prototype.getFabListClassList = function () {
        if (!this.inList) {
            return [];
        }
        return [
            "fab-in-list",
            "fab-" + this.mode + "-in-list"
        ];
    };
    /**
     * @hidden
     * Get the close active class for fab buttons
     */
    FabButton.prototype.getFabActiveClassList = function () {
        if (!this.activated) {
            return [];
        }
        return [
            "fab-close-active"
        ];
    };
    /**
     * @hidden
     * Get the show class for fab buttons
     */
    FabButton.prototype.getFabShowClassList = function () {
        if (!this.show) {
            return [];
        }
        return [
            "show"
        ];
    };
    FabButton.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'fab');
        var fabClasses = []
            .concat(this.getElementClassList(), this.getFabListClassList(), this.getFabActiveClassList(), this.getFabShowClassList())
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        var TagType = this.href ? 'a' : 'button';
        fabClasses = Object.assign(fabClasses, themedClasses);
        return (h(TagType, { "c": fabClasses, "o": { "click": this.clickedFab.bind(this) }, "a": { "disabled": this.disabled } },
            h("ion-icon", { "c": { "fab-close-icon": true }, "a": { "name": "close" } }),
            h("span", { "c": { "button-inner": true } },
                h(0, 0)),
            h("div", { "c": { "button-effect": true } })));
    };
    return FabButton;
}());
export { FabButton };
