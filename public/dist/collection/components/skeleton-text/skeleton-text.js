var SkeletonText = (function () {
    function SkeletonText() {
        this.width = '100%';
    }
    SkeletonText.prototype.render = function () {
        return h("span", { "s": { "width": this.width } }, t("\u00A0"));
    };
    return SkeletonText;
}());
export { SkeletonText };
