var FabContainer = (function () {
    function FabContainer() {
    }
    /**
     * Close an active FAB list container
     */
    FabContainer.prototype.close = function () {
        var fab = this.el.querySelector('ion-fab-button');
        fab.close();
    };
    FabContainer.prototype.render = function () {
        return (h(0, 0));
    };
    return FabContainer;
}());
export { FabContainer };
