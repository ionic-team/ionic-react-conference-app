var Tab = (function () {
    function Tab() {
        /**
         * @prop {boolean} If true, the tab is selected
         */
        this.isSelected = false;
        /**
         * @prop {boolean} If true, enable the tab. If false,
         * the user cannot interact with this element.
         * Default: `true`.
         */
        this.enabled = true;
        /**
         * @prop {boolean} If true, the tab button is visible within the
         * tabbar. Default: `true`.
         */
        this.shown = true;
        /**
         * @prop {boolean} If true, hide the tabs on child pages.
         */
        this.tabsHideOnSubPages = false;
    }
    Tab.prototype.hostData = function () {
        return {
            style: {
                display: !this.isSelected && 'none' || ''
            },
            attrs: {
                'role': 'tabpanel'
                //'id': _tabId,
                //aria-labelledby: _btnId
            },
            class: {}
        };
    };
    Tab.prototype["componentDidLoad"] = function () {
        var _this = this;
        setTimeout(function () {
            _this.ionTabDidLoad.emit({ tab: _this });
        }, 0);
    };
    Tab.prototype["componentDidunload"] = function () {
        this.ionTabDidLoad.emit({ tab: this });
    };
    Tab.prototype.render = function () {
        var RootComponent = this.root;
        return [
            h(RootComponent, 0),
            h("div", { "c": { "nav-decor": true } })
        ];
    };
    return Tab;
}());
export { Tab };
