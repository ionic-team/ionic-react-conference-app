import { createThemedClasses } from '../../utils/theme';
var Toolbar = (function () {
    function Toolbar() {
    }
    Toolbar.prototype["componentDidLoad"] = function () {
        var buttons = this.el.querySelectorAll('ion-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('button-type', 'bar-button');
        }
    };
    Toolbar.prototype.hostData = function () {
        return {
            class: {
                'statusbar-padding': this.config.getBoolean('statusbarPadding')
            }
        };
    };
    Toolbar.prototype.render = function () {
        var backgroundCss = createThemedClasses(this.mode, this.color, 'toolbar-background');
        var contentCss = createThemedClasses(this.mode, this.color, 'toolbar-content');
        return [
            h("div", { "c": backgroundCss }),
            h(0, { "a": { "name": 'start' } }),
            h(0, { "a": { "name": 'mode-start' } }),
            h(0, { "a": { "name": 'mode-end' } }),
            h(0, { "a": { "name": 'end' } }),
            h("div", { "c": contentCss },
                h(0, 0))
        ];
    };
    return Toolbar;
}());
export { Toolbar };
