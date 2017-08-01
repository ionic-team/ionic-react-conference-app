/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-modal.ion-modal-controller',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
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

/**
 * iOS Modal Enter Animation
 */
var iOSEnterAnimation = function (baseElm) {
    var baseAnimation = new Ionic.Animation();
    var backdropAnimation = new Ionic.Animation();
    backdropAnimation.addElement(baseElm.querySelector('.modal-backdrop'));
    var wrapperAnimation = new Ionic.Animation();
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
var iOSLeaveAnimation = function (baseElm) {
    var baseAnimation = new Ionic.Animation();
    var backdropAnimation = new Ionic.Animation();
    backdropAnimation.addElement(baseElm.querySelector('.modal-backdrop'));
    var wrapperAnimation = new Ionic.Animation();
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

var ModalController = (function () {
    function ModalController() {
        this.ids = 0;
        this.modalResolves = {};
        this.modals = [];
    }
    ModalController.prototype["componentDidLoad"] = function () {
        this.appRoot = document.querySelector('ion-app') || document.body;
        Ionic.loadController('modal', this);
    };
    ModalController.prototype.load = function (opts) {
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
    ModalController.prototype.viewDidLoad = function (ev) {
        var modal = ev.modal;
        var modalResolve = this.modalResolves[modal.id];
        if (modalResolve) {
            modalResolve(modal);
            delete this.modalResolves[modal.id];
        }
    };
    ModalController.prototype.willPresent = function (ev) {
        this.modals.push(ev.modal);
    };
    ModalController.prototype.willDismiss = function (ev) {
        var index = this.modals.indexOf(ev.modal);
        if (index > -1) {
            this.modals.splice(index, 1);
        }
    };
    ModalController.prototype.escapeKeyUp = function () {
        var lastModal = this.modals[this.modals.length - 1];
        if (lastModal) {
            lastModal.dismiss();
        }
    };
    return ModalController;
}());

exports['ION-MODAL'] = Modal;
exports['ION-MODAL-CONTROLLER'] = ModalController;
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