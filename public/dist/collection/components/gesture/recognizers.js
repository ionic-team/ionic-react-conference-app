var PanRecognizer = (function () {
    function PanRecognizer(direction, threshold, maxAngle) {
        this.direction = direction;
        this.dirty = false;
        this.angle = 0;
        this.isPan = 0;
        var radians = maxAngle * (Math.PI / 180);
        this.maxCosine = Math.cos(radians);
        this.threshold = threshold * threshold;
    }
    PanRecognizer.prototype.start = function (x, y) {
        this.startX = x;
        this.startY = y;
        this.angle = 0;
        this.isPan = 0;
        this.dirty = true;
    };
    PanRecognizer.prototype.detect = function (x, y) {
        if (!this.dirty) {
            return false;
        }
        var deltaX = (x - this.startX);
        var deltaY = (y - this.startY);
        var distance = deltaX * deltaX + deltaY * deltaY;
        if (distance >= this.threshold) {
            var angle = Math.atan2(deltaY, deltaX);
            var cosine = (this.direction === 'y')
                ? Math.sin(angle)
                : Math.cos(angle);
            this.angle = angle;
            if (cosine > this.maxCosine) {
                this.isPan = 1;
            }
            else if (cosine < -this.maxCosine) {
                this.isPan = -1;
            }
            else {
                this.isPan = 0;
            }
            this.dirty = false;
            return true;
        }
        return false;
    };
    PanRecognizer.prototype.isGesture = function () {
        return this.isPan;
    };
    return PanRecognizer;
}());
export { PanRecognizer };
