import { Ionic } from '../../index';
var LoadingController = (function () {
    function LoadingController() {
        this.ids = 0;
        this.loadingResolves = {};
        this.loadings = [];
    }
    LoadingController.prototype["componentDidLoad"] = function () {
        this.appRoot = document.querySelector('ion-app') || document.body;
        Ionic.registerController('loading', this);
    };
    LoadingController.prototype.load = function (opts) {
        var _this = this;
        // create ionic's wrapping ion-loading component
        var loading = document.createElement('ion-loading');
        var id = this.ids++;
        // give this loading a unique id
        loading.id = "loading-" + id;
        loading.style.zIndex = (20000 + id).toString();
        // convert the passed in loading options into props
        // that get passed down into the new loading
        Object.assign(loading, opts);
        // append the loading element to the document body
        this.appRoot.appendChild(loading);
        // store the resolve function to be called later up when the loading loads
        return new Promise(function (resolve) {
            _this.loadingResolves[loading.id] = resolve;
        });
    };
    LoadingController.prototype.viewDidLoad = function (ev) {
        var loading = ev.loading;
        var loadingResolve = this.loadingResolves[loading.id];
        if (loadingResolve) {
            loadingResolve(loading);
            delete this.loadingResolves[loading.id];
        }
    };
    LoadingController.prototype.willPresent = function (ev) {
        this.loadings.push(ev.loading);
    };
    LoadingController.prototype.willDismiss = function (ev) {
        var index = this.loadings.indexOf(ev.loading);
        if (index > -1) {
            this.loadings.splice(index, 1);
        }
    };
    LoadingController.prototype.escapeKeyUp = function () {
        var lastLoading = this.loadings[this.loadings.length - 1];
        if (lastLoading) {
            lastLoading.dismiss();
        }
    };
    return LoadingController;
}());
export { LoadingController };
