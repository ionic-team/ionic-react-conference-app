import { createThemedClasses } from '../../utils/theme';
import { Ionic } from '../../index';
var Navbar = (function () {
    function Navbar() {
        this.sbPadding = Ionic.config.getBoolean('statusbarPadding');
        this.hideBackButton = false;
        this.backButtonText = Ionic.config.get('backButtonText', 'Back');
        this.backButtonIcon = Ionic.config.get('backButtonIcon');
        this.hidden = false;
    }
    Navbar.prototype.backButtonClick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        console.log('back button click');
    };
    Navbar.prototype["componentDidLoad"] = function () {
        var buttons = this.el.querySelectorAll('ion-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('button-type', 'bar-button');
        }
    };
    Navbar.prototype.hostData = function () {
        return {
            class: {
                'statusbar-padding': Ionic.config.getBoolean('statusbarPadding')
            }
        };
    };
    Navbar.prototype.render = function () {
        var backgroundCss = createThemedClasses(this.mode, this.color, 'toolbar-background');
        var contentCss = createThemedClasses(this.mode, this.color, 'toolbar-content');
        var backButtonCss = createThemedClasses(this.mode, this.color, 'back-button');
        var backButtonIconCss = createThemedClasses(this.mode, this.color, 'back-button-icon');
        var backButtonTextCss = createThemedClasses(this.mode, this.color, 'back-button-text');
        return [
            h("div", { "c": backgroundCss }),
            h("button", { "c": backButtonCss, "o": { "click": this.backButtonClick.bind(this) }, "a": { "hidden": this.hideBackButton } },
                h("ion-icon", { "c": backButtonIconCss, "p": { "name": this.backButtonIcon } }),
                h("span", { "c": backButtonTextCss }, this.backButtonText)),
            h(0, { "a": { "name": 'start' } }),
            h(0, { "a": { "name": 'mode-start' } }),
            h(0, { "a": { "name": 'mode-end' } }),
            h(0, { "a": { "name": 'end' } }),
            h("div", { "c": contentCss },
                h(0, 0))
        ];
    };
    return Navbar;
}());
export { Navbar };
