/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-modal.ion-modal-controller',

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

/**
 * iOS Loading Enter Animation
 */

/**
 * iOS Loading Leave Animation
 */

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

var ModalController$$1 = (function () {
    function ModalController$$1() {
        this.ids = 0;
        this.modalResolves = {};
        this.modals = [];
    }
    ModalController$$1.prototype["componentDidLoad"] = function () {
        this.appRoot = document.querySelector('ion-app') || document.body;
        Ionic.registerController('modal', this);
    };
    ModalController$$1.prototype.load = function (opts) {
        var _this = this;
        // create ionic's wrapping ion-modal component
        var modal = document.createElement('ion-modal');
        var id = this.ids++;
        // give this modal a unique id
        modal.id = "modal-" + id;
        modal.style.zIndex = (10000 + id).toString();
        // convert the passed in modal options into props
        // that get passed down into the new modal
        Object.assign(modal, opts);
        // append the modal element to the document body
        this.appRoot.appendChild(modal);
        // store the resolve function to be called later up when the modal loads
        return new Promise(function (resolve) {
            _this.modalResolves[modal.id] = resolve;
        });
    };
    ModalController$$1.prototype.modalDidLoad = function (ev) {
        var modal = ev.detail.modal;
        var modalResolve = this.modalResolves[modal.id];
        if (modalResolve) {
            modalResolve(modal);
            delete this.modalResolves[modal.id];
        }
    };
    ModalController$$1.prototype.modalWillPresent = function (ev) {
        this.modals.push(ev.detail.modal);
    };
    ModalController$$1.prototype.modalWillDismiss = function (ev) {
        var index = this.modals.indexOf(ev.detail.modal);
        if (index > -1) {
            this.modals.splice(index, 1);
        }
    };
    ModalController$$1.prototype.escapeKeyUp = function () {
        var lastModal = this.modals[this.modals.length - 1];
        if (lastModal) {
            lastModal.dismiss();
        }
    };
    return ModalController$$1;
}());

function createThemedClasses(mode, color, classList) {
    var allClassObj = {};
    return classList.split(' ')
        .reduce(function (classObj, classString) {
        classObj[classString] = true;
        if (mode) {
            classObj[classString + "-" + mode] = true;
            if (color) {
                classObj[classString + "-" + color] = true;
                classObj[classString + "-" + mode + "-" + color] = true;
            }
        }
        return classObj;
    }, allClassObj);
}

var Ionic = window.Ionic;

/**
 * iOS Modal Enter Animation
 */
var iOSEnterAnimation$1 = function (Animation, baseElm) {
    var baseAnimation = new Animation();
    var backdropAnimation = new Animation();
    backdropAnimation.addElement(baseElm.querySelector('.modal-backdrop'));
    var wrapperAnimation = new Animation();
    wrapperAnimation.addElement(baseElm.querySelector('.modal-wrapper'));
    wrapperAnimation.beforeStyles({ 'opacity': 1 })
        .fromTo('translateY', '100%', '0%');
    backdropAnimation.fromTo('opacity', 0.01, 0.4);
    return baseAnimation
        .addElement(baseElm)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(400)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation);
};
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
var iOSLeaveAnimation$1 = function (Animation, baseElm) {
    var baseAnimation = new Animation();
    var backdropAnimation = new Animation();
    backdropAnimation.addElement(baseElm.querySelector('.modal-backdrop'));
    var wrapperAnimation = new Animation();
    var wrapperElm = baseElm.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperElm);
    var wrapperElmRect = wrapperElm.getBoundingClientRect();
    wrapperAnimation.beforeStyles({ 'opacity': 1 })
        .fromTo('translateY', '0%', window.innerHeight - wrapperElmRect.top + "px");
    backdropAnimation.fromTo('opacity', 0.4, 0.0);
    return baseAnimation
        .addElement(baseElm)
        .easing('ease-out')
        .duration(250)
        .add(backdropAnimation)
        .add(wrapperAnimation);
};

var Modal$$1 = (function () {
    function Modal$$1() {
        this.componentProps = {};
        this.enableBackdropDismiss = true;
        this.showBackdrop = true;
    }
    Modal$$1.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    Modal$$1.prototype["componentDidLoad"] = function () {
        this.ionModalDidLoad.emit({ modal: this });
    };
    Modal$$1.prototype.present = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._present(resolve);
        });
    };
    Modal$$1.prototype._present = function (resolve) {
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
            animationBuilder = iOSEnterAnimation$1;
        }
        Ionic.controller('animation').then(function (Animation) {
            // build the animation and kick it off
            _this.animation = animationBuilder(Animation, _this.el);
            _this.animation.onFinish(function (a) {
                a.destroy();
                _this.ionModalDidPresent.emit({ modal: _this });
                resolve();
            }).play();
        });
    };
    Modal$$1.prototype.dismiss = function () {
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
                animationBuilder = iOSLeaveAnimation$1;
            }
            // build the animation and kick it off
            Ionic.controller('animation').then(function (Animation) {
                _this.animation = animationBuilder(Animation, _this.el);
                _this.animation.onFinish(function (a) {
                    a.destroy();
                    _this.ionModalDidDismiss.emit({ modal: _this });
                    Core.dom.write(function () {
                        _this.el.parentNode.removeChild(_this.el);
                    });
                    resolve();
                }).play();
            });
        });
    };
    Modal$$1.prototype["componentDidunload"] = function () {
        this.ionModalDidUnload.emit({ modal: this });
    };
    Modal$$1.prototype.backdropClick = function () {
        if (this.enableBackdropDismiss) {
            // const opts: NavOptions = {
            //   minClickBlockDuration: 400
            // };
            this.dismiss();
        }
    };
    Modal$$1.prototype.render = function () {
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
    return Modal$$1;
}());

exports['ION-MODAL'] = Modal$$1;
exports['ION-MODAL-CONTROLLER'] = ModalController$$1;
},


/***************** ion-modal *****************/
[
/** ion-modal: [0] tag **/
'ION-MODAL',

/** ion-modal: [1] host **/
{},

/** ion-modal: [2] states **/
0 /* no states */,

/** ion-modal: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-modal: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-modal: [5] events **/
[
  [
    /*****  ion-modal ionModalDidDismiss ***** /
    /* [0] event name ***/ 'ionModalDidDismiss',
    /* [1] method name **/ 'ionModalDidDismiss',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-modal ionModalDidLoad ***** /
    /* [0] event name ***/ 'ionModalDidLoad',
    /* [1] method name **/ 'ionModalDidLoad',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-modal ionModalDidPresent ***** /
    /* [0] event name ***/ 'ionModalDidPresent',
    /* [1] method name **/ 'ionModalDidPresent',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-modal ionModalDidUnload ***** /
    /* [0] event name ***/ 'ionModalDidUnload',
    /* [1] method name **/ 'ionModalDidUnload',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-modal ionModalWillDismiss ***** /
    /* [0] event name ***/ 'ionModalWillDismiss',
    /* [1] method name **/ 'ionModalWillDismiss',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ],
  [
    /*****  ion-modal ionModalWillPresent ***** /
    /* [0] event name ***/ 'ionModalWillPresent',
    /* [1] method name **/ 'ionModalWillPresent',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ]
],

/** ion-modal: [6] methods **/
0 /* no methods */,

/** ion-modal: [7] hostElementMember **/
'el'

],

/***************** ion-modal-controller *****************/
[
/** ion-modal-controller: [0] tag **/
'ION-MODAL-CONTROLLER',

/** ion-modal-controller: [1] host **/
{}

]
)