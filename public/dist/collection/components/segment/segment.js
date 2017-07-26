var Segment = (function () {
    function Segment() {
        this.disabled = false;
    }
    Segment.prototype.changed = function (val) {
        this.selectButton(val);
    };
    Segment.prototype["componentDidLoad"] = function () {
        this.buttons = this.el.querySelectorAll('ion-segment-button');
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i].$instance;
            button.activated = (button.value === this.value);
            // If there is no value set on the segment and a button
            // is checked we should activate it
            if (!this.value && button.checked) {
                button.activated = button.checked;
            }
        }
    };
    Segment.prototype.segmentClick = function (ev) {
        var selectedButton = ev.segmentButton;
        this.value = selectedButton.value;
        this.selectButton(this.value);
    };
    Segment.prototype.selectButton = function (val) {
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i].$instance;
            button.activated = (button.value === val);
        }
        // returning true tells the renderer to queue an update
        return true;
    };
    Segment.prototype.hostData = function () {
        return {
            class: {
                'segment-disabled': this.disabled
            }
        };
    };
    Segment.prototype.render = function () {
        return h(0, 0);
    };
    return Segment;
}());
export { Segment };
