/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-loading.ion-loading-controller',

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

var LoadingController$$1 = (function () {
    function LoadingController$$1() {
        this.ids = 0;
        this.loadingResolves = {};
        this.loadings = [];
    }
    LoadingController$$1.prototype["componentDidLoad"] = function () {
        this.appRoot = document.querySelector('ion-app') || document.body;
        Ionic.registerController('loading', this);
    };
    LoadingController$$1.prototype.load = function (opts) {
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
    LoadingController$$1.prototype.viewDidLoad = function (ev) {
        var loading = ev.loading;
        var loadingResolve = this.loadingResolves[loading.id];
        if (loadingResolve) {
            loadingResolve(loading);
            delete this.loadingResolves[loading.id];
        }
    };
    LoadingController$$1.prototype.willPresent = function (ev) {
        this.loadings.push(ev.loading);
    };
    LoadingController$$1.prototype.willDismiss = function (ev) {
        var index = this.loadings.indexOf(ev.loading);
        if (index > -1) {
            this.loadings.splice(index, 1);
        }
    };
    LoadingController$$1.prototype.escapeKeyUp = function () {
        var lastLoading = this.loadings[this.loadings.length - 1];
        if (lastLoading) {
            lastLoading.dismiss();
        }
    };
    return LoadingController$$1;
}());

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

/**
 * iOS Loading Enter Animation
 */
var iOSEnterAnimation$1 = function (Animation, baseElm) {
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
var iOSLeaveAnimation$1 = function (Animation, baseElm) {
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

var Loading$$1 = (function () {
    function Loading$$1() {
        this.showSpinner = null;
        this.dismissOnPageChange = false;
        this.showBackdrop = true;
    }
    Loading$$1.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    Loading$$1.prototype["componentDidLoad"] = function () {
        if (!this.spinner) {
            this.spinner = Ionic.config.get('loadingSpinner', Ionic.config.get('spinner', 'lines'));
        }
        if (this.showSpinner === null || this.showSpinner === undefined) {
            this.showSpinner = !!(this.spinner && this.spinner !== 'hide');
        }
        this.ionLoadingDidLoad.emit({ loading: this });
    };
    Loading$$1.prototype.ionViewDidEnter = function () {
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
    Loading$$1.prototype.present = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._present(resolve);
        });
    };
    Loading$$1.prototype._present = function (resolve) {
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
            animationBuilder = iOSEnterAnimation$1;
        }
        // build the animation and kick it off
        Ionic.controller('animation').then(function (Animation) {
            _this.animation = new Animation();
            _this.animation.onFinish(function (a) {
                a.destroy();
                _this.ionViewDidEnter();
                resolve();
            }).play();
        });
    };
    Loading$$1.prototype.dismiss = function () {
        var _this = this;
        clearTimeout(this.durationTimeout);
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        return Ionic.controller('animation').then(function (Animation) {
            return new Promise(function (resolve) {
                _this.ionLoadingWillDismiss.emit({ loading: _this });
                // get the user's animation fn if one was provided
                var animationBuilder = _this.exitAnimation;
                if (!animationBuilder) {
                    // user did not provide a custom animation fn
                    // decide from the config which animation to use
                    // TODO!!
                    animationBuilder = iOSLeaveAnimation$1;
                }
                // build the animation and kick it off
                _this.animation = animationBuilder(Animation, _this.el);
                _this.animation.onFinish(function (a) {
                    a.destroy();
                    _this.ionLoadingDidDismiss.emit({ loading: _this });
                    Core.dom.write(function () {
                        _this.el.parentNode.removeChild(_this.el);
                    });
                    resolve();
                }).play();
            });
        });
    };
    Loading$$1.prototype["componentDidunload"] = function () {
        this.ionLoadingDidUnload.emit({ loading: this });
    };
    Loading$$1.prototype.render = function () {
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
    return Loading$$1;
}());

exports['ION-LOADING'] = Loading$$1;
exports['ION-LOADING-CONTROLLER'] = LoadingController$$1;
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