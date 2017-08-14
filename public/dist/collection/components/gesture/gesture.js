import { applyStyles, getElementReference, pointerCoordX, pointerCoordY } from '../../utils/helpers';
import { GestureController, BLOCK_ALL } from '../gesture-controller/gesture-controller';
import { PanRecognizer } from './recognizers';
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
        // in this case, we already know the GestureController and Gesture are already
        // apart of the same bundle, so it's safe to load it this way
        // only create one instance of GestureController, and reuse the same one later
        this.ctrl = Context.gesture = Context.gesture || new GestureController;
        this.gesture = this.ctrl.createGesture(this.gestureName, this.gesturePriority, this.disableScroll);
        var types = this.type.replace(/\s/g, '').toLowerCase().split(',');
        if (types.indexOf('pan') > -1) {
            this.pan = new PanRecognizer(this.direction, this.threshold, this.maxAngle);
            this.requiresMove = true;
        }
        this.hasPress = (types.indexOf('press') > -1);
        if (this.pan || this.hasPress) {
            Context.enableListener(this, 'touchstart', true, this.attachTo);
            Context.enableListener(this, 'mousedown', true, this.attachTo);
            Context.dom.write(function () {
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
                    Context.dom.write(function () {
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
            Context.enableListener(this, 'document:mousemove', shouldEnable);
        }
        Context.enableListener(this, 'document:mouseup', shouldEnable);
    };
    Gesture.prototype.enableTouch = function (shouldEnable) {
        if (this.requiresMove) {
            Context.enableListener(this, 'touchmove', shouldEnable);
        }
        Context.enableListener(this, 'touchend', shouldEnable);
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
export { Gesture };
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
