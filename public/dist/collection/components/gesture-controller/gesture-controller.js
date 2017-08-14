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
export { GestureController };
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
export { GestureDelegate };
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
export { BlockerDelegate };
export var BLOCK_ALL = {
    disable: ['menu-swipe', 'goback-swipe'],
    disableScroll: true
};
