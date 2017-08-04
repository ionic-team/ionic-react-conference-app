var __extends = (this && this.__extends) || (function () {
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
export { MenuType };
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
export { MenuRevealType };
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
export { MenuPushType };
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
export { MenuOverlayType };
