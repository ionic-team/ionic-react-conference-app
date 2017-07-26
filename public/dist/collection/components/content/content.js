import { createThemedClasses } from '../../utils/theme';
import { getParentElement, getToolbarHeight } from '../../utils/helpers';
var Content = (function () {
    function Content() {
        this.$scrollDetail = {};
        /**
         * @input {boolean} If true, the content will scroll behind the headers
         * and footers. This effect can easily be seen by setting the toolbar
         * to transparent.
         */
        this.fullscreen = false;
    }
    Content.prototype["componentDidunload"] = function () {
        this.$fixed = this.$scroll = this.$siblingFooter = this.$siblingHeader = this.$scrollDetail = null;
    };
    Content.prototype.enableJsScroll = function () {
        this.$scroll.jsScroll = true;
    };
    /**
     * Scroll to the top of the content component.
     *
     * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
     * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
     */
    Content.prototype.scrollToTop = function (duration) {
        if (duration === void 0) { duration = 300; }
        return this.$scroll.scrollToTop(duration);
    };
    /**
     * Scroll to the bottom of the content component.
     *
     * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
     * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
     */
    Content.prototype.scrollToBottom = function (duration) {
        if (duration === void 0) { duration = 300; }
        return this.$scroll.scrollToBottom(duration);
    };
    Content.prototype.render = function () {
        var props = {};
        var scrollStyle = {};
        var pageChildren = getParentElement(this.el).children;
        var headerHeight = getToolbarHeight('ION-HEADER', pageChildren, this.mode, '44px', '56px');
        var footerHeight = getToolbarHeight('ION-FOOTER', pageChildren, this.mode, '50px', '48px');
        if (this.fullscreen) {
            scrollStyle.paddingTop = headerHeight;
            scrollStyle.paddingBottom = footerHeight;
        }
        else {
            scrollStyle.marginTop = headerHeight;
            scrollStyle.marginBottom = footerHeight;
        }
        if (this.ionScrollStart) {
            props['ionScrollStart'] = this.ionScrollStart.bind(this);
        }
        if (this.ionScroll) {
            props['ionScroll'] = this.ionScroll.bind(this);
        }
        if (this.ionScrollEnd) {
            props['ionScrollEnd'] = this.ionScrollEnd.bind(this);
        }
        var themedClasses = createThemedClasses(this.mode, this.color, 'content');
        themedClasses['statusbar-padding'] = Ionic.config.getBoolean('statusbarPadding');
        return (h("ion-scroll", { "s": scrollStyle, "p": props, "c": themedClasses },
            h(0, 0)));
    };
    return Content;
}());
export { Content };
