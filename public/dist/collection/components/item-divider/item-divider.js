var ItemDivider = (function () {
    function ItemDivider() {
    }
    ItemDivider.prototype.render = function () {
        return [
            h(0, { "a": { "name": 'start' } }),
            h("div", { "c": { "item-inner": true } },
                h("div", { "c": { "input-wrapper": true } },
                    h(0, 0)),
                h(0, { "a": { "name": 'end' } }))
        ];
    };
    return ItemDivider;
}());
export { ItemDivider };
