/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-app.ion-content.ion-fixed.ion-footer.ion-heade',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
var App = (function () {
    function App() {
    }
    App.prototype.render = function () {
        return h(0, 0);
    };
    return App;
}());

function createThemedClasses(mode, color, classList) {
    var allClassObj = {};
    return classList.split(' ')
        .reduce(function (classObj, classString) {
        classObj[classString] = true;
        if (mode) {
            classObj[classString + "-" + mode] = true;
            if (color) {
                classObj[classString + "-" + color] = true;
                classObj[classString + "-" + mode + "-" + color] = true;
            }
        }
        return classObj;
    }, allClassObj);
}

function getParentElement(elm) {
    if (elm.parentElement) {
        // normal element with a parent element
        return elm.parentElement;
    }
    if (elm.parentNode && elm.parentNode.host) {
        // shadow dom's document fragment
        return elm.parentNode.host;
    }
    return null;
}

function getToolbarHeight(toolbarTagName, pageChildren, mode, iosHeight, defaultHeight) {
    for (var i = 0; i < pageChildren.length; i++) {
        if (pageChildren[i].tagName === toolbarTagName) {
            var headerHeight = pageChildren[i].getAttribute(mode + "-height");
            if (headerHeight) {
                return headerHeight;
            }
            if (mode === 'ios') {
                return iosHeight;
            }
            return defaultHeight;
        }
    }
    return '';
}
/**
 * @hidden
 * Given a side, return if it should be on the right
 * based on the value of dir
 * @param side the side
 * @param isRTL whether the application dir is rtl
 * @param defaultRight whether the default side is right
 */

/** @hidden */

var Content = (function () {
    function Content() {
        this.$scrollDetail = {};
        /**
         * @input {boolean} If true, the content will scroll behind the headers
         * and footers. This effect can easily be seen by setting the toolbar
         * to transparent.
         */
        this.fullscreen = false;
    }
    Content.prototype["componentDidunload"] = function () {
        this.$fixed = this.$scroll = this.$siblingFooter = this.$siblingHeader = this.$scrollDetail = null;
    };
    Content.prototype.enableJsScroll = function () {
        this.$scroll.jsScroll = true;
    };
    /**
     * Scroll to the top of the content component.
     *
     * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
     * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
     */
    Content.prototype.scrollToTop = function (duration) {
        if (duration === void 0) { duration = 300; }
        return this.$scroll.scrollToTop(duration);
    };
    /**
     * Scroll to the bottom of the content component.
     *
     * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
     * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
     */
    Content.prototype.scrollToBottom = function (duration) {
        if (duration === void 0) { duration = 300; }
        return this.$scroll.scrollToBottom(duration);
    };
    Content.prototype.render = function () {
        var props = {};
        var scrollStyle = {};
        var pageChildren = getParentElement(this.el).children;
        var headerHeight = getToolbarHeight('ION-HEADER', pageChildren, this.mode, '44px', '56px');
        var footerHeight = getToolbarHeight('ION-FOOTER', pageChildren, this.mode, '50px', '48px');
        if (this.fullscreen) {
            scrollStyle.paddingTop = headerHeight;
            scrollStyle.paddingBottom = footerHeight;
        }
        else {
            scrollStyle.marginTop = headerHeight;
            scrollStyle.marginBottom = footerHeight;
        }
        if (this.ionScrollStart) {
            props['ionScrollStart'] = this.ionScrollStart.bind(this);
        }
        if (this.ionScroll) {
            props['ionScroll'] = this.ionScroll.bind(this);
        }
        if (this.ionScrollEnd) {
            props['ionScrollEnd'] = this.ionScrollEnd.bind(this);
        }
        var themedClasses = createThemedClasses(this.mode, this.color, 'content');
        themedClasses['statusbar-padding'] = Ionic.config.getBoolean('statusbarPadding');
        return (h("ion-scroll", { "s": scrollStyle, "p": props, "c": themedClasses },
            h(0, 0)));
    };
    return Content;
}());

var Fixed = (function () {
    function Fixed() {
    }
    Fixed.prototype.hostData = function () {
        var pageChildren = getParentElement(this.el).children;
        var headerHeight = getToolbarHeight('ION-HEADER', pageChildren, this.mode, '44px', '56px');
        var footerHeight = getToolbarHeight('ION-FOOTER', pageChildren, this.mode, '50px', '48px');
        return {
            class: {
                'statusbar-padding': Ionic.config.getBoolean('statusbarPadding')
            },
            style: {
                'margin-top': headerHeight,
                'margin-bottom': footerHeight
            }
        };
    };
    Fixed.prototype.render = function () {
        return (h(0, 0));
    };
    return Fixed;
}());

var Footer = (function () {
    function Footer() {
    }
    Footer.prototype.render = function () {
        return h(0, 0);
    };
    return Footer;
}());

var Header = (function () {
    function Header() {
    }
    Header.prototype.render = function () {
        return h(0, 0);
    };
    return Header;
}());

var Navbar = (function () {
    function Navbar() {
        this.sbPadding = Ionic.config.getBoolean('statusbarPadding');
        this.hideBackButton = false;
        this.backButtonText = Ionic.config.get('backButtonText', 'Back');
        this.backButtonIcon = Ionic.config.get('backButtonIcon');
        this.hidden = false;
    }
    Navbar.prototype.backButtonClick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        console.log('back button click');
    };
    Navbar.prototype["componentDidLoad"] = function () {
        var buttons = this.el.querySelectorAll('ion-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('button-type', 'bar-button');
        }
    };
    Navbar.prototype.hostData = function () {
        return {
            class: {
                'statusbar-padding': Ionic.config.getBoolean('statusbarPadding')
            }
        };
    };
    Navbar.prototype.render = function () {
        var backgroundCss = createThemedClasses(this.mode, this.color, 'toolbar-background');
        var contentCss = createThemedClasses(this.mode, this.color, 'toolbar-content');
        var backButtonCss = createThemedClasses(this.mode, this.color, 'back-button');
        var backButtonIconCss = createThemedClasses(this.mode, this.color, 'back-button-icon');
        var backButtonTextCss = createThemedClasses(this.mode, this.color, 'back-button-text');
        return [
            h("div", { "c": backgroundCss }),
            h("button", { "c": backButtonCss, "o": { "click": this.backButtonClick.bind(this) }, "a": { "hidden": this.hideBackButton } },
                h("ion-icon", { "c": backButtonIconCss, "p": { "name": this.backButtonIcon } }),
                h("span", { "c": backButtonTextCss }, this.backButtonText)),
            h(0, { "a": { "name": 'start' } }),
            h(0, { "a": { "name": 'mode-start' } }),
            h(0, { "a": { "name": 'mode-end' } }),
            h(0, { "a": { "name": 'end' } }),
            h("div", { "c": contentCss },
                h(0, 0))
        ];
    };
    return Navbar;
}());

var Page = (function () {
    function Page() {
    }
    Page.prototype.render = function () {
        return h(0, 0);
    };
    return Page;
}());

var ToolbarTitle = (function () {
    function ToolbarTitle() {
    }
    ToolbarTitle.prototype.render = function () {
        var titleClasses = createThemedClasses(this.mode, this.color, 'toolbar-title');
        return [
            h("div", { "c": titleClasses },
                h(0, 0))
        ];
    };
    return ToolbarTitle;
}());

var Toolbar = (function () {
    function Toolbar() {
    }
    Toolbar.prototype["componentDidLoad"] = function () {
        var buttons = this.el.querySelectorAll('ion-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('button-type', 'bar-button');
        }
    };
    Toolbar.prototype.hostData = function () {
        return {
            class: {
                'statusbar-padding': Ionic.config.getBoolean('statusbarPadding')
            }
        };
    };
    Toolbar.prototype.render = function () {
        var backgroundCss = createThemedClasses(this.mode, this.color, 'toolbar-background');
        var contentCss = createThemedClasses(this.mode, this.color, 'toolbar-content');
        return [
            h("div", { "c": backgroundCss }),
            h(0, { "a": { "name": 'start' } }),
            h(0, { "a": { "name": 'mode-start' } }),
            h(0, { "a": { "name": 'mode-end' } }),
            h(0, { "a": { "name": 'end' } }),
            h("div", { "c": contentCss },
                h(0, 0))
        ];
    };
    return Toolbar;
}());

exports['ION-APP'] = App;
exports['ION-CONTENT'] = Content;
exports['ION-FIXED'] = Fixed;
exports['ION-FOOTER'] = Footer;
exports['ION-HEADER'] = Header;
exports['ION-NAVBAR'] = Navbar;
exports['ION-PAGE'] = Page;
exports['ION-TITLE'] = ToolbarTitle;
exports['ION-TOOLBAR'] = Toolbar;
},


/***************** ion-app *****************/
[
/** ion-app: [0] tag **/
'ION-APP',

/** ion-app: [1] host **/
{"theme":"app"}

],

/***************** ion-content *****************/
[
/** ion-content: [0] tag **/
'ION-CONTENT',

/** ion-content: [1] host **/
{},

/** ion-content: [2] states **/
0 /* no states */,

/** ion-content: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-content: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-content: [5] events **/
0 /* no events */,

/** ion-content: [6] methods **/
0 /* no methods */,

/** ion-content: [7] hostElementMember **/
'el'

],

/***************** ion-fixed *****************/
[
/** ion-fixed: [0] tag **/
'ION-FIXED',

/** ion-fixed: [1] host **/
{},

/** ion-fixed: [2] states **/
0 /* no states */,

/** ion-fixed: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-fixed: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-fixed: [5] events **/
0 /* no events */,

/** ion-fixed: [6] methods **/
0 /* no methods */,

/** ion-fixed: [7] hostElementMember **/
'el'

],

/***************** ion-footer *****************/
[
/** ion-footer: [0] tag **/
'ION-FOOTER',

/** ion-footer: [1] host **/
{"theme":"footer"}

],

/***************** ion-header *****************/
[
/** ion-header: [0] tag **/
'ION-HEADER',

/** ion-header: [1] host **/
{"theme":"header"}

],

/***************** ion-navbar *****************/
[
/** ion-navbar: [0] tag **/
'ION-NAVBAR',

/** ion-navbar: [1] host **/
{"theme":"toolbar"},

/** ion-navbar: [2] states **/
0 /* no states */,

/** ion-navbar: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-navbar: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-navbar: [5] events **/
0 /* no events */,

/** ion-navbar: [6] methods **/
0 /* no methods */,

/** ion-navbar: [7] hostElementMember **/
'el'

],

/***************** ion-page *****************/
[
/** ion-page: [0] tag **/
'ION-PAGE',

/** ion-page: [1] host **/
{"theme":"page"}

],

/***************** ion-title *****************/
[
/** ion-title: [0] tag **/
'ION-TITLE',

/** ion-title: [1] host **/
{"theme":"title"}

],

/***************** ion-toolbar *****************/
[
/** ion-toolbar: [0] tag **/
'ION-TOOLBAR',

/** ion-toolbar: [1] host **/
{"theme":"toolbar"},

/** ion-toolbar: [2] states **/
0 /* no states */,

/** ion-toolbar: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-toolbar: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-toolbar: [5] events **/
0 /* no events */,

/** ion-toolbar: [6] methods **/
0 /* no methods */,

/** ion-toolbar: [7] hostElementMember **/
'el'

]
)