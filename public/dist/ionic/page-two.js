/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'page-two',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
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

exports['PAGE-TWO'] = PageTwo;
},


/***************** page-two *****************/
[
/** page-two: [0] tag **/
'PAGE-TWO',

/** page-two: [1] host **/
{},

/** page-two: [2] states **/
0 /* no states */,

/** page-two: [3] propWillChanges **/
0 /* no prop will change methods */,

/** page-two: [4] propDidChanges **/
0 /* no prop did change methods */,

/** page-two: [5] events **/
0 /* no events */,

/** page-two: [6] methods **/
0 /* no methods */,

/** page-two: [7] hostElementMember **/
'element'

]
)