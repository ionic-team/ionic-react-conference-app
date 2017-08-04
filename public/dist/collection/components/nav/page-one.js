var PageOne = (function () {
    function PageOne() {
    }
    PageOne.prototype.ionViewDidEnter = function () {
        console.log('page one did enter');
    };
    PageOne.prototype.nextPage = function () {
        var nav = this.element.closest('ion-nav');
        nav.push('page-two');
    };
    PageOne.prototype.render = function () {
        var _this = this;
        return [h("ion-header", 0,
                h("ion-navbar", 0,
                    h("ion-title", 0, t("Page One")))),
            h("ion-content", 0, t("Page One Content"),
                h("div", 0,
                    h("ion-button", { "o": { "click": function () { return _this.nextPage(); } } }, t("Go to Page Two"))))
        ];
    };
    return PageOne;
}());
export { PageOne };
