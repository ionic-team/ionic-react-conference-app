var TabButton = (function () {
    function TabButton() {
    }
    TabButton.prototype.hostData = function () {
        var tab = this.tab;
        if (!tab)
            return {};
        // attr.id
        // attr.aria-controls
        var hasTitle = !!tab.tabTitle;
        var hasIcon = !!tab.tabIcon && this.layout !== 'icon-hide';
        var hasTitleOnly = (hasTitle && !hasIcon);
        var hasIconOnly = (hasIcon && !hasTitle);
        var hasBadge = !!tab.tabBadge;
        // class.disable-hover
        // class.tab-disabled
        // class.tab-hidden
        return {
            attrs: {
                'aria-selected': this.selectedIndex == this.index
            },
            class: {
                'has-title': hasTitle,
                'has-icon': hasIcon,
                'has-title-only': hasTitleOnly,
                'has-icon-only': hasIconOnly,
                'has-badge': hasBadge
            }
        };
    };
    TabButton.prototype.render = function () {
        if (!this.tab) {
            return null;
        }
        var tab = this.tab;
        // TODO: Apply these on host?
        /*
        let { id, ariaControls, ariaSelected, hasTitle, hasIcon, hasTitleOnly,
        iconOnly, hasBadge, disableHover, tabDisabled, tabHidden } = {};
        */
        var items = [];
        if (tab.tabIcon) {
            items.push(h("ion-icon", { "c": { "tab-button-icon": true }, "p": { "name": tab.tabIcon } }));
        }
        if (tab.tabTitle) {
            items.push(h("span", { "c": { "tab-button-text": true } }, tab.tabTitle));
        }
        if (tab.tabBadge) {
            items.push(h("ion-badge", { "c": { "tab-badge": true }, "p": { "color": tab.tabBadgeStyle } }, tab.tabBadge));
        }
        items.push(h("div", { "c": { "button-effect": true } }));
        return (items);
    };
    return TabButton;
}());
export { TabButton };
