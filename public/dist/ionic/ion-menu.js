/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents(

/**** module id (dev mode) ****/
"ion-menu",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var Menu = (function () {
    function Menu() {
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
    Menu.prototype.swipeEnabledChange = function (isEnabled) {
        this.swipeEnable(isEnabled);
    };
    /**
     * @hidden
     */
    Menu.prototype["componentDidLoad"] = function () {
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
    Menu.prototype.hostData = function () {
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
    Menu.prototype.render = function () {
        // normalize the "type"
        if (!this.type) {
            this.type = this.config.get('menuType', 'overlay');
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
    Menu.prototype.onBackdropClick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this._ctrl.close();
    };
    /**
     * @hidden
     */
    Menu.prototype._getType = function () {
        if (!this._type) {
            this._type = this._ctrl.create(this.type, this);
            if (this.config.getBoolean('animate') === false) {
                this._type.ani.duration(0);
            }
        }
        return this._type;
    };
    /**
     * @hidden
     */
    Menu.prototype.setOpen = function (shouldOpen, animated) {
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
    Menu.prototype._forceClosing = function () {
        var _this = this;
        this.isAnimating = true;
        this._getType().setOpen(false, false, function () {
            _this._after(false);
        });
    };
    /**
     * @hidden
     */
    Menu.prototype.canSwipe = function () {
        return this.swipeEnabled &&
            !this.isAnimating &&
            this._canOpen();
        // TODO: && this._app.isEnabled();
    };
    Menu.prototype._swipeBeforeStart = function () {
        if (!this.canSwipe()) {
            return;
        }
        this._before();
    };
    Menu.prototype._swipeStart = function () {
        if (!this.isAnimating) {
            return;
        }
        this._getType().setProgressStart(this.isOpen);
    };
    Menu.prototype._swipeProgress = function (stepValue) {
        if (!this.isAnimating) {
            return;
        }
        this._getType().setProgessStep(stepValue);
        this.ionDrag.emit({ menu: this });
    };
    Menu.prototype._swipeEnd = function (shouldCompleteLeft, shouldCompleteRight, stepValue, velocity) {
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
    Menu.prototype._before = function () {
        // this places the menu into the correct location before it animates in
        // this css class doesn't actually kick off any animations
        this.el.classList.add('show-menu');
        this._backdropElm.classList.add('show-backdrop');
        this.resize();
        // TODO: this._keyboard.close();
        this.isAnimating = true;
    };
    Menu.prototype._after = function (isOpen) {
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
            Context.dom.write(function () {
                _this._cntElm.classList.add('menu-content-open');
            });
            // emit open event
            this.ionOpen.emit({ menu: this });
        }
        else {
            // enable swipe to go back gesture
            this._activeBlock = null;
            // remove css classes
            Context.dom.write(function () {
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
    Menu.prototype.open = function () {
        return this.setOpen(true);
    };
    /**
     * @hidden
     */
    Menu.prototype.close = function () {
        return this.setOpen(false);
    };
    /**
     * @hidden
     */
    Menu.prototype.resize = function () {
        // TODO
        // const content: Content | Nav = this.menuContent
        //   ? this.menuContent
        //   : this.menuNav;
        // content && content.resize();
    };
    /**
     * @hidden
     */
    Menu.prototype.toggle = function () {
        return this.setOpen(!this.isOpen);
    };
    Menu.prototype._canOpen = function () {
        return this.enabled && !this._isPane;
    };
    /**
     * @hidden
     */
    Menu.prototype._updateState = function () {
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
    Menu.prototype.enable = function (shouldEnable) {
        this.enabled = shouldEnable;
        this._updateState();
        return this;
    };
    /**
     * @internal
     */
    Menu.prototype.initPane = function () {
        return false;
    };
    /**
     * @internal
     */
    Menu.prototype.paneChanged = function (isPane) {
        this._isPane = isPane;
        this._updateState();
    };
    /**
     * @hidden
     */
    Menu.prototype.swipeEnable = function (shouldEnable) {
        this.swipeEnabled = shouldEnable;
        this._updateState();
        return this;
    };
    /**
     * @hidden
     */
    Menu.prototype.getMenuElement = function () {
        return this.el.querySelector('.menu-inner');
    };
    /**
     * @hidden
     */
    Menu.prototype.getContentElement = function () {
        return this._cntElm;
    };
    /**
     * @hidden
     */
    Menu.prototype.getBackdropElement = function () {
        return this._backdropElm;
    };
    /**
     * @hidden
     */
    Menu.prototype.width = function () {
        return this.getMenuElement().offsetWidth;
    };
    /**
     * @hidden
     */
    Menu.prototype.getMenuController = function () {
        return this._ctrl;
    };
    Menu.prototype._backdropClick = function (shouldAdd) {
        var onBackdropClick = this.onBackdropClick.bind(this);
        if (shouldAdd && !this._unregBdClick) {
            this._unregBdClick = Context.addListener(this._cntElm, 'click', onBackdropClick, { capture: true });
            this._unregCntClick = Context.addListener(this._cntElm, 'click', onBackdropClick, { capture: true });
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
    Menu.prototype["componentDidunload"] = function () {
        this._backdropClick(false);
        this._ctrl._unregister(this);
        this._type && this._type.destroy();
        this._ctrl = this._type = this._cntElm = this._backdropElm = null;
    };
    return Menu;
}());
var GESTURE_BLOCKER = 'goback-swipe';

exports['ION-MENU'] = Menu;
},


/***************** ion-menu *****************/
[
/** ion-menu: tag **/
"ION-MENU",

/** ion-menu: members **/
[
  [ "config", /** prop context **/ 3, /** type any **/ 0, /** context ***/ "config" ],
  [ "content", /** prop **/ 1 ],
  [ "el", /** element ref **/ 7 ],
  [ "enabled", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "id", /** prop **/ 1 ],
  [ "isAnimating", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "isOpen", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "maxEdgeStart", /** prop **/ 1, /** type number **/ 2 ],
  [ "persistent", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "side", /** prop **/ 1 ],
  [ "swipeEnabled", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "type", /** prop **/ 1 ]
],

/** ion-menu: host **/
{"theme":"menu"},

/** ion-menu: events **/
[
  [
    /*****  ion-menu ionDrag ***** /
    /* event name ***/ "ionDrag"
  ],
  [
    /*****  ion-menu ionOpen ***** /
    /* event name ***/ "ionOpen"
  ],
  [
    /*****  ion-menu ionClose ***** /
    /* event name ***/ "ionClose"
  ]
],

/** ion-menu: propWillChanges **/
0 /* no prop will change methods */,

/** ion-menu: propDidChanges **/
[
  [
    /*****  ion-menu prop did change [0] ***** /
    /* prop name **/ "swipeEnabled",
    /* call fn *****/ "swipeEnabledChange"
  ]
]

]
)