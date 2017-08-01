/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-segment.ion-segment-button',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
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
     * Get the element classes to add to the child element
     */
    SegmentButton.prototype.getElementClassList = function () {
        var classList = [].concat(this.disabled ? 'segment-button-disabled' : [], this.activated ? 'segment-activated' : []);
        return classList;
    };
    SegmentButton.prototype.render = function () {
        var segmentButtonCss = createThemedClasses(this.mode, this.color, 'segment-button');
        var segmentButtonClasses = []
            .concat(this.getElementClassList())
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        segmentButtonClasses = Object.assign(segmentButtonClasses, segmentButtonCss);
        return [
            h("button", { "c": segmentButtonClasses, "o": { "click": this.segmentButtonClick.bind(this) }, "a": { "aria-pressed": this.activated } },
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
/** ion-segment: [0] tag **/
'ION-SEGMENT',

/** ion-segment: [1] host **/
{"theme":"segment"},

/** ion-segment: [2] states **/
0 /* no states */,

/** ion-segment: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-segment: [4] propDidChanges **/
[
  [
    /*****  ion-segment prop did change [0] ***** /
    /* [0] prop name **/ 'value',
    /* [1] call fn *****/ 'changed'
  ]
],

/** ion-segment: [5] events **/
[
  [
    /*****  ion-segment ionChange ***** /
    /* [0] event name ***/ 'ionChange',
    /* [1] method name **/ 'ionChange',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ]
],

/** ion-segment: [6] methods **/
0 /* no methods */,

/** ion-segment: [7] hostElementMember **/
'el'

],

/***************** ion-segment-button *****************/
[
/** ion-segment-button: [0] tag **/
'ION-SEGMENT-BUTTON',

/** ion-segment-button: [1] host **/
{},

/** ion-segment-button: [2] states **/
['activated'],

/** ion-segment-button: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-segment-button: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-segment-button: [5] events **/
[
  [
    /*****  ion-segment-button ionClick ***** /
    /* [0] event name ***/ 'ionClick',
    /* [1] method name **/ 'ionClick',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ]
]

]
)