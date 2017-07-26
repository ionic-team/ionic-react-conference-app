import { createThemedClasses } from '../../utils/theme';
import iOSEnterAnimation from './animations/ios.enter';
import iOSLeaveAnimation from './animations/ios.leave';
var Modal = (function () {
    function Modal() {
        this.componentProps = {};
        this.enableBackdropDismiss = true;
        this.showBackdrop = true;
    }
    Modal.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    Modal.prototype["componentDidLoad"] = function () {
        this.ionModalDidLoad.emit({ modal: this });
    };
    Modal.prototype.present = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._present(resolve);
        });
    };
    Modal.prototype._present = function (resolve) {
        var _this = this;
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        this.ionModalWillPresent.emit({ modal: this });
        // get the user's animation fn if one was provided
        var animationBuilder = this.enterAnimation;
        if (!animationBuilder) {
            // user did not provide a custom animation fn
            // decide from the config which animation to use
            // TODO!!
            animationBuilder = iOSEnterAnimation;
        }
        // build the animation and kick it off
        this.animation = animationBuilder(this.el);
        this.animation.onFinish(function (a) {
            a.destroy();
            _this.ionModalDidPresent.emit({ modal: _this });
            resolve();
        }).play();
    };
    Modal.prototype.dismiss = function () {
        var _this = this;
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        return new Promise(function (resolve) {
            _this.ionModalWillDismiss.emit({ modal: _this });
            // get the user's animation fn if one was provided
            var animationBuilder = _this.exitAnimation;
            if (!animationBuilder) {
                // user did not provide a custom animation fn
                // decide from the config which animation to use
                // TODO!!
                animationBuilder = iOSLeaveAnimation;
            }
            // build the animation and kick it off
            _this.animation = animationBuilder(_this.el);
            _this.animation.onFinish(function (a) {
                a.destroy();
                _this.ionModalDidDismiss.emit({ modal: _this });
                Core.dom.write(function () {
                    _this.el.parentNode.removeChild(_this.el);
                });
                resolve();
            }).play();
        });
    };
    Modal.prototype["componentDidunload"] = function () {
        this.ionModalDidUnload.emit({ modal: this });
    };
    Modal.prototype.backdropClick = function () {
        if (this.enableBackdropDismiss) {
            // const opts: NavOptions = {
            //   minClickBlockDuration: 400
            // };
            this.dismiss();
        }
    };
    Modal.prototype.render = function () {
        var ThisComponent = this.component;
        var userCssClasses = 'modal-content';
        if (this.cssClass) {
            userCssClasses += " " + this.cssClass;
        }
        var dialogClasses = createThemedClasses(this.mode, this.color, 'modal-wrapper');
        var thisComponentClasses = createThemedClasses(this.mode, this.color, userCssClasses);
        return [
            h("div", { "c": { "modal-backdrop": true, "hide-backdrop": !this.showBackdrop }, "o": { "click": this.backdropClick.bind(this) } }),
            h("div", { "c": dialogClasses, "a": { "role": 'dialog' } },
                h(ThisComponent, { "p": this.componentProps, "c": thisComponentClasses }))
        ];
    };
    return Modal;
}());
export { Modal };
