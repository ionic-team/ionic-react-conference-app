var FabList = (function () {
    function FabList() {
        this.activated = false;
    }
    FabList.prototype.activatedChange = function (activated) {
        var fabs = this.el.querySelectorAll('ion-fab-button');
        // if showing the fabs add a timeout, else show immediately
        var timeout = activated ? 30 : 0;
        var _loop_1 = function () {
            var fab = fabs[i].$instance;
            setTimeout(function () { return fab.show = activated; }, i * timeout);
        };
        for (var i = 0; i < fabs.length; i++) {
            _loop_1();
        }
    };
    FabList.prototype.hostData = function () {
        return {
            class: {
                'fab-list-active': this.activated
            }
        };
    };
    FabList.prototype.render = function () {
        return (h(0, 0));
    };
    return FabList;
}());
export { FabList };
