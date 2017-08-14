var option = (function () {
    function option() {
    }
    option.prototype.render = function () {
        return h("div", { "c": { "my-option": true } });
    };
    return option;
}());
export { option };
