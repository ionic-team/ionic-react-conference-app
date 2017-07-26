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
export { Buttons };
