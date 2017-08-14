import { createThemedClasses } from '../../utils/theme';
var ToolbarTitle = (function () {
    function ToolbarTitle() {
    }
    ToolbarTitle.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'toolbar-title');
        return [
            h("div", { "c": themedClasses },
                h(0, 0))
        ];
    };
    return ToolbarTitle;
}());
export { ToolbarTitle };
