var Tabs = (function () {
    function Tabs() {
        /**
         * @state {number} The selected tab index
         */
        this.selectedIndex = 0;
        /**
         * @prop {string} Set the tabbar layout: `icon-top`, `icon-start`, `icon-end`, `icon-bottom`, `icon-hide`, `title-hide`.
         */
        this.tabsLayout = 'icon-top';
        /**
         * @prop {string} Set position of the tabbar: `top`, `bottom`.
         */
        this.tabsPlacement = 'bottom';
        /**
         * @prop {boolean} If true, show the tab highlight bar under the selected tab.
         */
        this.tabsHighlight = false;
    }
    /**
     * If selectedIndex was changed, grab the reference to the tab it points to.
     */
    Tabs.prototype.handleSelectedIndexChanged = function () {
        this.selectedTab = this.tabs[this.selectedIndex];
    };
    Tabs.prototype.tabDidLoad = function (ev) {
        var tab = ev.detail.tab;
        // First tab? Select it
        if (this.tabs.length == 0) {
            this.handleOnTabSelected(tab, 0);
        }
        this.tabs = this.tabs.concat([tab]);
    };
    Tabs.prototype.tabDidUnload = function (ev) {
        this.tabs = this.tabs.filter(function (t) { return t !== ev.detail.tab; });
    };
    Tabs.prototype.handleOnTabSelected = function (tab, index) {
        // Select just this tab
        this.tabs.forEach(function (t) { return t.isSelected = false; });
        tab.isSelected = true;
        // Store the selected tab and index
        this.selectedTab = tab;
        this.selectedIndex = index;
        // Fire a change event
        this.ionChange && this.ionChange(tab);
    };
    Tabs.prototype.render = function () {
        return [
            h("ion-tab-bar", { "p": { "tabs": this.tabs, "onTabSelected": this.handleOnTabSelected.bind(this), "selectedIndex": this.selectedIndex } }),
            h(0, 0)
        ];
    };
    return Tabs;
}());
export { Tabs };
