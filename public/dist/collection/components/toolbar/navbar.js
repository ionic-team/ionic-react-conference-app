import { createThemedClasses } from '../../utils/theme';
var Navbar = (function () {
    function Navbar() {
        this.hideBackButton = false;
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
                'statusbar-padding': this.config.getBoolean('statusbarPadding')
            }
        };
    };
    Navbar.prototype.render = function () {
        var backButtonIcon = this.backButtonIcon || this.config.get('backButtonText', 'Back');
        var backButtonText = this.backButtonText || this.config.get('backButtonIcon', 'Back');
        var backgroundCss = createThemedClasses(this.mode, this.color, 'toolbar-background');
        var contentCss = createThemedClasses(this.mode, this.color, 'toolbar-content');
        var backButtonCss = createThemedClasses(this.mode, this.color, 'back-button');
        var backButtonIconCss = createThemedClasses(this.mode, this.color, 'back-button-icon');
        var backButtonTextCss = createThemedClasses(this.mode, this.color, 'back-button-text');
        return [
            h("div", { "c": backgroundCss }),
            h("button", { "c": backButtonCss, "o": { "click": this.backButtonClick.bind(this) }, "a": { "hidden": this.hideBackButton } }, t("if (backButtonIcon) "),
                h("ion-icon", { "c": backButtonIconCss, "p": { "name": backButtonIcon } }),
                h("span", { "c": backButtonTextCss }, backButtonText)),
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
