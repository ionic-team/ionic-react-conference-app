import { createThemedClasses } from '../../utils/theme';
import { SPINNERS } from './spinner-configs';
var Spinner = (function () {
    function Spinner() {
        this.duration = null;
        this.paused = false;
    }
    Spinner.prototype["componentDidLoad"] = function () {
        if (this.name === 'ios') {
            // deprecation warning, renamed in v4
            console.warn("spinner \"ios\" has been renamed to \"lines\"");
        }
        else if (this.name === 'ios-small') {
            // deprecation warning, renamed in v4
            console.warn("spinner \"ios-small\" has been renamed to \"lines-sm\"");
        }
    };
    Spinner.prototype.hostData = function () {
        var spinnerThemedClasses = createThemedClasses(this.mode, this.color, "spinner spinner-" + this.name);
        spinnerThemedClasses['spinner-paused'] = true;
        return {
            class: spinnerThemedClasses
        };
    };
    Spinner.prototype.render = function () {
        var name = this.name || Ionic.config.get('spinner', 'lines');
        if (name === 'ios') {
            name = this.name = 'lines';
        }
        else if (this.name === 'ios-small') {
            name = this.name = 'lines-sm';
        }
        var spinner = SPINNERS[name] || SPINNERS['lines'];
        var duration = (typeof this.duration === 'number' && this.duration > 10 ? this.duration : spinner.dur);
        var svgs = [];
        var i = 0;
        var l = 0;
        if (spinner.circles) {
            for (i = 0, l = spinner.circles; i < l; i++) {
                svgs.push(buildCircle(spinner, duration, i, l));
            }
        }
        else if (spinner.lines) {
            for (i = 0, l = spinner.lines; i < l; i++) {
                svgs.push(buildLine(spinner, duration, i, l));
            }
        }
        return svgs;
    };
    return Spinner;
}());
export { Spinner };
function buildCircle(spinner, duration, index, total) {
    var data = spinner.fn(duration, index, total);
    data.style.animationDuration = duration + 'ms';
    return h('svg', { "n": "http://www.w3.org/2000/svg", "s": data.style, "a": { "attrs": { "viewBox": '0 0 64 64' } } }, h('circle', { "n": "http://www.w3.org/2000/svg", "a": { "attrs": { "r": data.r, "transform": 'translate(32,32)' } } }));
}
function buildLine(spinner, duration, index, total) {
    var data = spinner.fn(duration, index, total);
    data.style.animationDuration = duration + 'ms';
    return h('svg', { "n": "http://www.w3.org/2000/svg", "s": data.style, "a": { "attrs": { "viewBox": '0 0 64 64' } } }, h('line', { "n": "http://www.w3.org/2000/svg", "a": { "attrs": { "y1": data.y1, "y2": data.y2, "transform": 'translate(32,32)' } } }));
}
