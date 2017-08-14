/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents(

/**** module id (dev mode) ****/
"ion-toggle",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var Toggle = (function () {
    function Toggle() {
        this.activated = false;
        this.hasFocus = false;
        this.checked = false;
        this.disabled = false;
    }
    Toggle.prototype["componentWillLoad"] = function () {
        this.emitStyle();
    };
    Toggle.prototype.changed = function (val) {
        this.ionChange.emit({ checked: val });
        this.emitStyle();
    };
    Toggle.prototype.disableChanged = function () {
        this.emitStyle();
    };
    Toggle.prototype.emitStyle = function () {
        var _this = this;
        clearTimeout(this.styleTmr);
        this.styleTmr = setTimeout(function () {
            _this.ionStyle.emit({
                'toggle-disabled': _this.disabled,
                'toggle-checked': _this.checked,
                'toggle-activated': _this.activated,
                'toggle-focus': _this.hasFocus
            });
        });
    };
    Toggle.prototype.canStart = function () {
        return !this.disabled;
    };
    Toggle.prototype.onDragStart = function (detail) {
        this.startX = detail.startX;
        this.fireFocus();
    };
    Toggle.prototype.onDragMove = function (detail) {
        if (this.checked) {
            if (detail.currentX + 15 < this.startX) {
                this.checked = false;
                this.activated = true;
                this.startX = detail.currentX;
            }
        }
        else if (detail.currentX - 15 > this.startX) {
            this.checked = true;
            this.activated = (detail.currentX < this.startX + 5);
            this.startX = detail.currentX;
        }
    };
    Toggle.prototype.onDragEnd = function (detail) {
        if (this.checked) {
            if (detail.startX + 4 > detail.currentX) {
                this.checked = false;
            }
        }
        else if (detail.startX - 4 < detail.currentX) {
            this.checked = true;
        }
        this.activated = false;
        this.fireBlur();
        this.startX = null;
    };
    Toggle.prototype.onSpace = function (ev) {
        this.toggle();
        ev.stopPropagation();
        ev.preventDefault();
    };
    Toggle.prototype.toggle = function () {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.fireFocus();
        }
        return this.checked;
    };
    Toggle.prototype.fireFocus = function () {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.ionFocus.emit();
            this.emitStyle();
        }
    };
    Toggle.prototype.fireBlur = function () {
        if (this.hasFocus) {
            this.hasFocus = false;
            this.ionBlur.emit();
            this.emitStyle();
        }
    };
    Toggle.prototype.hostData = function () {
        return {
            class: {
                'toggle-activated': this.activated,
                'toggle-checked': this.checked,
                'toggle-disabled': this.disabled
            }
        };
    };
    Toggle.prototype.render = function () {
        return (h("ion-gesture", { "p": { "canStart": this.canStart.bind(this), "onStart": this.onDragStart.bind(this), "onMove": this.onDragMove.bind(this), "onEnd": this.onDragEnd.bind(this), "onPress": this.toggle.bind(this), "gestureName": 'toggle', "gesturePriority": 30, "type": 'pan,press', "direction": 'x', "threshold": 20, "attachTo": 'parent' } },
            h("div", { "c": { "toggle-icon": true } },
                h("div", { "c": { "toggle-inner": true } })),
            h("div", { "c": { "toggle-cover": true }, "a": { "aria-checked": this.checked ? 'true' : false, "aria-disabled": this.disabled ? 'true' : false, "aria-labelledby": this.labelId, "role": 'checkbox' }, "p": { "id": this.id, "tabIndex": 0 } })));
    };
    return Toggle;
}());

exports['ION-TOGGLE'] = Toggle;
},


/***************** ion-toggle *****************/
[
/** ion-toggle: tag **/
"ION-TOGGLE",

/** ion-toggle: members **/
[
  [ "checked", /** prop state **/ 2, /** type boolean **/ 1 ],
  [ "disabled", /** prop state **/ 2, /** type boolean **/ 1 ],
  [ "value", /** prop state **/ 2 ]
],

/** ion-toggle: host **/
{"theme":"toggle"},

/** ion-toggle: events **/
[
  [
    /*****  ion-toggle ionChange ***** /
    /* event name ***/ "ionChange"
  ],
  [
    /*****  ion-toggle ionStyle ***** /
    /* event name ***/ "ionStyle"
  ],
  [
    /*****  ion-toggle ionFocus ***** /
    /* event name ***/ "ionFocus"
  ],
  [
    /*****  ion-toggle ionBlur ***** /
    /* event name ***/ "ionBlur"
  ]
],

/** ion-toggle: propWillChanges **/
0 /* no prop will change methods */,

/** ion-toggle: propDidChanges **/
[
  [
    /*****  ion-toggle prop did change [0] ***** /
    /* prop name **/ "checked",
    /* call fn *****/ "changed"
  ],
  [
    /*****  ion-toggle prop did change [1] ***** /
    /* prop name **/ "disabled",
    /* call fn *****/ "disableChanged"
  ]
]

]
)