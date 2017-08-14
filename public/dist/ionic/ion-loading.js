/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents(

/**** module id (dev mode) ****/
"ion-loading",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
/**
 * iOS Loading Enter Animation
 */
var iOSEnterAnimation = function (Animation, baseElm) {
    var baseAnimation = new Animation();
    var backdropAnimation = new Animation();
    backdropAnimation.addElement(baseElm.querySelector('.loading-backdrop'));
    var wrapperAnimation = new Animation();
    wrapperAnimation.addElement(baseElm.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.3);
    wrapperAnimation.fromTo('opacity', 0.01, 1)
        .fromTo('scale', 1.1, 1);
    return baseAnimation
        .addElement(baseElm)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation);
};

/**
 * iOS Loading Leave Animation
 */
var iOSLeaveAnimation = function (Animation, baseElm) {
    var baseAnimation = new Animation();
    var backdropAnimation = new Animation();
    backdropAnimation.addElement(baseElm.querySelector('.loading-backdrop'));
    var wrapperAnimation = new Animation();
    wrapperAnimation.addElement(baseElm.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.3, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0)
        .fromTo('scale', 1, 0.9);
    return baseAnimation
        .addElement(baseElm)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation);
};

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

var LoadingController = (function () {
    function LoadingController() {
        this.ids = 0;
        this.loadingResolves = {};
        this.loadings = [];
    }
    LoadingController.prototype.create = function (opts) {
        var _this = this;
        // create ionic's wrapping ion-loading component
        var loading = document.createElement('ion-loading');
        var id = this.ids++;
        // give this loading a unique id
        loading.id = "loading-" + id;
        loading.style.zIndex = (20000 + id).toString();
        // convert the passed in loading options into props
        // that get passed down into the new loading
        Object.assign(loading, opts);
        // append the loading element to the document body
        var appRoot = document.querySelector('ion-app') || document.body;
        appRoot.appendChild(loading);
        // store the resolve function to be called later up when the loading loads
        return new Promise(function (resolve) {
            _this.loadingResolves[loading.id] = resolve;
        });
    };
    LoadingController.prototype.viewDidLoad = function (ev) {
        var loading = ev.detail.loading;
        var loadingResolve = this.loadingResolves[loading.id];
        if (loadingResolve) {
            loadingResolve(loading);
            delete this.loadingResolves[loading.id];
        }
    };
    LoadingController.prototype.willPresent = function (ev) {
        this.loadings.push(ev.detail.loading);
    };
    LoadingController.prototype.willDismiss = function (ev) {
        var index = this.loadings.indexOf(ev.detail.loading);
        if (index > -1) {
            this.loadings.splice(index, 1);
        }
    };
    LoadingController.prototype.escapeKeyUp = function () {
        var lastLoading = this.loadings[this.loadings.length - 1];
        if (lastLoading) {
            lastLoading.dismiss();
        }
    };
    return LoadingController;
}());

exports['ION-LOADING'] = Loading;
exports['ION-LOADING-CTRL'] = LoadingController;
},


/***************** ion-loading *****************/
[
/** ion-loading: tag **/
"ION-LOADING",

/** ion-loading: members **/
[
  [ "animationCtrl", /** prop connect **/ 4, /** type any **/ 0, /** context ***/ "ion-animation" ],
  [ "config", /** prop context **/ 3, /** type any **/ 0, /** context ***/ "config" ],
  [ "content", /** prop **/ 1 ],
  [ "cssClass", /** prop **/ 1 ],
  [ "dismissOnPageChange", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "duration", /** prop **/ 1, /** type number **/ 2 ],
  [ "el", /** element ref **/ 7 ],
  [ "enterAnimation", /** prop **/ 1 ],
  [ "exitAnimation", /** prop **/ 1 ],
  [ "id", /** prop **/ 1 ],
  [ "showBackdrop", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "showSpinner", /** state **/ 5 ],
  [ "spinner", /** state **/ 5 ]
],

/** ion-loading: host **/
{"theme":"loading"},

/** ion-loading: events **/
[
  [
    /*****  ion-loading ionLoadingDidLoad ***** /
    /* event name ***/ "ionLoadingDidLoad"
  ],
  [
    /*****  ion-loading ionLoadingDidPresent ***** /
    /* event name ***/ "ionLoadingDidPresent"
  ],
  [
    /*****  ion-loading ionLoadingWillPresent ***** /
    /* event name ***/ "ionLoadingWillPresent"
  ],
  [
    /*****  ion-loading ionLoadingWillDismiss ***** /
    /* event name ***/ "ionLoadingWillDismiss"
  ],
  [
    /*****  ion-loading ionLoadingDidDismiss ***** /
    /* event name ***/ "ionLoadingDidDismiss"
  ],
  [
    /*****  ion-loading ionLoadingDidUnload ***** /
    /* event name ***/ "ionLoadingDidUnload"
  ]
]

],

/***************** ion-loading-ctrl *****************/
[
/** ion-loading-ctrl: tag **/
"ION-LOADING-CTRL",

/** ion-loading-ctrl: members **/
[
  [ "create", /** method **/ 6 ]
],

/** ion-loading-ctrl: host **/
{}

]
)