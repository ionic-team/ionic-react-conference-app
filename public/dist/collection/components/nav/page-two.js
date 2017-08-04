var PageTwo = (function () {
    function PageTwo() {
    }
    PageTwo.prototype.ionViewDidEnter = function () {
        console.log('page two did enter');
    };
    PageTwo.prototype.nextPage = function () {
        var nav = this.element.closest('ion-nav');
        nav.push('page-three');
    };
    PageTwo.prototype.pop = function () {
        var nav = this.element.closest('ion-nav');
        nav.pop();
    };
    PageTwo.prototype.render = function () {
        var _this = this;
        return [h("ion-header", 0,
                h("ion-navbar", 0,
                    h("ion-title", 0, t("Page Two")))),
            h("ion-content", 0, t("Page Two Content"),
                h("div", 0,
                    h("ion-button", { "o": { "click": function () { return _this.nextPage(); } } }, t("Go to Page Three"))),
                h("div", 0,
                    h("ion-button", { "o": { "click": function () { return _this.pop(); } } }, t("Go Back"))))
        ];
    };
    return PageTwo;
}());
export { PageTwo };
