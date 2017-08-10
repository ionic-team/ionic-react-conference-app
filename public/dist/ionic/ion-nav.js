/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-nav',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
var Nav = (function () {
    function Nav() {
        this.pages = [];
    }
    Nav.prototype.push = function (page, params) {
        if (params === void 0) { params = {}; }
        this.pages = this.pages.concat([[page, params]]);
    };
    Nav.prototype.pop = function (page) {
        this.pages = this.pages.slice(0, -1);
    };
    Nav.prototype.render = function () {
        console.log(this.pages.length);
        debugger;
        if (this.pages.length === 0 && this.rootPage !== undefined) {
            this.push(this.rootPage, {});
        }
        if (this.renderChildren) {
            this.renderChildren(this.element, this.push.bind(this), this.pop.bind(this), this.pages);
        }
        return;
    };
    return Nav;
}());

exports['ION-NAV'] = Nav;
},


/***************** ion-nav *****************/
[
/** ion-nav: [0] tag **/
'ION-NAV',

/** ion-nav: [1] host **/
{},

/** ion-nav: [2] states **/
['pages'],

/** ion-nav: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-nav: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-nav: [5] events **/
0 /* no events */,

/** ion-nav: [6] methods **/
['pop', 'push'],

/** ion-nav: [7] hostElementMember **/
'element'

]
)
