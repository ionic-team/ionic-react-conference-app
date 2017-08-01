/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-button.ion-buttons.ion-icon',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
var Button = (function () {
    function Button() {
        this.itemButton = false;
        /**
         * @Prop {string} The type of button.
         * Possible values are: `"button"`, `"bar-button"`.
         */
        this.buttonType = 'button';
        /**
         * @Prop {boolean} If true, activates the large button size.
         * Type: size
         */
        this.large = false;
        /**
         * @Prop {boolean} If true, activates the small button size.
         * Type: size
         */
        this.small = false;
        /**
         * @Prop {boolean} If true, activates the default button size. Normally the default, useful for buttons in an item.
         * Type: size
         */
        this.default = false;
        /**
         * @Prop {boolean} If true, sets the button into a disabled state.
         */
        this.disabled = false;
        /**
         * @Prop {boolean} If true, activates a transparent button style with a border.
         * Type: style
         */
        this.outline = false;
        /**
         * @Prop {boolean} If true, activates a transparent button style without a border.
         * Type: style
         */
        this.clear = false;
        /**
         * @Prop {boolean} If true, activates a solid button style. Normally the default, useful for buttons in a toolbar.
         * Type: style
         */
        this.solid = false;
        /**
         * @Prop {boolean} If true, activates a button with rounded corners.
         * Type: shape
         */
        this.round = false;
        /**
         * @Prop {boolean} If true, activates a button style that fills the available width.
         * Type: display
         */
        this.block = false;
        /**
         * @Prop {boolean} If true, activates a button style that fills the available width without
         * a left and right border.
         * Type: display
         */
        this.full = false;
        /**
         * @Prop {boolean} If true, activates a button with a heavier font weight.
         * Type: decorator
         */
        this.strong = false;
    }
    /**
     * @hidden
     * Get the classes based on the button type
     * e.g. alert-button, action-sheet-button
     */
    Button.prototype.getButtonClassList = function (buttonType, mode) {
        if (!buttonType) {
            return [];
        }
        return [
            buttonType,
            buttonType + "-" + mode
        ];
    };
    /**
     * @hidden
     * Get the classes based on the type
     * e.g. block, full, round, large
     */
    Button.prototype.getClassList = function (buttonType, type, mode) {
        if (!type) {
            return [];
        }
        type = type.toLocaleLowerCase();
        return [
            buttonType + "-" + type,
            buttonType + "-" + type + "-" + mode
        ];
    };
    /**
     * @hidden
     * Get the classes for the color
     */
    Button.prototype.getColorClassList = function (color, buttonType, style, mode) {
        style = (buttonType !== 'bar-button' && style === 'solid') ? 'default' : style;
        var className = buttonType +
            ((style && style !== 'default') ?
                '-' + style.toLowerCase() :
                '');
        // special case for a default bar button
        // if the bar button is default it should get the style
        // but if a color is passed the style shouldn't be added
        if (buttonType === 'bar-button' && style === 'default') {
            className = buttonType;
            if (!color) {
                className += '-' + style.toLowerCase();
            }
        }
        return [className + "-" + mode].concat(style !== 'default' ? "" + className : [], color ? className + "-" + mode + "-" + color : []);
    };
    /**
     * @hidden
     * Get the classes for the style
     * e.g. outline, clear, solid
     */
    Button.prototype.getStyleClassList = function (buttonType) {
        var classList = [].concat(this.outline ? this.getColorClassList(this.color, buttonType, 'outline', this.mode) : [], this.clear ? this.getColorClassList(this.color, buttonType, 'clear', this.mode) : [], this.solid ? this.getColorClassList(this.color, buttonType, 'solid', this.mode) : []);
        if (classList.length === 0) {
            classList = this.getColorClassList(this.color, buttonType, 'default', this.mode);
        }
        return classList;
    };
    /**
     * @hidden
     * Get the item classes for the button
     */
    Button.prototype.getItemClassList = function (size) {
        var classList = [].concat(this.itemButton && !size ? 'item-button' : []);
        return classList;
    };
    /**
     * @hidden
     * Get the element classes to add to the child element
     */
    Button.prototype.getElementClassList = function () {
        var classList = [].concat(this.el.className.length ? this.el.className.split(' ') : []);
        return classList;
    };
    Button.prototype.render = function () {
        var size = (this.large ? 'large' : null) ||
            (this.small ? 'small' : null) ||
            (this.default ? 'default' : null);
        var shape = (this.round ? 'round' : null);
        var display = (this.block ? 'block' : null) ||
            (this.full ? 'full' : null);
        var decorator = (this.strong ? 'strong' : null);
        var buttonClasses = []
            .concat(this.getButtonClassList(this.buttonType, this.mode), this.getClassList(this.buttonType, shape, this.mode), this.getClassList(this.buttonType, display, this.mode), this.getClassList(this.buttonType, size, this.mode), this.getClassList(this.buttonType, decorator, this.mode), this.getStyleClassList(this.buttonType), this.getItemClassList(size), this.getElementClassList())
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        var TagType = this.href ? 'a' : 'button';
        return (h(TagType, { "c": buttonClasses, "a": { "disabled": this.disabled } },
            h("span", { "c": { "button-inner": true } },
                h(0, { "a": { "name": 'icon-only' } }),
                h(0, { "a": { "name": 'start' } }),
                h(0, 0),
                h(0, { "a": { "name": 'end' } })),
            h("div", { "c": { "button-effect": true } })));
    };
    return Button;
}());

var Buttons = (function () {
    function Buttons() {
    }
    Buttons.prototype["componentDidLoad"] = function () {
        var buttons = this.el.querySelectorAll('ion-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('button-type', 'bar-button');
        }
    };
    Buttons.prototype.render = function () {
        return h(0, 0);
    };
    return Buttons;
}());

var Icon = (function () {
    function Icon() {
        /**
         * @input {string} Specifies the label to use for accessibility. Defaults to the icon name.
         */
        this.ariaLabel = '';
        /**
         * @input {string} Specifies which icon to use. The appropriate icon will be used based on the mode.
         * For more information, see [Ionicons](/docs/ionicons/).
         */
        this.name = '';
        /**
         * @input {string} Specifies which icon to use on `ios` mode.
         */
        this.ios = '';
        /**
         * @input {string} Specifies which icon to use on `md` mode.
         */
        this.md = '';
        this.svgContent = null;
    }
    Icon.prototype.getSvgUrl = function () {
        var iconName = this.iconName;
        if (iconName !== null) {
            return publicPath + "svg/" + iconName + ".svg";
        }
        return null;
    };
    Object.defineProperty(Icon.prototype, "iconName", {
        get: function () {
            // if no name was passed set iconName to null
            if (!this.name) {
                return null;
            }
            var iconName = this.name.toLowerCase();
            // default to "md" if somehow the mode wasn't set
            var mode = this.mode || 'md';
            if (!(/^md-|^ios-|^logo-/.test(iconName))) {
                // this does not have one of the defaults
                // so lets auto add in the mode prefix for them
                iconName = mode + '-' + iconName;
            }
            else if (this.ios && mode === 'ios') {
                // if an icon was passed in using the ios or md attributes
                // set the iconName to whatever was passed in
                // when we're also on that mode
                // basically, use the ios attribute when you're on ios
                iconName = this.ios;
            }
            else if (this.md && mode === 'md') {
                // use the md attribute when you're in md mode
                // and the md attribute has been set
                iconName = this.md;
            }
            // only allow alpha characters and dash
            var invalidChars = iconName.replace(/[a-z]|-/g, '');
            if (invalidChars !== '') {
                console.error("invalid characters in ion-icon name: " + invalidChars);
                return null;
            }
            return iconName;
        },
        enumerable: true,
        configurable: true
    });
    Icon.prototype.hostData = function () {
        var attrs = {
            'role': 'img'
        };
        if (this.ariaLabel) {
            // user provided label
            attrs['aria-label'] = this.ariaLabel;
        }
        else {
            // come up with the label based on the icon name
            var iconName = this.iconName;
            if (iconName) {
                attrs['aria-label'] = iconName
                    .replace('ios-', '')
                    .replace('md-', '')
                    .replace(/\-/g, ' ');
            }
        }
        return {
            attrs: attrs
        };
    };
    Icon.loadSvgContent = function (svgUrl, callback) {
        // static since all IonIcons use this same function and pointing at global/shared data
        // passed in callback will have instance info
        // add to the list of callbacks to fiure when this url is finished loading
        IonIcon.loadCallbacks[svgUrl] = IonIcon.loadCallbacks[svgUrl] || [];
        IonIcon.loadCallbacks[svgUrl].push(callback);
        if (IonIcon.activeRequests[svgUrl]) {
            // already requesting this url, don't bother again kicking off another
            return;
        }
        // add this url to our list of active requests
        IonIcon.activeRequests[svgUrl] = true;
        // kick off the request for the external svg file
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
            // awesome, we've finished loading the svg file
            // remove this url from the active requests
            delete IonIcon.activeRequests[svgUrl];
            // this response is the content of the svg file we're looking for
            var svgContent = this.responseText;
            if (this.status >= 400) {
                // umm, not awesome, something is up
                console.error('Icon could not be loaded:', svgUrl);
                svgContent = "<!--error loading svg-->";
            }
            // cache the svg content in the global IonIcon constant
            IonIcon.svgContents[svgUrl] = svgContent;
            // find any callbacks waiting on this url
            var svgLoadCallbacks = IonIcon.loadCallbacks[svgUrl];
            if (svgLoadCallbacks) {
                // loop through all the callbacks that are waiting on the svg content
                for (var i = 0; i < svgLoadCallbacks.length; i++) {
                    // fire off this callback which was provided by an instance
                    svgLoadCallbacks[i](svgContent);
                }
                delete IonIcon.loadCallbacks[svgUrl];
            }
        });
        xhr.addEventListener('error', function () {
            // umm, idk
            console.error('Icon could not be loaded:', svgUrl);
        });
        // let's do this!
        xhr.open('GET', svgUrl, true);
        xhr.send();
    };
    Icon.prototype.render = function () {
        var _this = this;
        var svgUrl = this.getSvgUrl();
        if (!svgUrl) {
            // we don't have good data
            return h("div", { "c": { "icon-inner": true } });
        }
        var svgContent = IonIcon.svgContents[svgUrl];
        if (svgContent === this.svgContent) {
            // we've already loaded up this svg at one point
            // and the svg content we've loaded and assigned checks out
            // render this svg!!
            return h("div", { "c": { "icon-inner": true }, "p": { "innerHTML": svgContent } });
        }
        // haven't loaded this svg yet
        // start the request
        Icon.loadSvgContent(svgUrl, function (loadedSvgContent) {
            // we're finished loading the svg content!
            // set to this.svgContent so we do another render
            _this.svgContent = loadedSvgContent;
        });
        // actively requesting the svg, so let's just render a div for now
        return h("div", { "c": { "icon-inner": true } });
    };
    return Icon;
}());
var IonIcon = {
    activeRequests: {},
    loadCallbacks: [],
    svgContents: {}
};

exports['ION-BUTTON'] = Button;
exports['ION-BUTTONS'] = Buttons;
exports['ION-ICON'] = Icon;
},


/***************** ion-button *****************/
[
/** ion-button: [0] tag **/
'ION-BUTTON',

/** ion-button: [1] host **/
{},

/** ion-button: [2] states **/
0 /* no states */,

/** ion-button: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-button: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-button: [5] events **/
0 /* no events */,

/** ion-button: [6] methods **/
0 /* no methods */,

/** ion-button: [7] hostElementMember **/
'el'

],

/***************** ion-buttons *****************/
[
/** ion-buttons: [0] tag **/
'ION-BUTTONS',

/** ion-buttons: [1] host **/
{"theme":"bar-buttons"},

/** ion-buttons: [2] states **/
0 /* no states */,

/** ion-buttons: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-buttons: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-buttons: [5] events **/
0 /* no events */,

/** ion-buttons: [6] methods **/
0 /* no methods */,

/** ion-buttons: [7] hostElementMember **/
'el'

],

/***************** ion-icon *****************/
[
/** ion-icon: [0] tag **/
'ION-ICON',

/** ion-icon: [1] host **/
{"theme":"icon"},

/** ion-icon: [2] states **/
['ariaLabel', 'svgContent']

]
)