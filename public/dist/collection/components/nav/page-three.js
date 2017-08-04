var PageThree = (function () {
    function PageThree() {
    }
    PageThree.prototype.ionViewDidEnter = function () {
        console.log('page three did enter');
    };
    PageThree.prototype.pop = function () {
        var nav = this.element.closest('ion-nav');
        nav.pop();
    };
    PageThree.prototype.render = function () {
        var _this = this;
        return [h("ion-header", 0,
                h("ion-navbar", 0,
                    h("ion-title", 0, t("Page Three")))),
            h("ion-content", 0, t("Page Three Content"),
                h("div", 0,
                    h("ion-button", { "o": { "click": function () { return _this.pop(); } } }, t("Go Back"))))
        ];
    };
    return PageThree;
}());
export { PageThree };
