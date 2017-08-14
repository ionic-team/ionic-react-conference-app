export function transitionEnd(elm, callback) {
    var unRegTrans;
    var unRegWKTrans;
    var opts = { passive: true };
    function unregister() {
        unRegWKTrans && unRegWKTrans();
        unRegTrans && unRegTrans();
    }
    function onTransitionEnd(ev) {
        if (elm === ev.target) {
            unregister();
            callback(ev);
        }
    }
    if (elm) {
        elm.addEventListener('webkitTransitionEnd', onTransitionEnd, opts);
        unRegWKTrans = function () {
            elm.removeEventListener('webkitTransitionEnd', onTransitionEnd, opts);
        };
        elm.addEventListener('transitionend', onTransitionEnd, opts);
        unRegTrans = function () {
            elm.removeEventListener('transitionend', onTransitionEnd, opts);
        };
    }
    return unregister;
}
