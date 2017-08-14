import iOSEnterAnimation from './animations/ios.enter';
import iOSLeaveAnimation from './animations/ios.leave';
var Loading = (function () {
    function Loading() {
        this.showSpinner = null;
        this.dismissOnPageChange = false;
        this.showBackdrop = true;
    }
    Loading.prototype.present = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._present(resolve);
        });
    };
    Loading.prototype._present = function (resolve) {
        var _this = this;
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        this.ionLoadingWillPresent.emit({ loading: this });
        // get the user's animation fn if one was provided
        var animationBuilder = this.enterAnimation;
        if (!animationBuilder) {
            // user did not provide a custom animation fn
            // decide from the config which animation to use
            animationBuilder = iOSEnterAnimation;
        }
        // build the animation and kick it off
        this.animationCtrl.create(animationBuilder, this.el).then(function (animation) {
            _this.animation = animation;
            animation.onFinish(function (a) {
                a.destroy();
                _this.ionViewDidEnter();
                resolve();
            }).play();
        });
    };
    Loading.prototype.dismiss = function () {
        var _this = this;
        clearTimeout(this.durationTimeout);
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        return new Promise(function (resolve) {
            _this.ionLoadingWillDismiss.emit({ loading: _this });
            // get the user's animation fn if one was provided
            var animationBuilder = _this.exitAnimation;
            if (!animationBuilder) {
                // user did not provide a custom animation fn
                // decide from the config which animation to use
                animationBuilder = iOSLeaveAnimation;
            }
            // build the animation and kick it off
            _this.animationCtrl.create(animationBuilder, _this.el).then(function (animation) {
                _this.animation = animation;
                animation.onFinish(function (a) {
                    a.destroy();
                    _this.ionLoadingDidDismiss.emit({ loading: _this });
                    Context.dom.write(function () {
                        _this.el.parentNode.removeChild(_this.el);
                    });
                    resolve();
                }).play();
            });
        });
    };
    Loading.prototype["componentDidunload"] = function () {
        this.ionLoadingDidUnload.emit({ loading: this });
    };
    Loading.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    Loading.prototype["componentDidLoad"] = function () {
        if (!this.spinner) {
            this.spinner = this.config.get('loadingSpinner', this.config.get('spinner', 'lines'));
        }
        if (this.showSpinner === null || this.showSpinner === undefined) {
            this.showSpinner = !!(this.spinner && this.spinner !== 'hide');
        }
        this.ionLoadingDidLoad.emit({ loading: this });
    };
    Loading.prototype.ionViewDidEnter = function () {
        var _this = this;
        // blur the currently active element
        var activeElement = document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
        // If there is a duration, dismiss after that amount of time
        if (typeof this.duration === 'number' && this.duration > 10) {
            this.durationTimeout = setTimeout(function () { return _this.dismiss(); }, this.duration);
        }
        this.ionLoadingDidPresent.emit({ loading: this });
    };
    Loading.prototype.render = function () {
        var userCssClass = 'loading-content';
        if (this.cssClass) {
            userCssClass += ' ' + this.cssClass;
        }
        var loadingInner = [];
        if (this.showSpinner) {
            loadingInner.push(h("div", { "c": { "loading-spinner": true } },
                h("ion-spinner", { "p": { "name": this.spinner } })));
        }
        if (this.content) {
            loadingInner.push(h("div", { "c": { "loading-content": true } }, this.content));
        }
        return [
            h("ion-gesture", { "c": { "loading-backdrop": true, "hide-backdrop": !this.showBackdrop }, "p": { "attachTo": 'parent', "autoBlockAll": true } }),
            h("div", { "c": { "loading-wrapper": true }, "a": { "role": 'dialog' } }, loadingInner)
        ];
    };
    return Loading;
}());
export { Loading };
