/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-menu',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
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

var Menu$$1 = (function () {
    function Menu$$1() {
        this._init = false;
        this._isPane = false;
        /**
         * @hidden
         */
        this.isOpen = false;
        /**
         * @hidden
         */
        this.isAnimating = false;
        /**
         * @hidden
         */
        this.isRightSide = false;
        /**
         * @input {string} Which side of the view the menu should be placed. Default `"start"`.
         */
        this.side = 'start';
        /**
         * @input {boolean} If true, the menu will persist on child pages.
         */
        this.persistent = false;
    }
    Menu$$1.prototype.swipeEnabledChange = function (isEnabled) {
        this.swipeEnable(isEnabled);
    };
    /**
     * @hidden
     */
    Menu$$1.prototype["componentDidLoad"] = function () {
        var _this = this;
        this._backdropElm = this.el.querySelector('.menu-backdrop');
        this._init = true;
        if (this.content) {
            if ((this.content).tagName) {
                this._cntElm = this.content;
            }
            else if (typeof this.content === 'string') {
                this._cntElm = document.querySelector(this.content);
            }
        }
        if (!this._cntElm || !this._cntElm.tagName) {
            // requires content element
            return console.error('Menu: must have a "content" element to listen for drag events on.');
        }
        // add menu's content classes
        this._cntElm.classList.add('menu-content');
        this._cntElm.classList.add('menu-content-' + this.type);
        var isEnabled = this.enabled;
        if (isEnabled === true || typeof isEnabled === 'undefined') {
            // check if more than one menu is on the same side
            isEnabled = !this._ctrl.getMenus().some(function (m) {
                return m.side === _this.side && m.enabled;
            });
        }
        // register this menu with the app's menu controller
        this._ctrl._register(this);
        // mask it as enabled / disabled
        this.enable(isEnabled);
    };
    Menu$$1.prototype.hostData = function () {
        return {
            attrs: {
                'role': 'navigation',
                'side': this.side,
                'type': this.type
            },
            class: {
                'menu-enabled': this.enabled
            }
        };
    };
    Menu$$1.prototype.render = function () {
        // normalize the "type"
        if (!this.type) {
            this.type = Ionic.config.get('menuType', 'overlay');
        }
        return [
            h("div", { "c": { "menu-inner": true } },
                h(0, 0)),
            h("ion-gesture", { "p": { "gestureName": 'menu-swipe', "gesturePriority": 10, "type": 'pan', "direction": 'x', "threshold": 5, "attachTo": 'body', "disableScroll": true, "block": this._activeBlock }, "c": { "menu-backdrop": true } })
        ];
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.onBackdropClick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this._ctrl.close();
    };
    /**
     * @hidden
     */
    Menu$$1.prototype._getType = function () {
        if (!this._type) {
            this._type = this._ctrl.create(this.type, this);
            if (Ionic.config.getBoolean('animate') === false) {
                this._type.ani.duration(0);
            }
        }
        return this._type;
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.setOpen = function (shouldOpen, animated) {
        var _this = this;
        if (animated === void 0) { animated = true; }
        // If the menu is disabled or it is currenly being animated, let's do nothing
        if ((shouldOpen === this.isOpen) || !this._canOpen() || this.isAnimating) {
            return Promise.resolve(this.isOpen);
        }
        return new Promise(function (resolve) {
            _this._before();
            _this._getType().setOpen(shouldOpen, animated, function () {
                _this._after(shouldOpen);
                resolve(_this.isOpen);
            });
        });
    };
    Menu$$1.prototype._forceClosing = function () {
        var _this = this;
        this.isAnimating = true;
        this._getType().setOpen(false, false, function () {
            _this._after(false);
        });
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.canSwipe = function () {
        return this.swipeEnabled &&
            !this.isAnimating &&
            this._canOpen();
        // TODO: && this._app.isEnabled();
    };
    Menu$$1.prototype._swipeBeforeStart = function () {
        if (!this.canSwipe()) {
            return;
        }
        this._before();
    };
    Menu$$1.prototype._swipeStart = function () {
        if (!this.isAnimating) {
            return;
        }
        this._getType().setProgressStart(this.isOpen);
    };
    Menu$$1.prototype._swipeProgress = function (stepValue) {
        if (!this.isAnimating) {
            return;
        }
        this._getType().setProgessStep(stepValue);
        this.ionDrag.emit({ menu: this });
    };
    Menu$$1.prototype._swipeEnd = function (shouldCompleteLeft, shouldCompleteRight, stepValue, velocity) {
        var _this = this;
        if (!this.isAnimating) {
            return;
        }
        // user has finished dragging the menu
        var isRightSide = this.isRightSide;
        var opening = !this.isOpen;
        var shouldComplete = (opening)
            ? isRightSide ? shouldCompleteLeft : shouldCompleteRight
            : isRightSide ? shouldCompleteRight : shouldCompleteLeft;
        this._getType().setProgressEnd(shouldComplete, stepValue, velocity, function (isOpen) {
            console.debug('menu, swipeEnd', _this.side);
            _this._after(isOpen);
        });
    };
    Menu$$1.prototype._before = function () {
        // this places the menu into the correct location before it animates in
        // this css class doesn't actually kick off any animations
        this.el.classList.add('show-menu');
        this._backdropElm.classList.add('show-backdrop');
        this.resize();
        // TODO: this._keyboard.close();
        this.isAnimating = true;
    };
    Menu$$1.prototype._after = function (isOpen) {
        // TODO: this._app.setEnabled(false, 100);
        var _this = this;
        // keep opening/closing the menu disabled for a touch more yet
        // only add listeners/css if it's enabled and isOpen
        // and only remove listeners/css if it's not open
        // emit opened/closed events
        this.isOpen = isOpen;
        this.isAnimating = false;
        // add/remove backdrop click listeners
        this._backdropClick(isOpen);
        if (isOpen) {
            // disable swipe to go back gesture
            this._activeBlock = GESTURE_BLOCKER;
            // add css class
            Core.dom.write(function () {
                _this._cntElm.classList.add('menu-content-open');
            });
            // emit open event
            this.ionOpen.emit({ menu: this });
        }
        else {
            // enable swipe to go back gesture
            this._activeBlock = null;
            // remove css classes
            Core.dom.write(function () {
                _this._cntElm.classList.remove('menu-content-open');
                _this._cntElm.classList.remove('show-menu');
                _this._backdropElm.classList.remove('show-menu');
            });
            // emit close event
            this.ionClose.emit({ menu: this });
        }
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.open = function () {
        return this.setOpen(true);
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.close = function () {
        return this.setOpen(false);
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.resize = function () {
        // TODO
        // const content: Content | Nav = this.menuContent
        //   ? this.menuContent
        //   : this.menuNav;
        // content && content.resize();
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.toggle = function () {
        return this.setOpen(!this.isOpen);
    };
    Menu$$1.prototype._canOpen = function () {
        return this.enabled && !this._isPane;
    };
    /**
     * @hidden
     */
    Menu$$1.prototype._updateState = function () {
        var canOpen = this._canOpen();
        // Close menu inmediately
        if (!canOpen && this.isOpen) {
            // close if this menu is open, and should not be enabled
            this._forceClosing();
        }
        if (this.enabled && this._ctrl) {
            this._ctrl._setActiveMenu(this);
        }
        if (!this._init) {
            return;
        }
        // TODO
        // const gesture = this._gesture;
        // // only listen/unlisten if the menu has initialized
        // if (canOpen && this.swipeEnabled && !gesture.isListening) {
        //   // should listen, but is not currently listening
        //   console.debug('menu, gesture listen', this.side);
        //   gesture.listen();
        // } else if (gesture.isListening && (!canOpen || !this.swipeEnabled)) {
        //   // should not listen, but is currently listening
        //   console.debug('menu, gesture unlisten', this.side);
        //   gesture.unlisten();
        // }
        if (this.isOpen || (this._isPane && this.enabled)) {
            this.resize();
        }
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.enable = function (shouldEnable) {
        this.enabled = shouldEnable;
        this._updateState();
        return this;
    };
    /**
     * @internal
     */
    Menu$$1.prototype.initPane = function () {
        return false;
    };
    /**
     * @internal
     */
    Menu$$1.prototype.paneChanged = function (isPane) {
        this._isPane = isPane;
        this._updateState();
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.swipeEnable = function (shouldEnable) {
        this.swipeEnabled = shouldEnable;
        this._updateState();
        return this;
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.getMenuElement = function () {
        return this.el.querySelector('.menu-inner');
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.getContentElement = function () {
        return this._cntElm;
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.getBackdropElement = function () {
        return this._backdropElm;
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.width = function () {
        return this.getMenuElement().offsetWidth;
    };
    /**
     * @hidden
     */
    Menu$$1.prototype.getMenuController = function () {
        return this._ctrl;
    };
    Menu$$1.prototype._backdropClick = function (shouldAdd) {
        var onBackdropClick = this.onBackdropClick.bind(this);
        if (shouldAdd && !this._unregBdClick) {
            this._unregBdClick = Core.addListener(this._cntElm, 'click', onBackdropClick, { capture: true });
            this._unregCntClick = Core.addListener(this._cntElm, 'click', onBackdropClick, { capture: true });
        }
        else if (!shouldAdd && this._unregBdClick) {
            this._unregBdClick();
            this._unregCntClick();
            this._unregBdClick = this._unregCntClick = null;
        }
    };
    /**
     * @hidden
     */
    Menu$$1.prototype["componentDidunload"] = function () {
        this._backdropClick(false);
        this._ctrl._unregister(this);
        this._type && this._type.destroy();
        this._ctrl = this._type = this._cntElm = this._backdropElm = null;
    };
    return Menu$$1;
}());
var GESTURE_BLOCKER = 'goback-swipe';

exports['ION-MENU'] = Menu$$1;
},


/***************** ion-menu *****************/
[
/** ion-menu: [0] tag **/
'ION-MENU',

/** ion-menu: [1] host **/
{"theme":"menu"},

/** ion-menu: [2] states **/
0 /* no states */,

/** ion-menu: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-menu: [4] propDidChanges **/
[
  [
    /*****  ion-menu prop did change [0] ***** /
    /* [0] prop name **/ 'swipeEnabled',
    /* [1] call fn *****/ 'swipeEnabledChange'
  ]
],

/** ion-menu: [5] events **/
[
  [
    /*****  ion-menu ionClose ***** /
    /* [0] event name ***/ 'ionClose',
    /* [1] method name **/ 'ionClose',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-menu ionDrag ***** /
    /* [0] event name ***/ 'ionDrag',
    /* [1] method name **/ 'ionDrag',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-menu ionOpen ***** /
    /* [0] event name ***/ 'ionOpen',
    /* [1] method name **/ 'ionOpen',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ]
],

/** ion-menu: [6] methods **/
0 /* no methods */,

/** ion-menu: [7] hostElementMember **/
'el'

]
)