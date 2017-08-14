/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents(

/**** module id (dev mode) ****/
"ion-modal",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
function createThemedClasses(mode, color, classes) {
    var classObj = {};
    return classes.split(' ')
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
    }, classObj);
}
/**
 * Get the classes from a class list and return them as an object
 */

/**
 * iOS Modal Enter Animation
 */
var iOSEnterAnimation = function (Animation, baseElm) {
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
var iOSLeaveAnimation = function (Animation, baseElm) {
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

var Modal = (function () {
    function Modal() {
        this.componentProps = {};
        this.enableBackdropDismiss = true;
        this.showBackdrop = true;
    }
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
        this.animationCtrl.create(animationBuilder, this.el).then(function (animation) {
            _this.animation = animation;
            animation.onFinish(function (a) {
                a.destroy();
                _this.ionModalDidPresent.emit({ modal: _this });
                resolve();
            }).play();
        });
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
            _this.animationCtrl.create(animationBuilder, _this.el).then(function (animation) {
                _this.animation = animation;
                animation.onFinish(function (a) {
                    a.destroy();
                    _this.ionModalDidDismiss.emit({ modal: _this });
                    Context.dom.write(function () {
                        _this.el.parentNode.removeChild(_this.el);
                    });
                    resolve();
                }).play();
            });
        });
    };
    Modal.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    Modal.prototype["componentDidLoad"] = function () {
        this.ionModalDidLoad.emit({ modal: this });
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
    ModalController.prototype.create = function (opts) {
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
        var appRoot = document.querySelector('ion-app') || document.body;
        appRoot.appendChild(modal);
        // store the resolve function to be called later up when the modal loads
        return new Promise(function (resolve) {
            _this.modalResolves[modal.id] = resolve;
        });
    };
    ModalController.prototype.modalDidLoad = function (ev) {
        var modal = ev.detail.modal;
        var modalResolve = this.modalResolves[modal.id];
        if (modalResolve) {
            modalResolve(modal);
            delete this.modalResolves[modal.id];
        }
    };
    ModalController.prototype.modalWillPresent = function (ev) {
        this.modals.push(ev.detail.modal);
    };
    ModalController.prototype.modalWillDismiss = function (ev) {
        var index = this.modals.indexOf(ev.detail.modal);
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
exports['ION-MODAL-CTRL'] = ModalController;
},


/***************** ion-modal *****************/
[
/** ion-modal: tag **/
"ION-MODAL",

/** ion-modal: members **/
[
  [ "animationCtrl", /** prop connect **/ 4, /** type any **/ 0, /** context ***/ "ion-animation" ],
  [ "component", /** prop **/ 1 ],
  [ "componentProps", /** prop **/ 1 ],
  [ "cssClass", /** prop **/ 1 ],
  [ "el", /** element ref **/ 7 ],
  [ "enableBackdropDismiss", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "enterAnimation", /** prop **/ 1 ],
  [ "exitAnimation", /** prop **/ 1 ],
  [ "id", /** prop **/ 1 ],
  [ "showBackdrop", /** prop **/ 1, /** type boolean **/ 1 ]
],

/** ion-modal: host **/
{"theme":"modal"},

/** ion-modal: events **/
[
  [
    /*****  ion-modal ionModalDidLoad ***** /
    /* event name ***/ "ionModalDidLoad"
  ],
  [
    /*****  ion-modal ionModalWillPresent ***** /
    /* event name ***/ "ionModalWillPresent"
  ],
  [
    /*****  ion-modal ionModalDidPresent ***** /
    /* event name ***/ "ionModalDidPresent"
  ],
  [
    /*****  ion-modal ionModalWillDismiss ***** /
    /* event name ***/ "ionModalWillDismiss"
  ],
  [
    /*****  ion-modal ionModalDidDismiss ***** /
    /* event name ***/ "ionModalDidDismiss"
  ],
  [
    /*****  ion-modal ionModalDidUnload ***** /
    /* event name ***/ "ionModalDidUnload"
  ]
]

],

/***************** ion-modal-ctrl *****************/
[
/** ion-modal-ctrl: tag **/
"ION-MODAL-CTRL",

/** ion-modal-ctrl: members **/
[
  [ "create", /** method **/ 6 ]
],

/** ion-modal-ctrl: host **/
{}

]
)