import { createThemedClasses } from '../../utils/theme';
var ToolbarTitle = (function () {
    function ToolbarTitle() {
    }
    ToolbarTitle.prototype.render = function () {
        var titleClasses = createThemedClasses(this.mode, this.color, 'toolbar-title');
        return [
            h("div", { "c": titleClasses },
                h(0, 0))
        ];
    };
    return ToolbarTitle;
}());
export { ToolbarTitle };
