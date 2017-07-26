var List = (function () {
    function List() {
    }
    List.prototype.render = function () {
        return h(0, 0);
    };
    /**
     * Close any sliding items that are open.
     */
    List.prototype.closeSlidingItems = function () {
        this.openContainer.close();
        this.openContainer = null;
    };
    return List;
}());
export { List };
