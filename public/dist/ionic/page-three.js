/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'page-three',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
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

exports['PAGE-THREE'] = PageThree;
},


/***************** page-three *****************/
[
/** page-three: [0] tag **/
'PAGE-THREE',

/** page-three: [1] host **/
{},

/** page-three: [2] states **/
0 /* no states */,

/** page-three: [3] propWillChanges **/
0 /* no prop will change methods */,

/** page-three: [4] propDidChanges **/
0 /* no prop did change methods */,

/** page-three: [5] events **/
0 /* no events */,

/** page-three: [6] methods **/
0 /* no methods */,

/** page-three: [7] hostElementMember **/
'element'

]
)