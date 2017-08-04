import { getParentElement, getToolbarHeight } from '../../utils/helpers';
import { Ionic } from '../../index';
var Fixed = (function () {
    function Fixed() {
    }
    Fixed.prototype.hostData = function () {
        var pageChildren = getParentElement(this.el).children;
        var headerHeight = getToolbarHeight('ION-HEADER', pageChildren, this.mode, '44px', '56px');
        var footerHeight = getToolbarHeight('ION-FOOTER', pageChildren, this.mode, '50px', '48px');
        return {
            class: {
                'statusbar-padding': Ionic.config.getBoolean('statusbarPadding')
            },
            style: {
                'margin-top': headerHeight,
                'margin-bottom': footerHeight
            }
        };
    };
    Fixed.prototype.render = function () {
        return (h(0, 0));
    };
    return Fixed;
}());
export { Fixed };
