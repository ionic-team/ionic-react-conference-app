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

var CSS_PROP = function (docEle) {
    var css = {};
    // transform
    var i;
    var keys = ['webkitTransform', '-webkit-transform', 'webkit-transform', 'transform'];
    for (i = 0; i < keys.length; i++) {
        if (docEle.style[keys[i]] !== undefined) {
            css.transformProp = keys[i];
            break;
        }
    }
    // transition
    keys = ['webkitTransition', 'transition'];
    for (i = 0; i < keys.length; i++) {
        if (docEle.style[keys[i]] !== undefined) {
            css.transitionProp = keys[i];
            break;
        }
    }
    // The only prefix we care about is webkit for transitions.
    var prefix = css.transitionProp.indexOf('webkit') > -1 ? '-webkit-' : '';
    // transition duration
    css.transitionDurationProp = prefix + 'transition-duration';
    // transition timing function
    css.transitionTimingFnProp = prefix + 'transition-timing-function';
    return css;
}(document.documentElement);

/**
 * iOS Loading Enter Animation
 */

/**
 * iOS Loading Leave Animation
 */

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @hidden
 * Menu Type
 * Base class which is extended by the various types. Each
 * type will provide their own animations for open and close
 * and registers itself with Menu.
 */
var MenuType = (function () {
    function MenuType() {
        // Ionic.createAnimation().then(Animation => {
        //   this.ani = new Animation();
        // });;
        // this.ani
        //   .easing('cubic-bezier(0.0, 0.0, 0.2, 1)')
        //   .easingReverse('cubic-bezier(0.4, 0.0, 0.6, 1)')
        //   .duration(280);
    }
    MenuType.prototype.setOpen = function (shouldOpen, animated, done) {
        var ani = this.ani
            .onFinish(done, { oneTimeCallback: true, clearExistingCallacks: true })
            .reverse(!shouldOpen);
        if (animated) {
            ani.play();
        }
        else {
            ani.syncPlay();
        }
    };
    MenuType.prototype.setProgressStart = function (isOpen) {
        this.isOpening = !isOpen;
        // the cloned animation should not use an easing curve during seek
        this.ani
            .reverse(isOpen)
            .progressStart();
    };
    MenuType.prototype.setProgessStep = function (stepValue) {
        // adjust progress value depending if it opening or closing
        this.ani.progressStep(stepValue);
    };
    MenuType.prototype.setProgressEnd = function (shouldComplete, currentStepValue, velocity, done) {
        var _this = this;
        var isOpen = (this.isOpening && shouldComplete);
        if (!this.isOpening && !shouldComplete) {
            isOpen = true;
        }
        var ani = this.ani;
        ani.onFinish(function () {
            _this.isOpening = false;
            done(isOpen);
        }, { clearExistingCallacks: true });
        var factor = 1 - Math.min(Math.abs(velocity) / 4, 0.7);
        var dur = ani.getDuration() * factor;
        ani.progressEnd(shouldComplete, currentStepValue, dur);
    };
    MenuType.prototype.destroy = function () {
        this.ani.destroy();
        this.ani = null;
    };
    return MenuType;
}());
/**
 * @hidden
 * Menu Reveal Type
 * The content slides over to reveal the menu underneath.
 * The menu itself, which is under the content, does not move.
 */
var MenuRevealType = (function (_super) {
    __extends(MenuRevealType, _super);
    function MenuRevealType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MenuRevealType;
}(MenuType));
/**
 * @hidden
 * Menu Push Type
 * The content slides over to reveal the menu underneath.
 * The menu itself also slides over to reveal its bad self.
 */
var MenuPushType = (function (_super) {
    __extends(MenuPushType, _super);
    function MenuPushType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MenuPushType;
}(MenuType));
/**
 * @hidden
 * Menu Overlay Type
 * The menu slides over the content. The content
 * itself, which is under the menu, does not move.
 */
var MenuOverlayType = (function (_super) {
    __extends(MenuOverlayType, _super);
    function MenuOverlayType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MenuOverlayType;
}(MenuType));

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

/**
 * iOS Modal Enter Animation
 */

/**
 * Animations for modals
 */
// export function modalSlideIn(rootElm: HTMLElement) {
// }
// export class ModalSlideOut {
//   constructor(ele: HTMLElement) {
//     let backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
//     let wrapperEle = <HTMLElement>ele.querySelector('.modal-wrapper');
//     let wrapperEleRect = wrapperEle.getBoundingClientRect();
//     let wrapper = new Animation(this.plt, wrapperEle);
//     // height of the screen - top of the container tells us how much to scoot it down
//     // so it's off-screen
//     wrapper.fromTo('translateY', '0px', `${this.plt.height() - wrapperEleRect.top}px`);
//     backdrop.fromTo('opacity', 0.4, 0.0);
//     this
//       .element(this.leavingView.pageRef())
//       .easing('ease-out')
//       .duration(250)
//       .add(backdrop)
//       .add(wrapper);
//   }
// }
// export class ModalMDSlideIn {
//   constructor(ele: HTMLElement) {
//     const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
//     const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
//     backdrop.fromTo('opacity', 0.01, 0.4);
//     wrapper.fromTo('translateY', '40px', '0px');
//     wrapper.fromTo('opacity', 0.01, 1);
//     const DURATION = 280;
//     const EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
//     this.element(this.enteringView.pageRef()).easing(EASING).duration(DURATION)
//       .add(backdrop)
//       .add(wrapper);
//   }
// }
// export class ModalMDSlideOut {
//   constructor(ele: HTMLElement) {
//     const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
//     const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
//     backdrop.fromTo('opacity', 0.4, 0.0);
//     wrapper.fromTo('translateY', '0px', '40px');
//     wrapper.fromTo('opacity', 0.99, 0);
//     this
//       .element(this.leavingView.pageRef())
//       .duration(200)
//       .easing('cubic-bezier(0.47,0,0.745,0.715)')
//       .add(wrapper)
//       .add(backdrop);
//   }
// }

/**
 * iOS Modal Leave Animation
 */

var Ionic = window.Ionic;

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