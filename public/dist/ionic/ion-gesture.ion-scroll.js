/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-gesture.ion-scroll',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
function pointerCoordX(ev) {
    // get X coordinates for either a mouse click
    // or a touch depending on the given event
    if (ev) {
        var changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
            return changedTouches[0].clientX;
        }
        if (ev.pageX !== undefined) {
            return ev.pageX;
        }
    }
    return 0;
}
function pointerCoordY(ev) {
    // get Y coordinates for either a mouse click
    // or a touch depending on the given event
    if (ev) {
        var changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
            return changedTouches[0].clientY;
        }
        if (ev.pageY !== undefined) {
            return ev.pageY;
        }
    }
    return 0;
}
function getElementReference(elm, ref) {
    if (ref === 'child') {
        return elm.firstElementChild;
    }
    if (ref === 'parent') {
        return getParentElement(elm) || elm;
    }
    if (ref === 'body') {
        return elm.ownerDocument.body;
    }
    if (ref === 'document') {
        return elm.ownerDocument;
    }
    if (ref === 'window') {
        return elm.ownerDocument.defaultView;
    }
    return elm;
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
function applyStyles(elm, styles) {
    var styleProps = Object.keys(styles);
    if (elm) {
        for (var i = 0; i < styleProps.length; i++) {
            elm.style[styleProps[i]] = styles[styleProps[i]];
        }
    }
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

var GestureController = (function () {
    function GestureController() {
        this.id = 0;
        this.requestedStart = {};
        this.disabledGestures = {};
        this.disabledScroll = new Set();
        this.capturedID = null;
    }
    GestureController.prototype.createGesture = function (gestureName, gesturePriority, disableScroll) {
        return new GestureDelegate(this, this.newID(), gestureName, gesturePriority, disableScroll);
    };
    GestureController.prototype.createBlocker = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new BlockerDelegate(this.newID(), this, opts.disable, !!opts.disableScroll);
    };
    GestureController.prototype.newID = function () {
        return this.id++;
    };
    GestureController.prototype.start = function (gestureName, id, priority) {
        if (!this.canStart(gestureName)) {
            delete this.requestedStart[id];
            return false;
        }
        this.requestedStart[id] = priority;
        return true;
    };
    GestureController.prototype.capture = function (gestureName, id, priority) {
        if (!this.start(gestureName, id, priority)) {
            return false;
        }
        var requestedStart = this.requestedStart;
        var maxPriority = -10000;
        for (var gestureID in requestedStart) {
            maxPriority = Math.max(maxPriority, requestedStart[gestureID]);
        }
        if (maxPriority === priority) {
            this.capturedID = id;
            this.requestedStart = {};
            return true;
        }
        delete requestedStart[id];
        return false;
    };
    GestureController.prototype.release = function (id) {
        delete this.requestedStart[id];
        if (this.capturedID && id === this.capturedID) {
            this.capturedID = null;
        }
    };
    GestureController.prototype.disableGesture = function (gestureName, id) {
        var set = this.disabledGestures[gestureName];
        if (!set) {
            set = new Set();
            this.disabledGestures[gestureName] = set;
        }
        set.add(id);
    };
    GestureController.prototype.enableGesture = function (gestureName, id) {
        var set = this.disabledGestures[gestureName];
        if (set) {
            set.delete(id);
        }
    };
    GestureController.prototype.disableScroll = function (id) {
        // let isEnabled = !this.isScrollDisabled();
        this.disabledScroll.add(id);
        // if (this._app && isEnabled && this.isScrollDisabled()) {
        //   console.debug('GestureController: Disabling scrolling');
        //   this._app._setDisableScroll(true);
        // }
    };
    GestureController.prototype.enableScroll = function (id) {
        // let isDisabled = this.isScrollDisabled();
        this.disabledScroll.delete(id);
        // if (this._app && isDisabled && !this.isScrollDisabled()) {
        //   console.debug('GestureController: Enabling scrolling');
        //   this._app._setDisableScroll(false);
        // }
    };
    GestureController.prototype.canStart = function (gestureName) {
        if (this.capturedID) {
            // a gesture already captured
            return false;
        }
        if (this.isDisabled(gestureName)) {
            return false;
        }
        return true;
    };
    GestureController.prototype.isCaptured = function () {
        return !!this.capturedID;
    };
    GestureController.prototype.isScrollDisabled = function () {
        return this.disabledScroll.size > 0;
    };
    GestureController.prototype.isDisabled = function (gestureName) {
        var disabled = this.disabledGestures[gestureName];
        if (disabled && disabled.size > 0) {
            return true;
        }
        return false;
    };
    return GestureController;
}());
var GestureDelegate = (function () {
    function GestureDelegate(ctrl, id, name, priority, disableScroll) {
        this.ctrl = ctrl;
        this.id = id;
        this.name = name;
        this.priority = priority;
        this.disableScroll = disableScroll;
    }
    GestureDelegate.prototype.canStart = function () {
        if (!this.ctrl) {
            return false;
        }
        return this.ctrl.canStart(this.name);
    };
    GestureDelegate.prototype.start = function () {
        if (!this.ctrl) {
            return false;
        }
        return this.ctrl.start(this.name, this.id, this.priority);
    };
    GestureDelegate.prototype.capture = function () {
        if (!this.ctrl) {
            return false;
        }
        var captured = this.ctrl.capture(this.name, this.id, this.priority);
        if (captured && this.disableScroll) {
            this.ctrl.disableScroll(this.id);
        }
        return captured;
    };
    GestureDelegate.prototype.release = function () {
        if (this.ctrl) {
            this.ctrl.release(this.id);
            if (this.disableScroll) {
                this.ctrl.enableScroll(this.id);
            }
        }
    };
    GestureDelegate.prototype.destroy = function () {
        this.release();
        this.ctrl = null;
    };
    return GestureDelegate;
}());
var BlockerDelegate = (function () {
    function BlockerDelegate(id, controller, disable, disableScroll) {
        this.id = id;
        this.controller = controller;
        this.disable = disable;
        this.disableScroll = disableScroll;
        this.blocked = false;
    }
    BlockerDelegate.prototype.block = function () {
        var _this = this;
        if (!this.controller) {
            return;
        }
        if (this.disable) {
            this.disable.forEach(function (gesture) {
                _this.controller.disableGesture(gesture, _this.id);
            });
        }
        if (this.disableScroll) {
            this.controller.disableScroll(this.id);
        }
        this.blocked = true;
    };
    BlockerDelegate.prototype.unblock = function () {
        var _this = this;
        if (!this.controller) {
            return;
        }
        if (this.disable) {
            this.disable.forEach(function (gesture) {
                _this.controller.enableGesture(gesture, _this.id);
            });
        }
        if (this.disableScroll) {
            this.controller.enableScroll(this.id);
        }
        this.blocked = false;
    };
    BlockerDelegate.prototype.destroy = function () {
        this.unblock();
        this.controller = null;
    };
    return BlockerDelegate;
}());
var BLOCK_ALL = {
    disable: ['menu-swipe', 'goback-swipe'],
    disableScroll: true
};

var PanRecognizer = (function () {
    function PanRecognizer(direction, threshold, maxAngle) {
        this.direction = direction;
        this.dirty = false;
        this.angle = 0;
        this.isPan = 0;
        var radians = maxAngle * (Math.PI / 180);
        this.maxCosine = Math.cos(radians);
        this.threshold = threshold * threshold;
    }
    PanRecognizer.prototype.start = function (x, y) {
        this.startX = x;
        this.startY = y;
        this.angle = 0;
        this.isPan = 0;
        this.dirty = true;
    };
    PanRecognizer.prototype.detect = function (x, y) {
        if (!this.dirty) {
            return false;
        }
        var deltaX = (x - this.startX);
        var deltaY = (y - this.startY);
        var distance = deltaX * deltaX + deltaY * deltaY;
        if (distance >= this.threshold) {
            var angle = Math.atan2(deltaY, deltaX);
            var cosine = (this.direction === 'y')
                ? Math.sin(angle)
                : Math.cos(angle);
            this.angle = angle;
            if (cosine > this.maxCosine) {
                this.isPan = 1;
            }
            else if (cosine < -this.maxCosine) {
                this.isPan = -1;
            }
            else {
                this.isPan = 0;
            }
            this.dirty = false;
            return true;
        }
        return false;
    };
    PanRecognizer.prototype.isGesture = function () {
        return this.isPan;
    };
    return PanRecognizer;
}());

var Gesture = (function () {
    function Gesture() {
        this.detail = {};
        this.positions = [];
        this.lastTouch = 0;
        this.hasCapturedPan = false;
        this.hasPress = false;
        this.hasStartedPan = false;
        this.requiresMove = false;
        this.isMoveQueued = false;
        this.attachTo = 'child';
        this.autoBlockAll = false;
        this.block = null;
        this.disableScroll = false;
        this.direction = 'x';
        this.gestureName = '';
        this.gesturePriority = 0;
        this.maxAngle = 40;
        this.threshold = 20;
        this.type = 'pan';
    }
    Gesture.prototype["componentDidLoad"] = function () {
        var _this = this;
        this.ctrl = Ionic.controllers.gesture = (Ionic.controllers.gesture || new GestureController());
        this.gesture = this.ctrl.createGesture(this.gestureName, this.gesturePriority, this.disableScroll);
        var types = this.type.replace(/\s/g, '').toLowerCase().split(',');
        if (types.indexOf('pan') > -1) {
            this.pan = new PanRecognizer(this.direction, this.threshold, this.maxAngle);
            this.requiresMove = true;
        }
        this.hasPress = (types.indexOf('press') > -1);
        if (this.pan || this.hasPress) {
            Core.enableListener(this, 'touchstart', true, this.attachTo);
            Core.enableListener(this, 'mousedown', true, this.attachTo);
            Core.dom.write(function () {
                applyStyles(getElementReference(_this.el, _this.attachTo), GESTURE_INLINE_STYLES);
            });
        }
        if (this.autoBlockAll) {
            this.blocker = this.ctrl.createBlocker(BLOCK_ALL);
            this.blocker.block();
        }
    };
    Gesture.prototype.blockChange = function (block) {
        if (this.blocker) {
            this.blocker.destroy();
        }
        if (block) {
            this.blocker = this.ctrl.createBlocker({ disable: block.split(',') });
        }
    };
    // DOWN *************************
    Gesture.prototype.onTouchStart = function (ev) {
        this.lastTouch = now(ev);
        this.enableMouse(false);
        this.enableTouch(true);
        this.pointerDown(ev, this.lastTouch);
    };
    Gesture.prototype.onMouseDown = function (ev) {
        var timeStamp = now(ev);
        if (this.lastTouch === 0 || (this.lastTouch + MOUSE_WAIT < timeStamp)) {
            this.enableMouse(true);
            this.enableTouch(false);
            this.pointerDown(ev, timeStamp);
        }
    };
    Gesture.prototype.pointerDown = function (ev, timeStamp) {
        if (!this.gesture || this.hasStartedPan) {
            return false;
        }
        var detail = this.detail;
        detail.startX = detail.currentX = pointerCoordX(ev);
        detail.startY = detail.currentY = pointerCoordY(ev);
        detail.startTimeStamp = detail.timeStamp = timeStamp;
        detail.velocityX = detail.velocityY = detail.deltaX = detail.deltaY = 0;
        detail.directionX = detail.directionY = detail.velocityDirectionX = detail.velocityDirectionY = null;
        detail.event = ev;
        this.positions.length = 0;
        if (this.canStart && this.canStart(detail) === false) {
            return false;
        }
        this.positions.push(detail.currentX, detail.currentY, timeStamp);
        // Release fallback
        this.gesture.release();
        // Start gesture
        if (!this.gesture.start()) {
            return false;
        }
        if (this.pan) {
            this.hasStartedPan = true;
            this.hasCapturedPan = false;
            this.pan.start(detail.startX, detail.startY);
        }
        return true;
    };
    // MOVE *************************
    Gesture.prototype.onTouchMove = function (ev) {
        this.lastTouch = this.detail.timeStamp = now(ev);
        this.pointerMove(ev);
    };
    Gesture.prototype.onMoveMove = function (ev) {
        var timeStamp = now(ev);
        if (this.lastTouch === 0 || (this.lastTouch + MOUSE_WAIT < timeStamp)) {
            this.detail.timeStamp = timeStamp;
            this.pointerMove(ev);
        }
    };
    Gesture.prototype.pointerMove = function (ev) {
        var _this = this;
        var detail = this.detail;
        this.calcGestureData(ev);
        if (this.pan) {
            if (this.hasCapturedPan) {
                if (!this.isMoveQueued) {
                    this.isMoveQueued = true;
                    Core.dom.write(function () {
                        _this.isMoveQueued = false;
                        detail.type = 'pan';
                        if (_this.onMove) {
                            _this.onMove(detail);
                        }
                        else {
                            _this.ionGestureMove.emit(_this.detail);
                        }
                    });
                }
            }
            else if (this.pan.detect(detail.currentX, detail.currentY)) {
                if (this.pan.isGesture() !== 0) {
                    if (!this.tryToCapturePan(ev)) {
                        this.abortGesture();
                    }
                }
            }
        }
    };
    Gesture.prototype.calcGestureData = function (ev) {
        var detail = this.detail;
        detail.currentX = pointerCoordX(ev);
        detail.currentY = pointerCoordY(ev);
        detail.deltaX = (detail.currentX - detail.startX);
        detail.deltaY = (detail.currentY - detail.startY);
        detail.event = ev;
        // figure out which direction we're movin'
        detail.directionX = detail.velocityDirectionX = (detail.deltaX > 0 ? 'left' : (detail.deltaX < 0 ? 'right' : null));
        detail.directionY = detail.velocityDirectionY = (detail.deltaY > 0 ? 'up' : (detail.deltaY < 0 ? 'down' : null));
        var positions = this.positions;
        positions.push(detail.currentX, detail.currentY, detail.timeStamp);
        var endPos = (positions.length - 1);
        var startPos = endPos;
        var timeRange = (detail.timeStamp - 100);
        // move pointer to position measured 100ms ago
        for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 3) {
            startPos = i;
        }
        if (startPos !== endPos) {
            // compute relative movement between these two points
            var movedX = (positions[startPos - 2] - positions[endPos - 2]);
            var movedY = (positions[startPos - 1] - positions[endPos - 1]);
            var factor = 16.67 / (positions[endPos] - positions[startPos]);
            // based on XXms compute the movement to apply for each render step
            detail.velocityX = movedX * factor;
            detail.velocityY = movedY * factor;
            detail.velocityDirectionX = (movedX > 0 ? 'left' : (movedX < 0 ? 'right' : null));
            detail.velocityDirectionY = (movedY > 0 ? 'up' : (movedY < 0 ? 'down' : null));
        }
    };
    Gesture.prototype.tryToCapturePan = function (ev) {
        if (this.gesture && !this.gesture.capture()) {
            return false;
        }
        this.detail.event = ev;
        if (this.onStart) {
            this.onStart(this.detail);
        }
        else {
            this.ionGestureStart.emit(this.detail);
        }
        this.hasCapturedPan = true;
        return true;
    };
    Gesture.prototype.abortGesture = function () {
        this.hasStartedPan = false;
        this.hasCapturedPan = false;
        this.gesture && this.gesture.release();
        this.enable(false);
        this.notCaptured && this.notCaptured(this.detail);
    };
    // END *************************
    Gesture.prototype.onTouchEnd = function (ev) {
        this.lastTouch = this.detail.timeStamp = now(ev);
        this.pointerUp(ev);
        this.enableTouch(false);
    };
    Gesture.prototype.onMouseUp = function (ev) {
        var timeStamp = now(ev);
        if (this.lastTouch === 0 || (this.lastTouch + MOUSE_WAIT < timeStamp)) {
            this.detail.timeStamp = timeStamp;
            this.pointerUp(ev);
            this.enableMouse(false);
        }
    };
    Gesture.prototype.pointerUp = function (ev) {
        var detail = this.detail;
        this.gesture && this.gesture.release();
        detail.event = ev;
        this.calcGestureData(ev);
        if (this.pan) {
            if (this.hasCapturedPan) {
                detail.type = 'pan';
                if (this.onEnd) {
                    this.onEnd(detail);
                }
                else {
                    this.ionGestureEnd.emit(detail);
                }
            }
            else if (this.hasPress) {
                this.detectPress();
            }
            else {
                if (this.notCaptured) {
                    this.notCaptured(detail);
                }
                else {
                    this.ionGestureNotCaptured.emit(detail);
                }
            }
        }
        else if (this.hasPress) {
            this.detectPress();
        }
        this.hasCapturedPan = false;
        this.hasStartedPan = false;
    };
    Gesture.prototype.detectPress = function () {
        var detail = this.detail;
        if (Math.abs(detail.startX - detail.currentX) < 10 && Math.abs(detail.startY - detail.currentY) < 10) {
            detail.type = 'press';
            if (this.onPress) {
                this.onPress(detail);
            }
            else {
                this.ionPress.emit(detail);
            }
        }
    };
    // ENABLE LISTENERS *************************
    Gesture.prototype.enableMouse = function (shouldEnable) {
        if (this.requiresMove) {
            Core.enableListener(this, 'document:mousemove', shouldEnable);
        }
        Core.enableListener(this, 'document:mouseup', shouldEnable);
    };
    Gesture.prototype.enableTouch = function (shouldEnable) {
        if (this.requiresMove) {
            Core.enableListener(this, 'touchmove', shouldEnable);
        }
        Core.enableListener(this, 'touchend', shouldEnable);
    };
    Gesture.prototype.enable = function (shouldEnable) {
        this.enableMouse(shouldEnable);
        this.enableTouch(shouldEnable);
    };
    Gesture.prototype["componentDidunload"] = function () {
        if (this.blocker) {
            this.blocker.destroy();
            this.blocker = null;
        }
        this.gesture && this.gesture.destroy();
        this.ctrl = this.gesture = this.pan = this.detail = this.detail.event = null;
    };
    return Gesture;
}());
var GESTURE_INLINE_STYLES = {
    'touch-action': 'none',
    'user-select': 'none',
    '-webkit-user-drag': 'none',
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
};
var MOUSE_WAIT = 2500;
function now(ev) {
    return ev.timeStamp || Date.now();
}

var Scroll = (function () {
    function Scroll() {
        this.positions = [];
        this.queued = false;
        this.isScrolling = false;
        this.detail = {};
        this.enabled = true;
        this.jsScroll = false;
    }
    Scroll.prototype["componentDidLoad"] = function () {
        if (Core.isServer)
            return;
        var ctrl = Ionic.controllers.gesture = (Ionic.controllers.gesture || new GestureController());
        this.gesture = ctrl.createGesture('scroll', 100, false);
    };
    // Native Scroll *************************
    Scroll.prototype.onNativeScroll = function () {
        var self = this;
        if (!self.queued && self.enabled) {
            self.queued = true;
            Core.dom.read(function (timeStamp) {
                self.queued = false;
                self.onScroll(timeStamp || Date.now());
            });
        }
    };
    Scroll.prototype.onScroll = function (timeStamp) {
        var self = this;
        var detail = self.detail;
        var positions = self.positions;
        detail.timeStamp = timeStamp;
        // get the current scrollTop
        // ******** DOM READ ****************
        detail.scrollTop = self.getTop();
        // get the current scrollLeft
        // ******** DOM READ ****************
        detail.scrollLeft = self.getLeft();
        if (!self.isScrolling) {
            // currently not scrolling, so this is a scroll start
            self.isScrolling = true;
            // remember the start positions
            detail.startY = detail.scrollTop;
            detail.startX = detail.scrollLeft;
            // new scroll, so do some resets
            detail.velocityY = detail.velocityX = detail.deltaY = detail.deltaX = positions.length = 0;
            // emit only on the first scroll event
            if (self.ionScrollStart) {
                self.ionScrollStart(detail);
            }
        }
        detail.directionX = detail.velocityDirectionX = (detail.deltaX > 0 ? 'left' : (detail.deltaX < 0 ? 'right' : null));
        detail.directionY = detail.velocityDirectionY = (detail.deltaY > 0 ? 'up' : (detail.deltaY < 0 ? 'down' : null));
        // actively scrolling
        positions.push(detail.scrollTop, detail.scrollLeft, detail.timeStamp);
        if (positions.length > 3) {
            // we've gotten at least 2 scroll events so far
            detail.deltaY = (detail.scrollTop - detail.startY);
            detail.deltaX = (detail.scrollLeft - detail.startX);
            var endPos = (positions.length - 1);
            var startPos = endPos;
            var timeRange = (detail.timeStamp - 100);
            // move pointer to position measured 100ms ago
            for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 3) {
                startPos = i;
            }
            if (startPos !== endPos) {
                // compute relative movement between these two points
                var movedTop = (positions[startPos - 2] - positions[endPos - 2]);
                var movedLeft = (positions[startPos - 1] - positions[endPos - 1]);
                var factor = 16.67 / (positions[endPos] - positions[startPos]);
                // based on XXms compute the movement to apply for each render step
                detail.velocityY = movedTop * factor;
                detail.velocityX = movedLeft * factor;
                // figure out which direction we're scrolling
                detail.velocityDirectionX = (movedLeft > 0 ? 'left' : (movedLeft < 0 ? 'right' : null));
                detail.velocityDirectionY = (movedTop > 0 ? 'up' : (movedTop < 0 ? 'down' : null));
            }
        }
        clearTimeout(self.tmr);
        self.tmr = setTimeout(function () {
            // haven't scrolled in a while, so it's a scrollend
            self.isScrolling = false;
            Core.dom.read(function (timeStamp) {
                if (!self.isScrolling) {
                    self.onEnd(timeStamp);
                }
            });
        }, 80);
        // emit on each scroll event
        if (self.ionScrollStart) {
            self.ionScroll(detail);
        }
    };
    Scroll.prototype.onEnd = function (timeStamp) {
        var self = this;
        var detail = self.detail;
        detail.timeStamp = timeStamp || Date.now();
        // emit that the scroll has ended
        if (self.ionScrollEnd) {
            self.ionScrollEnd(detail);
        }
    };
    Scroll.prototype.enableJsScroll = function (contentTop, contentBottom) {
        this.jsScroll = true;
        Core.enableListener(this, 'scroll', false);
        Core.enableListener(this, 'touchstart', true);
        contentTop;
        contentBottom;
    };
    // Touch Scroll *************************
    Scroll.prototype.onTouchStart = function () {
        if (!this.enabled) {
            return;
        }
        Core.enableListener(this, 'touchmove', true);
        Core.enableListener(this, 'touchend', true);
        throw 'jsScroll: TODO!';
    };
    Scroll.prototype.onTouchMove = function () {
        if (!this.enabled) {
            return;
        }
    };
    Scroll.prototype.onTouchEnd = function () {
        Core.enableListener(this, 'touchmove', false);
        Core.enableListener(this, 'touchend', false);
        if (!this.enabled) {
            return;
        }
    };
    /**
     * DOM READ
     */
    Scroll.prototype.getTop = function () {
        if (this.jsScroll) {
            return this._t;
        }
        return this._t = this.el.scrollTop;
    };
    /**
     * DOM READ
     */
    Scroll.prototype.getLeft = function () {
        if (this.jsScroll) {
            return 0;
        }
        return this._l = this.el.scrollLeft;
    };
    /**
     * DOM WRITE
     */
    Scroll.prototype.setTop = function (top) {
        this._t = top;
        if (this.jsScroll) {
            this.el.style.transform = this.el.style.webkitTransform = "translate3d(" + this._l * -1 + "px," + top * -1 + "px,0px)";
        }
        else {
            this.el.scrollTop = top;
        }
    };
    /**
     * DOM WRITE
     */
    Scroll.prototype.setLeft = function (left) {
        this._l = left;
        if (this.jsScroll) {
            this.el.style.transform = this.el.style.webkitTransform = "translate3d(" + left * -1 + "px," + this._t * -1 + "px,0px)";
        }
        else {
            this.el.scrollLeft = left;
        }
    };
    Scroll.prototype.scrollTo = function (x, y, duration, done) {
        // scroll animation loop w/ easing
        // credit https://gist.github.com/dezinezync/5487119
        var promise;
        if (done === undefined) {
            // only create a promise if a done callback wasn't provided
            // done can be a null, which avoids any functions
            promise = new Promise(function (resolve) {
                done = resolve;
            });
        }
        var self = this;
        var el = self.el;
        if (!el) {
            // invalid element
            done();
            return promise;
        }
        if (duration < 32) {
            self.setTop(y);
            self.setLeft(x);
            done();
            return promise;
        }
        var fromY = el.scrollTop;
        var fromX = el.scrollLeft;
        var maxAttempts = (duration / 16) + 100;
        var startTime;
        var attempts = 0;
        var stopScroll = false;
        // scroll loop
        function step(timeStamp) {
            attempts++;
            if (!self.el || stopScroll || attempts > maxAttempts) {
                self.isScrolling = false;
                el.style.transform = el.style.webkitTransform = '';
                done();
                return;
            }
            var time = Math.min(1, ((timeStamp - startTime) / duration));
            // where .5 would be 50% of time on a linear scale easedT gives a
            // fraction based on the easing method
            var easedT = (--time) * time * time + 1;
            if (fromY !== y) {
                self.setTop((easedT * (y - fromY)) + fromY);
            }
            if (fromX !== x) {
                self.setLeft(Math.floor((easedT * (x - fromX)) + fromX));
            }
            if (easedT < 1) {
                // do not use DomController here
                // must use nativeRaf in order to fire in the next frame
                Core.dom.raf(step);
            }
            else {
                stopScroll = true;
                self.isScrolling = false;
                el.style.transform = el.style.webkitTransform = '';
                done();
            }
        }
        // start scroll loop
        self.isScrolling = true;
        // chill out for a frame first
        Core.dom.write(function () {
            Core.dom.write(function (timeStamp) {
                startTime = timeStamp;
                step(timeStamp);
            });
        });
        return promise;
    };
    Scroll.prototype.scrollToTop = function (duration) {
        return this.scrollTo(0, 0, duration);
    };
    Scroll.prototype.scrollToBottom = function (duration) {
        var y = 0;
        if (this.el) {
            y = this.el.scrollHeight - this.el.clientHeight;
        }
        return this.scrollTo(0, y, duration);
    };
    Scroll.prototype["componentDidunload"] = function () {
        this.gesture && this.gesture.destroy();
        this.gesture = this.detail = this.detail.event = null;
    };
    Scroll.prototype.render = function () {
        return h(0, 0);
    };
    return Scroll;
}());

exports['ION-GESTURE'] = Gesture;
exports['ION-SCROLL'] = Scroll;
},


/***************** ion-gesture *****************/
[
/** ion-gesture: [0] tag **/
'ION-GESTURE',

/** ion-gesture: [1] host **/
{},

/** ion-gesture: [2] states **/
0 /* no states */,

/** ion-gesture: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-gesture: [4] propDidChanges **/
[
  [
    /*****  ion-gesture prop did change [0] ***** /
    /* [0] prop name **/ 'block',
    /* [1] call fn *****/ 'blockChange'
  ]
],

/** ion-gesture: [5] events **/
[
  [
    /*****  ion-gesture ionGestureEnd ***** /
    /* [0] event name ***/ 'ionGestureEnd',
    /* [1] method name **/ 'ionGestureEnd',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-gesture ionGestureMove ***** /
    /* [0] event name ***/ 'ionGestureMove',
    /* [1] method name **/ 'ionGestureMove',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-gesture ionGestureNotCaptured ***** /
    /* [0] event name ***/ 'ionGestureNotCaptured',
    /* [1] method name **/ 'ionGestureNotCaptured',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-gesture ionGestureStart ***** /
    /* [0] event name ***/ 'ionGestureStart',
    /* [1] method name **/ 'ionGestureStart',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-gesture ionPress ***** /
    /* [0] event name ***/ 'ionPress',
    /* [1] method name **/ 'ionPress',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ]
],

/** ion-gesture: [6] methods **/
0 /* no methods */,

/** ion-gesture: [7] hostElementMember **/
'el'

],

/***************** ion-scroll *****************/
[
/** ion-scroll: [0] tag **/
'ION-SCROLL',

/** ion-scroll: [1] host **/
{},

/** ion-scroll: [2] states **/
0 /* no states */,

/** ion-scroll: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-scroll: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-scroll: [5] events **/
0 /* no events */,

/** ion-scroll: [6] methods **/
0 /* no methods */,

/** ion-scroll: [7] hostElementMember **/
'el'

]
)