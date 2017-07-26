import { GestureController } from '../gesture/gesture-controller';
var Scroll = (function () {
    function Scroll() {
        this.positions = [];
        this.queued = false;
        this.isScrolling = false;
        this.detail = {};
        this.enabled = true;
        this.jsScroll = false;
    }
    Scroll.prototype["componentDidLoad"] = function () {
        if (Core.isServer)
            return;
        var ctrl = Ionic.controllers.gesture = (Ionic.controllers.gesture || new GestureController());
        this.gesture = ctrl.createGesture('scroll', 100, false);
    };
    // Native Scroll *************************
    Scroll.prototype.onNativeScroll = function () {
        var self = this;
        if (!self.queued && self.enabled) {
            self.queued = true;
            Core.dom.read(function (timeStamp) {
                self.queued = false;
                self.onScroll(timeStamp || Date.now());
            });
        }
    };
    Scroll.prototype.onScroll = function (timeStamp) {
        var self = this;
        var detail = self.detail;
        var positions = self.positions;
        detail.timeStamp = timeStamp;
        // get the current scrollTop
        // ******** DOM READ ****************
        detail.scrollTop = self.getTop();
        // get the current scrollLeft
        // ******** DOM READ ****************
        detail.scrollLeft = self.getLeft();
        if (!self.isScrolling) {
            // currently not scrolling, so this is a scroll start
            self.isScrolling = true;
            // remember the start positions
            detail.startY = detail.scrollTop;
            detail.startX = detail.scrollLeft;
            // new scroll, so do some resets
            detail.velocityY = detail.velocityX = detail.deltaY = detail.deltaX = positions.length = 0;
            // emit only on the first scroll event
            if (self.ionScrollStart) {
                self.ionScrollStart(detail);
            }
        }
        detail.directionX = detail.velocityDirectionX = (detail.deltaX > 0 ? 'left' : (detail.deltaX < 0 ? 'right' : null));
        detail.directionY = detail.velocityDirectionY = (detail.deltaY > 0 ? 'up' : (detail.deltaY < 0 ? 'down' : null));
        // actively scrolling
        positions.push(detail.scrollTop, detail.scrollLeft, detail.timeStamp);
        if (positions.length > 3) {
            // we've gotten at least 2 scroll events so far
            detail.deltaY = (detail.scrollTop - detail.startY);
            detail.deltaX = (detail.scrollLeft - detail.startX);
            var endPos = (positions.length - 1);
            var startPos = endPos;
            var timeRange = (detail.timeStamp - 100);
            // move pointer to position measured 100ms ago
            for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 3) {
                startPos = i;
            }
            if (startPos !== endPos) {
                // compute relative movement between these two points
                var movedTop = (positions[startPos - 2] - positions[endPos - 2]);
                var movedLeft = (positions[startPos - 1] - positions[endPos - 1]);
                var factor = 16.67 / (positions[endPos] - positions[startPos]);
                // based on XXms compute the movement to apply for each render step
                detail.velocityY = movedTop * factor;
                detail.velocityX = movedLeft * factor;
                // figure out which direction we're scrolling
                detail.velocityDirectionX = (movedLeft > 0 ? 'left' : (movedLeft < 0 ? 'right' : null));
                detail.velocityDirectionY = (movedTop > 0 ? 'up' : (movedTop < 0 ? 'down' : null));
            }
        }
        clearTimeout(self.tmr);
        self.tmr = setTimeout(function () {
            // haven't scrolled in a while, so it's a scrollend
            self.isScrolling = false;
            Core.dom.read(function (timeStamp) {
                if (!self.isScrolling) {
                    self.onEnd(timeStamp);
                }
            });
        }, 80);
        // emit on each scroll event
        if (self.ionScrollStart) {
            self.ionScroll(detail);
        }
    };
    Scroll.prototype.onEnd = function (timeStamp) {
        var self = this;
        var detail = self.detail;
        detail.timeStamp = timeStamp || Date.now();
        // emit that the scroll has ended
        if (self.ionScrollEnd) {
            self.ionScrollEnd(detail);
        }
    };
    Scroll.prototype.enableJsScroll = function (contentTop, contentBottom) {
        this.jsScroll = true;
        Core.enableListener(this, 'scroll', false);
        Core.enableListener(this, 'touchstart', true);
        contentTop;
        contentBottom;
    };
    // Touch Scroll *************************
    Scroll.prototype.onTouchStart = function () {
        if (!this.enabled) {
            return;
        }
        Core.enableListener(this, 'touchmove', true);
        Core.enableListener(this, 'touchend', true);
        throw 'jsScroll: TODO!';
    };
    Scroll.prototype.onTouchMove = function () {
        if (!this.enabled) {
            return;
        }
    };
    Scroll.prototype.onTouchEnd = function () {
        Core.enableListener(this, 'touchmove', false);
        Core.enableListener(this, 'touchend', false);
        if (!this.enabled) {
            return;
        }
    };
    /**
     * DOM READ
     */
    Scroll.prototype.getTop = function () {
        if (this.jsScroll) {
            return this._t;
        }
        return this._t = this.el.scrollTop;
    };
    /**
     * DOM READ
     */
    Scroll.prototype.getLeft = function () {
        if (this.jsScroll) {
            return 0;
        }
        return this._l = this.el.scrollLeft;
    };
    /**
     * DOM WRITE
     */
    Scroll.prototype.setTop = function (top) {
        this._t = top;
        if (this.jsScroll) {
            this.el.style.transform = this.el.style.webkitTransform = "translate3d(" + this._l * -1 + "px," + top * -1 + "px,0px)";
        }
        else {
            this.el.scrollTop = top;
        }
    };
    /**
     * DOM WRITE
     */
    Scroll.prototype.setLeft = function (left) {
        this._l = left;
        if (this.jsScroll) {
            this.el.style.transform = this.el.style.webkitTransform = "translate3d(" + left * -1 + "px," + this._t * -1 + "px,0px)";
        }
        else {
            this.el.scrollLeft = left;
        }
    };
    Scroll.prototype.scrollTo = function (x, y, duration, done) {
        // scroll animation loop w/ easing
        // credit https://gist.github.com/dezinezync/5487119
        var promise;
        if (done === undefined) {
            // only create a promise if a done callback wasn't provided
            // done can be a null, which avoids any functions
            promise = new Promise(function (resolve) {
                done = resolve;
            });
        }
        var self = this;
        var el = self.el;
        if (!el) {
            // invalid element
            done();
            return promise;
        }
        if (duration < 32) {
            self.setTop(y);
            self.setLeft(x);
            done();
            return promise;
        }
        var fromY = el.scrollTop;
        var fromX = el.scrollLeft;
        var maxAttempts = (duration / 16) + 100;
        var startTime;
        var attempts = 0;
        var stopScroll = false;
        // scroll loop
        function step(timeStamp) {
            attempts++;
            if (!self.el || stopScroll || attempts > maxAttempts) {
                self.isScrolling = false;
                el.style.transform = el.style.webkitTransform = '';
                done();
                return;
            }
            var time = Math.min(1, ((timeStamp - startTime) / duration));
            // where .5 would be 50% of time on a linear scale easedT gives a
            // fraction based on the easing method
            var easedT = (--time) * time * time + 1;
            if (fromY !== y) {
                self.setTop((easedT * (y - fromY)) + fromY);
            }
            if (fromX !== x) {
                self.setLeft(Math.floor((easedT * (x - fromX)) + fromX));
            }
            if (easedT < 1) {
                // do not use DomController here
                // must use nativeRaf in order to fire in the next frame
                Core.dom.raf(step);
            }
            else {
                stopScroll = true;
                self.isScrolling = false;
                el.style.transform = el.style.webkitTransform = '';
                done();
            }
        }
        // start scroll loop
        self.isScrolling = true;
        // chill out for a frame first
        Core.dom.write(function () {
            Core.dom.write(function (timeStamp) {
                startTime = timeStamp;
                step(timeStamp);
            });
        });
        return promise;
    };
    Scroll.prototype.scrollToTop = function (duration) {
        return this.scrollTo(0, 0, duration);
    };
    Scroll.prototype.scrollToBottom = function (duration) {
        var y = 0;
        if (this.el) {
            y = this.el.scrollHeight - this.el.clientHeight;
        }
        return this.scrollTo(0, y, duration);
    };
    Scroll.prototype["componentDidunload"] = function () {
        this.gesture && this.gesture.destroy();
        this.gesture = this.detail = this.detail.event = null;
    };
    Scroll.prototype.render = function () {
        return h(0, 0);
    };
    return Scroll;
}());
export { Scroll };
