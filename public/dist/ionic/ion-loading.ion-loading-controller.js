/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-loading.ion-loading-controller',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
/**
 * iOS Loading Enter Animation
 */
var iOSEnterAnimation = function (baseElm) {
    var baseAnimation = new Ionic.Animation();
    var backdropAnimation = new Ionic.Animation();
    backdropAnimation.addElement(baseElm.querySelector('.loading-backdrop'));
    var wrapperAnimation = new Ionic.Animation();
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
var iOSLeaveAnimation = function (baseElm) {
    var baseAnimation = new Ionic.Animation();
    var backdropAnimation = new Ionic.Animation();
    backdropAnimation.addElement(baseElm.querySelector('.loading-backdrop'));
    var wrapperAnimation = new Ionic.Animation();
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
    Loading.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    Loading.prototype["componentDidLoad"] = function () {
        if (!this.spinner) {
            this.spinner = Ionic.config.get('loadingSpinner', Ionic.config.get('spinner', 'lines'));
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
            // TODO!!
            animationBuilder = iOSEnterAnimation;
        }
        // build the animation and kick it off
        this.animation = animationBuilder(this.el);
        this.animation.onFinish(function (a) {
            a.destroy();
            _this.ionViewDidEnter();
            resolve();
        }).play();
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
                // TODO!!
                animationBuilder = iOSLeaveAnimation;
            }
            // build the animation and kick it off
            _this.animation = animationBuilder(_this.el);
            _this.animation.onFinish(function (a) {
                a.destroy();
                _this.ionLoadingDidDismiss.emit({ loading: _this });
                Core.dom.write(function () {
                    _this.el.parentNode.removeChild(_this.el);
                });
                resolve();
            }).play();
        });
    };
    Loading.prototype["componentDidunload"] = function () {
        this.ionLoadingDidUnload.emit({ loading: this });
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
    LoadingController.prototype["componentDidLoad"] = function () {
        this.appRoot = document.querySelector('ion-app') || document.body;
        Ionic.loadController('loading', this);
    };
    LoadingController.prototype.load = function (opts) {
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
        this.appRoot.appendChild(loading);
        // store the resolve function to be called later up when the loading loads
        return new Promise(function (resolve) {
            _this.loadingResolves[loading.id] = resolve;
        });
    };
    LoadingController.prototype.viewDidLoad = function (ev) {
        var loading = ev.loading;
        var loadingResolve = this.loadingResolves[loading.id];
        if (loadingResolve) {
            loadingResolve(loading);
            delete this.loadingResolves[loading.id];
        }
    };
    LoadingController.prototype.willPresent = function (ev) {
        this.loadings.push(ev.loading);
    };
    LoadingController.prototype.willDismiss = function (ev) {
        var index = this.loadings.indexOf(ev.loading);
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
exports['ION-LOADING-CONTROLLER'] = LoadingController;
},


/***************** ion-loading *****************/
[
/** ion-loading: [0] tag **/
'ION-LOADING',

/** ion-loading: [1] host **/
{"theme":"loading"},

/** ion-loading: [2] states **/
['showSpinner', 'spinner'],

/** ion-loading: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-loading: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-loading: [5] events **/
[
  [
    /*****  ion-loading ionLoadingDidDismiss ***** /
    /* [0] event name ***/ 'ionLoadingDidDismiss',
    /* [1] method name **/ 'ionLoadingDidDismiss',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-loading ionLoadingDidLoad ***** /
    /* [0] event name ***/ 'ionLoadingDidLoad',
    /* [1] method name **/ 'ionLoadingDidLoad',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-loading ionLoadingDidPresent ***** /
    /* [0] event name ***/ 'ionLoadingDidPresent',
    /* [1] method name **/ 'ionLoadingDidPresent',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-loading ionLoadingDidUnload ***** /
    /* [0] event name ***/ 'ionLoadingDidUnload',
    /* [1] method name **/ 'ionLoadingDidUnload',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-loading ionLoadingWillDismiss ***** /
    /* [0] event name ***/ 'ionLoadingWillDismiss',
    /* [1] method name **/ 'ionLoadingWillDismiss',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-loading ionLoadingWillPresent ***** /
    /* [0] event name ***/ 'ionLoadingWillPresent',
    /* [1] method name **/ 'ionLoadingWillPresent',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ]
],

/** ion-loading: [6] methods **/
0 /* no methods */,

/** ion-loading: [7] hostElementMember **/
'el'

],

/***************** ion-loading-controller *****************/
[
/** ion-loading-controller: [0] tag **/
'ION-LOADING-CONTROLLER',

/** ion-loading-controller: [1] host **/
{}

]
)