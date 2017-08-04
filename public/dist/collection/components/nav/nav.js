var Nav = (function () {
    function Nav() {
        this.pages = [];
    }
    Nav.prototype.push = function (page) {
        this.pages = this.pages.concat(page);
    };
    Nav.prototype.pop = function (page) {
        this.pages = this.pages.slice(0, -1);
    };
    Nav.prototype.render = function () {
        if (this.pages.length === 0 && this.rootPage !== undefined) {
            this.push(this.rootPage);
        }
        if (this.renderChildren) {
            this.renderChildren(this.element, this.push.bind(this), this.pop.bind(this), this.pages);
        }
        return;
    };
    return Nav;
}());
export { Nav };
