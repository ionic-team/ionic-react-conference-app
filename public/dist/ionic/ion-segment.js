/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents(

/**** module id (dev mode) ****/
"ion-segment",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var Segment = (function () {
    function Segment() {
        this.disabled = false;
    }
    Segment.prototype.changed = function (val) {
        this.selectButton(val);
    };
    Segment.prototype["componentDidLoad"] = function () {
        this.buttons = this.el.querySelectorAll('ion-segment-button');
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i].$instance;
            button.activated = (button.value === this.value);
            // If there is no value set on the segment and a button
            // is checked we should activate it
            if (!this.value && button.checked) {
                button.activated = button.checked;
            }
        }
    };
    Segment.prototype.segmentClick = function (ev) {
        var selectedButton = ev.detail.segmentButton;
        this.value = selectedButton.value;
        this.selectButton(this.value);
        var event = {
            'segment': this
        };
        this.ionChange.emit(event);
    };
    Segment.prototype.selectButton = function (val) {
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i].$instance;
            button.activated = (button.value === val);
        }
        // returning true tells the renderer to queue an update
        return true;
    };
    Segment.prototype.hostData = function () {
        return {
            class: {
                'segment-disabled': this.disabled
            }
        };
    };
    Segment.prototype.render = function () {
        return h(0, 0);
    };
    return Segment;
}());

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
function getElementClassObject(classList) {
    var classObj = {};
    for (var i = 0; i < classList.length; i++) {
        classObj[classList.item(i)] = true;
    }
    return classObj;
}

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var SegmentButton = (function () {
    function SegmentButton() {
        this.activated = false;
        /*
         * @input {boolean} If true, the button is selected. Default false.
         */
        this.checked = false;
        /*
         * @input {boolean} If true, the user cannot interact with this element. Default false.
         */
        this.disabled = false;
    }
    SegmentButton.prototype.segmentButtonClick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        console.log('in segment button click');
        this.emitClick();
    };
    /**
     * Emit the click event to the parent segment
     */
    SegmentButton.prototype.emitClick = function () {
        var _this = this;
        clearTimeout(this.styleTmr);
        this.styleTmr = setTimeout(function () {
            var ev = {
                'segmentButton': _this
            };
            _this.ionClick.emit(ev);
        });
    };
    /**
     * @hidden
     * Get the classes for the segment button state
     */
    SegmentButton.prototype.getElementClassList = function () {
        var classList = [].concat(this.disabled ? 'segment-button-disabled' : [], this.activated ? 'segment-activated' : []);
        return classList;
    };
    SegmentButton.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'segment-button');
        var hostClasses = getElementClassObject(this.el.classList);
        var elementClasses = []
            .concat(this.getElementClassList())
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        var buttonClasses = __assign({}, themedClasses, hostClasses, elementClasses);
        return [
            h("button", { "c": buttonClasses, "o": { "click": this.segmentButtonClick.bind(this) }, "a": { "aria-pressed": this.activated } },
                h(0, 0))
        ];
    };
    return SegmentButton;
}());

exports['ION-SEGMENT'] = Segment;
exports['ION-SEGMENT-BUTTON'] = SegmentButton;
},


/***************** ion-segment *****************/
[
/** ion-segment: tag **/
"ION-SEGMENT",

/** ion-segment: members **/
[
  [ "disabled", /** prop state **/ 2, /** type boolean **/ 1 ],
  [ "el", /** element ref **/ 7 ],
  [ "value", /** prop state **/ 2 ]
],

/** ion-segment: host **/
{"theme":"segment"},

/** ion-segment: events **/
[
  [
    /*****  ion-segment ionChange ***** /
    /* event name ***/ "ionChange"
  ]
],

/** ion-segment: propWillChanges **/
0 /* no prop will change methods */,

/** ion-segment: propDidChanges **/
[
  [
    /*****  ion-segment prop did change [0] ***** /
    /* prop name **/ "value",
    /* call fn *****/ "changed"
  ]
]

],

/***************** ion-segment-button *****************/
[
/** ion-segment-button: tag **/
"ION-SEGMENT-BUTTON",

/** ion-segment-button: members **/
[
  [ "activated", /** state **/ 5 ],
  [ "checked", /** prop state **/ 2, /** type boolean **/ 1 ],
  [ "disabled", /** prop state **/ 2, /** type boolean **/ 1 ],
  [ "el", /** element ref **/ 7 ],
  [ "value", /** prop state **/ 2 ]
],

/** ion-segment-button: host **/
{},

/** ion-segment-button: events **/
[
  [
    /*****  ion-segment-button ionClick ***** /
    /* event name ***/ "ionClick"
  ]
]

]
)