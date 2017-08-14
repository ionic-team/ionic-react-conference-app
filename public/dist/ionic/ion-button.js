/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents(

/**** module id (dev mode) ****/
"ion-button",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
/**
 * Create the mode and color classes for the component based on the classes passed in
 */

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
    Button.prototype.render = function () {
        var buttonType = this.buttonType;
        var mode = this.mode;
        var size = (this.large ? 'large' : null) ||
            (this.small ? 'small' : null) ||
            (this.default ? 'default' : null);
        var shape = (this.round ? 'round' : null);
        var display = (this.block ? 'block' : null) ||
            (this.full ? 'full' : null);
        var decorator = (this.strong ? 'strong' : null);
        var hostClasses = getElementClassObject(this.el.classList);
        var elementClasses = []
            .concat(getButtonClassList(buttonType, mode), getClassList(buttonType, shape, mode), getClassList(buttonType, display, mode), getClassList(buttonType, size, mode), getClassList(buttonType, decorator, mode), getStyleClassList(mode, this.color, buttonType, this.outline, this.clear, this.solid), getItemClassList(this.itemButton, size))
            .reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
        var TagType = this.href ? 'a' : 'button';
        var buttonClasses = __assign({}, hostClasses, elementClasses);
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
/**
 * Get the classes based on the button type
 * e.g. alert-button, action-sheet-button
 */
function getButtonClassList(buttonType, mode) {
    if (!buttonType) {
        return [];
    }
    return [
        buttonType,
        buttonType + "-" + mode
    ];
}
/**
 * Get the classes based on the type
 * e.g. block, full, round, large
 */
function getClassList(buttonType, type, mode) {
    if (!type) {
        return [];
    }
    type = type.toLocaleLowerCase();
    return [
        buttonType + "-" + type,
        buttonType + "-" + type + "-" + mode
    ];
}
/**
 * Get the classes for the color
 */
function getColorClassList(color, buttonType, style, mode) {
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
}
/**
 * Get the classes for the style
 * e.g. outline, clear, solid
 */
function getStyleClassList(mode, color, buttonType, outline, clear, solid) {
    var classList = [].concat(outline ? getColorClassList(color, buttonType, 'outline', mode) : [], clear ? getColorClassList(color, buttonType, 'clear', mode) : [], solid ? getColorClassList(color, buttonType, 'solid', mode) : []);
    if (classList.length === 0) {
        classList = getColorClassList(color, buttonType, 'default', mode);
    }
    return classList;
}
/**
 * Get the item classes for the button
 */
function getItemClassList(itemButton, size) {
    return itemButton && !size ? ['item-button'] : [];
}

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
    Icon.prototype.render = function () {
        var _this = this;
        if (this.isServer) {
            return h("div", { "c": { "icon-inner": true } });
        }
        var svgUrl = getSvgUrl(this.iconName);
        if (!svgUrl) {
            // we don't have good data
            return h("div", { "c": { "icon-inner": true } });
        }
        var svgContent = svgContents[svgUrl];
        if (svgContent === this.svgContent) {
            // we've already loaded up this svg at one point
            // and the svg content we've loaded and assigned checks out
            // render this svg!!
            return h("div", { "c": { "icon-inner": true }, "p": { "innerHTML": svgContent } });
        }
        // haven't loaded this svg yet
        // start the request
        loadSvgContent(svgUrl, function (loadedSvgContent) {
            // we're finished loading the svg content!
            // set to this.svgContent so we do another render
            _this.svgContent = loadedSvgContent;
        });
        // actively requesting the svg, so let's just render a div for now
        return h("div", { "c": { "icon-inner": true } });
    };
    return Icon;
}());
function getSvgUrl(iconName) {
    if (iconName !== null) {
        return publicPath + "svg/" + iconName + ".svg";
    }
    return null;
}
function loadSvgContent(svgUrl, callback) {
    // static since all IonIcons use this same function and pointing at global/shared data
    // passed in callback will have instance info
    // add to the list of callbacks to fiure when this url is finished loading
    loadCallbacks[svgUrl] = loadCallbacks[svgUrl] || [];
    loadCallbacks[svgUrl].push(callback);
    if (activeRequests[svgUrl]) {
        // already requesting this url, don't bother again kicking off another
        return;
    }
    // add this url to our list of active requests
    activeRequests[svgUrl] = true;
    // kick off the request for the external svg file
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
        // awesome, we've finished loading the svg file
        // remove this url from the active requests
        delete activeRequests[svgUrl];
        // this response is the content of the svg file we're looking for
        var svgContent = this.responseText;
        if (this.status >= 400) {
            // umm, not awesome, something is up
            console.error('Icon could not be loaded:', svgUrl);
            svgContent = "<!--error loading svg-->";
        }
        // cache the svg content in the global IonIcon constant
        svgContents[svgUrl] = svgContent;
        // find any callbacks waiting on this url
        var svgLoadCallbacks = loadCallbacks[svgUrl];
        if (svgLoadCallbacks) {
            // loop through all the callbacks that are waiting on the svg content
            svgLoadCallbacks.forEach(function (cb) {
                // fire off this callback which was provided by an instance
                cb(svgContent);
            });
            delete loadCallbacks[svgUrl];
        }
    });
    xhr.addEventListener('error', function () {
        // umm, idk
        console.error('Icon could not be loaded:', svgUrl);
    });
    // let's do this!
    xhr.open('GET', svgUrl, true);
    xhr.send();
}
var activeRequests = {};
var loadCallbacks = [];
var svgContents = {};

exports['ION-BUTTON'] = Button;
exports['ION-BUTTONS'] = Buttons;
exports['ION-ICON'] = Icon;
},


/***************** ion-button *****************/
[
/** ion-button: tag **/
"ION-BUTTON",

/** ion-button: members **/
[
  [ "block", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "buttonType", /** prop **/ 1 ],
  [ "clear", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "default", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "disabled", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "el", /** element ref **/ 7 ],
  [ "full", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "href", /** prop **/ 1 ],
  [ "itemButton", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "large", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "outline", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "round", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "small", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "solid", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "strong", /** prop **/ 1, /** type boolean **/ 1 ]
],

/** ion-button: host **/
{}

],

/***************** ion-buttons *****************/
[
/** ion-buttons: tag **/
"ION-BUTTONS",

/** ion-buttons: members **/
[
  [ "el", /** element ref **/ 7 ]
],

/** ion-buttons: host **/
{"theme":"bar-buttons"}

],

/***************** ion-icon *****************/
[
/** ion-icon: tag **/
"ION-ICON",

/** ion-icon: members **/
[
  [ "ariaLabel", /** prop **/ 1 ],
  [ "ios", /** prop **/ 1 ],
  [ "isServer", /** prop context **/ 3, /** type boolean **/ 1, /** context ***/ "isServer" ],
  [ "md", /** prop **/ 1 ],
  [ "name", /** prop **/ 1 ],
  [ "svgContent", /** state **/ 5 ]
],

/** ion-icon: host **/
{"theme":"icon"}

]
)