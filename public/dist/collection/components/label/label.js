var Label = (function () {
    function Label() {
        /**
         * @output {event} If true, the label will sit alongside an input. Defaults to `false`.
         */
        this.fixed = false;
        /**
         * @output {event} If true, the label will float above an input when the value is empty or the input is focused. Defaults to `false`.
         */
        this.floating = false;
        /**
         * @output {event} If true, the label will be stacked above an input. Defaults to `false`.
         */
        this.stacked = false;
    }
    Label.prototype["componentDidLoad"] = function () {
        this.emitStyle();
    };
    Label.prototype.emitStyle = function () {
        var _this = this;
        clearTimeout(this.styleTmr);
        var styles = {
            'label-fixed': this.fixed,
            'label-floating': this.floating,
            'label-stacked': this.stacked
        };
        this.styleTmr = setTimeout(function () {
            _this.ionStyle.emit(styles);
        });
    };
    Label.prototype.render = function () {
        return h(0, 0);
    };
    return Label;
}());
export { Label };
