/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents(

/**** module id (dev mode) ****/
"ion-tab",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
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

var TabBar = (function () {
    function TabBar() {
        this.selectedIndex = 0;
        /**
         * @prop {string} Set the tabbar layout: `icon-top`, `icon-start`, `icon-end`, `icon-bottom`, `icon-hide`, `title-hide`.
         */
        this.tabsLayout = 'icon-top';
        /*
      
        hostData() {
          return {
            attrs: {
              'role': 'tablist'
            },
            class: {
              'tabbar': true
            }
          }
        }
      
        handleTabButtonClick(tab, index) {
          this.onTabSelected && this.onTabSelected(tab, index);
        }
      
        render() {
          return (
            <div class="tabbar" role="tablist">
              {this.tabs.map((tab, index) => {
              return (
                <ion-tab-button role="tab"
                                tab={tab}
                                selectedIndex={this.selectedIndex}
                                index={index}
                                onClick={this.handleTabButtonClick.bind(this, tab, index)}
                                layout={this.tabsLayout}></ion-tab-button>
              )
              })}
            </div>
          )
        }
        */
    }
    return TabBar;
}());

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

var TabHighlight = (function () {
    function TabHighlight() {
    }
    TabHighlight.prototype.render = function () {
        return (h("div", 0));
    };
    return TabHighlight;
}());

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

exports['ION-TAB'] = Tab;
exports['ION-TAB-BAR'] = TabBar;
exports['ION-TAB-BUTTON'] = TabButton;
exports['ION-TAB-HIGHLIGHT'] = TabHighlight;
exports['ION-TABS'] = Tabs;
},


/***************** ion-tab *****************/
[
/** ion-tab: tag **/
"ION-TAB",

/** ion-tab: members **/
[
  [ "enabled", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "isSelected", /** state **/ 5 ],
  [ "onSelected", /** prop **/ 1 ],
  [ "root", /** prop **/ 1 ],
  [ "rootParams", /** prop **/ 1 ],
  [ "shown", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "tabBadge", /** prop **/ 1 ],
  [ "tabBadgeStyle", /** prop **/ 1 ],
  [ "tabIcon", /** prop **/ 1 ],
  [ "tabsHideOnSubPages", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "tabTitle", /** prop **/ 1 ]
],

/** ion-tab: host **/
{"theme":"tab"},

/** ion-tab: events **/
[
  [
    /*****  ion-tab ionTabDidLoad ***** /
    /* event name ***/ "ionTabDidLoad"
  ]
]

],

/***************** ion-tab-bar *****************/
[
/** ion-tab-bar: tag **/
"ION-TAB-BAR",

/** ion-tab-bar: members **/
[
  [ "onTabSelected", /** prop **/ 1 ],
  [ "selectedIndex", /** prop **/ 1, /** type number **/ 2 ],
  [ "tabs", /** prop **/ 1 ],
  [ "tabsLayout", /** prop **/ 1 ]
],

/** ion-tab-bar: host **/
{"theme":"tabbar"}

],

/***************** ion-tab-button *****************/
[
/** ion-tab-button: tag **/
"ION-TAB-BUTTON",

/** ion-tab-button: members **/
[
  [ "index", /** prop **/ 1, /** type number **/ 2 ],
  [ "layout", /** prop **/ 1 ],
  [ "selectedIndex", /** prop **/ 1, /** type number **/ 2 ],
  [ "tab", /** prop **/ 1 ]
],

/** ion-tab-button: host **/
{"theme":"tab-button"}

],

/***************** ion-tab-highlight *****************/
[
/** ion-tab-highlight: tag **/
"ION-TAB-HIGHLIGHT",

/** ion-tab-highlight: members **/
0 /* no members */,

/** ion-tab-highlight: host **/
{}

],

/***************** ion-tabs *****************/
[
/** ion-tabs: tag **/
"ION-TABS",

/** ion-tabs: members **/
[
  [ "ionChange", /** prop **/ 1 ],
  [ "selectedIndex", /** state **/ 5 ],
  [ "selectedTab", /** state **/ 5 ],
  [ "tabs", /** state **/ 5 ],
  [ "tabsHighlight", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "tabsLayout", /** prop **/ 1 ],
  [ "tabsPlacement", /** prop **/ 1 ]
],

/** ion-tabs: host **/
{"theme":"tabs"},

/** ion-tabs: events **/
0 /* no events */,

/** ion-tabs: propWillChanges **/
0 /* no prop will change methods */,

/** ion-tabs: propDidChanges **/
[
  [
    /*****  ion-tabs prop did change [0] ***** /
    /* prop name **/ "selectedIndex",
    /* call fn *****/ "handleSelectedIndexChanged"
  ]
]

]
)