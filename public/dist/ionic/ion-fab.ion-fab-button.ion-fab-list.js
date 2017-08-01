/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-fab.ion-fab-button.ion-fab-list',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
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
     * Get the element classes to add to the child element
     */
    FabButton.prototype.getElementClassList = function () {
        var classList = [].concat(this.el.className.length ? this.el.className.split(' ') : []);
        return classList;
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
        var fabClasses = []
            .concat(this.getElementClassList(), this.getFabListClassList(), this.getFabActiveClassList(), this.getFabShowClassList())
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        var TagType = this.href ? 'a' : 'button';
        fabClasses = Object.assign(fabClasses, themedClasses);
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
/** ion-fab: [0] tag **/
'ION-FAB',

/** ion-fab: [1] host **/
{},

/** ion-fab: [2] states **/
0 /* no states */,

/** ion-fab: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-fab: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-fab: [5] events **/
0 /* no events */,

/** ion-fab: [6] methods **/
['close'],

/** ion-fab: [7] hostElementMember **/
'el'

],

/***************** ion-fab-button *****************/
[
/** ion-fab-button: [0] tag **/
'ION-FAB-BUTTON',

/** ion-fab-button: [1] host **/
{},

/** ion-fab-button: [2] states **/
['activated', 'inContainer', 'inList', 'show'],

/** ion-fab-button: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-fab-button: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-fab-button: [5] events **/
0 /* no events */,

/** ion-fab-button: [6] methods **/
['close'],

/** ion-fab-button: [7] hostElementMember **/
'el'

],

/***************** ion-fab-list *****************/
[
/** ion-fab-list: [0] tag **/
'ION-FAB-LIST',

/** ion-fab-list: [1] host **/
{},

/** ion-fab-list: [2] states **/
['activated'],

/** ion-fab-list: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-fab-list: [4] propDidChanges **/
[
  [
    /*****  ion-fab-list prop did change [0] ***** /
    /* [0] prop name **/ 'activated',
    /* [1] call fn *****/ 'activatedChange'
  ]
],

/** ion-fab-list: [5] events **/
0 /* no events */,

/** ion-fab-list: [6] methods **/
0 /* no methods */,

/** ion-fab-list: [7] hostElementMember **/
'el'

]
)