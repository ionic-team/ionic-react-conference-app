/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents(

/**** module id (dev mode) ****/
"ion-fab",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var FabContainer = (function () {
    function FabContainer() {
    }
    /**
     * Close an active FAB list container
     */
    FabContainer.prototype.close = function () {
        var fab = this.el.querySelector('ion-fab-button');
        fab.close();
    };
    FabContainer.prototype.render = function () {
        return (h(0, 0));
    };
    return FabContainer;
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
var FabButton = (function () {
    function FabButton() {
        this.activated = false;
        this.show = false;
        this.inContainer = false;
        this.inList = false;
        /**
         * @Prop {boolean} If true, sets the button into a disabled state.
         */
        this.disabled = false;
    }
    FabButton.prototype["componentDidLoad"] = function () {
        var parentNode = this.el.parentNode.nodeName;
        this.inList = (parentNode === 'ION-FAB-LIST');
        this.inContainer = (parentNode === 'ION-FAB');
    };
    FabButton.prototype.clickedFab = function () {
        if (this.inContainer) {
            var activated = !this.activated;
            this.setActiveLists(activated);
        }
    };
    /**
     * @hidden
     */
    FabButton.prototype.setActiveLists = function (activated) {
        var lists = this.el.parentElement.querySelectorAll('ion-fab-list');
        if (lists.length > 0) {
            this.activated = activated;
        }
        for (var i = 0; i < lists.length; i++) {
            var list = lists[i].$instance;
            list.activated = activated;
        }
    };
    /**
     * Close an active FAB list container
     */
    FabButton.prototype.close = function () {
        this.setActiveLists(false);
    };
    /**
     * @hidden
     * Get the classes for fab buttons in lists
     */
    FabButton.prototype.getFabListClassList = function () {
        if (!this.inList) {
            return [];
        }
        return [
            "fab-in-list",
            "fab-" + this.mode + "-in-list"
        ];
    };
    /**
     * @hidden
     * Get the close active class for fab buttons
     */
    FabButton.prototype.getFabActiveClassList = function () {
        if (!this.activated) {
            return [];
        }
        return [
            "fab-close-active"
        ];
    };
    /**
     * @hidden
     * Get the show class for fab buttons
     */
    FabButton.prototype.getFabShowClassList = function () {
        if (!this.show) {
            return [];
        }
        return [
            "show"
        ];
    };
    FabButton.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'fab');
        var hostClasses = getElementClassObject(this.el.classList);
        var elementClasses = []
            .concat(this.getFabListClassList(), this.getFabActiveClassList(), this.getFabShowClassList())
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        var TagType = this.href ? 'a' : 'button';
        var fabClasses = __assign({}, themedClasses, hostClasses, elementClasses);
        return (h(TagType, { "c": fabClasses, "o": { "click": this.clickedFab.bind(this) }, "a": { "disabled": this.disabled } },
            h("ion-icon", { "c": { "fab-close-icon": true }, "a": { "name": "close" } }),
            h("span", { "c": { "button-inner": true } },
                h(0, 0)),
            h("div", { "c": { "button-effect": true } })));
    };
    return FabButton;
}());

var FabList = (function () {
    function FabList() {
        this.activated = false;
    }
    FabList.prototype.activatedChange = function (activated) {
        var fabs = this.el.querySelectorAll('ion-fab-button');
        // if showing the fabs add a timeout, else show immediately
        var timeout = activated ? 30 : 0;
        var _loop_1 = function () {
            var fab = fabs[i].$instance;
            setTimeout(function () { return fab.show = activated; }, i * timeout);
        };
        for (var i = 0; i < fabs.length; i++) {
            _loop_1();
        }
    };
    FabList.prototype.hostData = function () {
        return {
            class: {
                'fab-list-active': this.activated
            }
        };
    };
    FabList.prototype.render = function () {
        return (h(0, 0));
    };
    return FabList;
}());

exports['ION-FAB'] = FabContainer;
exports['ION-FAB-BUTTON'] = FabButton;
exports['ION-FAB-LIST'] = FabList;
},


/***************** ion-fab *****************/
[
/** ion-fab: tag **/
"ION-FAB",

/** ion-fab: members **/
[
  [ "close", /** method **/ 6 ],
  [ "el", /** element ref **/ 7 ]
],

/** ion-fab: host **/
{}

],

/***************** ion-fab-button *****************/
[
/** ion-fab-button: tag **/
"ION-FAB-BUTTON",

/** ion-fab-button: members **/
[
  [ "activated", /** state **/ 5 ],
  [ "close", /** method **/ 6 ],
  [ "disabled", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "el", /** element ref **/ 7 ],
  [ "href", /** prop **/ 1 ],
  [ "inContainer", /** state **/ 5 ],
  [ "inList", /** state **/ 5 ],
  [ "show", /** state **/ 5 ]
],

/** ion-fab-button: host **/
{}

],

/***************** ion-fab-list *****************/
[
/** ion-fab-list: tag **/
"ION-FAB-LIST",

/** ion-fab-list: members **/
[
  [ "activated", /** state **/ 5 ],
  [ "el", /** element ref **/ 7 ]
],

/** ion-fab-list: host **/
{},

/** ion-fab-list: events **/
0 /* no events */,

/** ion-fab-list: propWillChanges **/
0 /* no prop will change methods */,

/** ion-fab-list: propDidChanges **/
[
  [
    /*****  ion-fab-list prop did change [0] ***** /
    /* prop name **/ "activated",
    /* call fn *****/ "activatedChange"
  ]
]

]
)