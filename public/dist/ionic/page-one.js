/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'page-one',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
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

exports['PAGE-ONE'] = PageOne;
},


/***************** page-one *****************/
[
/** page-one: [0] tag **/
'PAGE-ONE',

/** page-one: [1] host **/
{},

/** page-one: [2] states **/
0 /* no states */,

/** page-one: [3] propWillChanges **/
0 /* no prop will change methods */,

/** page-one: [4] propDidChanges **/
0 /* no prop did change methods */,

/** page-one: [5] events **/
0 /* no events */,

/** page-one: [6] methods **/
0 /* no methods */,

/** page-one: [7] hostElementMember **/
'element'

]
)