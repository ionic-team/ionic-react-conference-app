import { Swiper } from './vendor/swiper';
var Slides = (function () {
    function Slides() {
        /**
         * @input {string} The animation effect of the slides.
         * Possible values are: `slide`, `fade`, `cube`, `coverflow` or `flip`.
         * Default: `slide`.
         */
        this.effect = 'slide';
        /**
         * @input {Slides} Pass another Slides instance or array of Slides instances
         * that should be controlled by this Slides instance.
         * Default: `null`.
         */
        this.control = null;
        /**
         * @input {string}  Swipe direction: 'horizontal' or 'vertical'.
         * Default: `horizontal`.
         */
        this.direction = 'horizontal';
        /**
         * @input {number}  Index number of initial slide. Default: `0`.
         */
        this.initialSlide = 0;
        /**
         * @input {boolean} If true, continuously loop from the last slide to the
         * first slide.
         */
        this.loop = false;
        /**
         * @input {string}  Type of pagination. Possible values are:
         * `bullets`, `fraction`, `progress`. Default: `bullets`.
         * (Note that the pager will not show unless `pager` input
         * is set to true).
         */
        this.paginationType = 'bullets';
        /**
         * @input {boolean} If true, allows you to use "parallaxed" elements inside of
         * slider.
         */
        this.parallax = false;
        /**
         * @input {number} Slides per view. Slides visible at the same time. Default: `1`.
         */
        this.slidesPerView = 1;
        /**
         * @input {number} Distance between slides in px. Default: `0`.
         */
        this.spaceBetween = 0;
        /**
         * @input {number} Duration of transition between slides
         * (in milliseconds). Default: `300`.
         */
        this.speed = 300;
        /**
         * @hidden
         * Enabled this option and swiper will be operated as usual except it will
         * not move, real translate values on wrapper will not be set. Useful when
         * you may need to create custom slide transition.
         */
        this.virtualTranslate = false;
        /**
         * @hidden
         * Set to true to round values of slides width and height to prevent blurry
         * texts on usual resolution screens (if you have such)
         */
        this.roundLengths = false;
        this.id = ++slidesId;
        this.slideId = 'slides-' + this.id;
    }
    Slides.prototype.render = function () {
        return (h("div", { "c": { "swiper-container": true }, "a": { "data-dir": 'rtl' } },
            h("div", { "c": { "swiper-wrapper": true } },
                h(0, 0)),
            h("div", { "c": { "swiper-pagination": true, "hide": !this.pager } })));
    };
    Slides.prototype.emitEvent = function (eventName) {
        var _this = this;
        return function (data) {
            Core.emit(_this.el, eventName, data);
        };
    };
    Slides.prototype._initSlides = function () {
        if (!this._init) {
            console.debug("ion-slides, init");
            this.container = this.el.children[0];
            var swiperOptions = {
                height: this.height,
                width: this.width,
                virtualTranslate: this.virtualTranslate,
                roundLengths: this.roundLengths,
                originalEvent: this.originalEvent,
                autoplay: this.autoplay,
                direction: this.direction,
                initialSlide: this.initialSlide,
                loop: this.loop,
                pager: this.pager,
                paginationType: this.paginationType,
                parallax: this.parallax,
                slidesPerView: this.slidesPerView,
                spaceBetween: this.spaceBetween,
                speed: this.speed,
                zoom: this.zoom,
                slidesPerColumn: 1,
                slidesPerColumnFill: 'column',
                slidesPerGroup: 1,
                centeredSlides: false,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                touchEventsTarget: 'container',
                autoplayDisableOnInteraction: true,
                autoplayStopOnLast: false,
                freeMode: false,
                freeModeMomentum: true,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: true,
                freeModeMomentumBounceRatio: 1,
                freeModeMomentumVelocityRatio: 1,
                freeModeSticky: false,
                freeModeMinimumVelocity: 0.02,
                autoHeight: false,
                setWrapperSize: false,
                zoomMax: 3,
                zoomMin: 1,
                zoomToggle: true,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: true,
                shortSwipes: true,
                longSwipes: true,
                longSwipesRatio: 0.5,
                longSwipesMs: 300,
                followFinger: true,
                onlyExternal: false,
                threshold: 0,
                touchMoveStopPropagation: true,
                touchReleaseOnEdges: false,
                iOSEdgeSwipeDetection: false,
                iOSEdgeSwipeThreshold: 20,
                paginationClickable: false,
                paginationHide: false,
                resistance: true,
                resistanceRatio: 0.85,
                watchSlidesProgress: false,
                watchSlidesVisibility: false,
                preventClicks: true,
                preventClicksPropagation: true,
                slideToClickedSlide: false,
                loopAdditionalSlides: 0,
                noSwiping: true,
                runCallbacksOnInit: true,
                controlBy: 'slide',
                controlInverse: false,
                keyboardControl: true,
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                },
                flip: {
                    slideShadows: true,
                    limitRotation: true
                },
                cube: {
                    slideShadows: true,
                    shadow: true,
                    shadowOffset: 20,
                    shadowScale: 0.94
                },
                fade: {
                    crossFade: false
                },
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
                onSlideChangeStart: this.emitEvent('ionSlideWillChange'),
                onSlideChangeEnd: this.emitEvent('ionSlideDidChange'),
                onAutoplay: this.emitEvent('ionSlideAutoplay'),
                onAutoplayStart: this.emitEvent('ionSlideAutoplayStart'),
                onAutoplayStop: this.emitEvent('ionSlideAutoplayStop'),
                onSlideNextStart: this.emitEvent('ionSlideNextStarto'),
                onSlidePrevStart: this.emitEvent('ionSlidePrevStart'),
                onSlideNextEnd: this.emitEvent('ionSlideNextEnd'),
                onSlidePrevEnd: this.emitEvent('ionSlidePrevEnd'),
                onTransitionStart: this.emitEvent('ionSlideTransitionStart'),
                onTransitionEnd: this.emitEvent('ionSlideTransitionEnd'),
                onTap: this.emitEvent('ionSlideTap'),
                onDoubleTap: this.emitEvent('ionSlideDoubleTap'),
                onProgress: this.emitEvent('ionSlideProgress'),
                onSliderMove: this.emitEvent('ionSlideDrag'),
                onReachBeginning: this.emitEvent('ionSlideReachStart'),
                onReachEnd: this.emitEvent('ionSlideReachEnd'),
                onTouchStart: this.emitEvent('ionSlideTouchStart'),
                onTouchEnd: this.emitEvent('ionSlideTouchEnd')
            };
            // init swiper core
            this.swiper = new Swiper(this.container, swiperOptions);
            if (this.keyboardControl) {
                // init keyboard event listeners
                this.enableKeyboardControl(true);
            }
            this._init = true;
        }
    };
    /**
     * @hidden
     */
    Slides.prototype["componentDidLoad"] = function () {
        var _this = this;
        /**
         * TODO: This should change because currently ionViewDidLoad fires independent of whether the
         * child components are ready.
         */
        setTimeout(function () {
            _this._initSlides();
        }, 10);
    };
    /**
     * Update the underlying slider implementation. Call this if you've added or removed
     * child slides.
     */
    Slides.prototype.update = function (debounce) {
        var _this = this;
        if (debounce === void 0) { debounce = 300; }
        if (this._init) {
            window.clearTimeout(this._tmr);
            this._tmr = window.setTimeout(function () {
                _this.swiper.update();
                // Don't allow pager to show with > 10 slides
                if (_this.length() > 10) {
                    _this.paginationType = undefined;
                }
            }, debounce);
        }
    };
    /**
     * Transition to the specified slide.
     *
     * @param {number} index  The index number of the slide.
     * @param {number} [speed]  Transition duration (in ms).
     * @param {boolean} [runCallbacks] Whether or not to emit the `ionSlideWillChange`/`ionSlideDidChange` events. Default true.
     */
    Slides.prototype.slideTo = function (index, speed, runCallbacks) {
        this.swiper.slideTo(index, speed, runCallbacks);
    };
    /**
     * Transition to the next slide.
     *
     * @param {number} [speed]  Transition duration (in ms).
     * @param {boolean} [runCallbacks]  Whether or not to emit the `ionSlideWillChange`/`ionSlideDidChange` events. Default true.
     */
    Slides.prototype.slideNext = function (speed, runCallbacks) {
        this.swiper.slideNext(runCallbacks, speed);
    };
    /**
     * Transition to the previous slide.
     *
     * @param {number} [speed]  Transition duration (in ms).
     * @param {boolean} [runCallbacks]  Whether or not to emit the `ionSlideWillChange`/`ionSlideDidChange` events. Default true.
     */
    Slides.prototype.slidePrev = function (speed, runCallbacks) {
        this.swiper.slidePrev(runCallbacks, speed);
    };
    /**
     * Get the index of the active slide.
     *
     * @returns {number} The index number of the current slide.
     */
    Slides.prototype.getActiveIndex = function () {
        return this.swiper.activeIndex;
    };
    /**
     * Get the index of the previous slide.
     *
     * @returns {number} The index number of the previous slide.
     */
    Slides.prototype.getPreviousIndex = function () {
        return this.swiper.previousIndex;
    };
    /**
     * Get the total number of slides.
     *
     * @returns {number} The total number of slides.
     */
    Slides.prototype.length = function () {
        return this.swiper.slides.length;
    };
    /**
     * Get whether or not the current slide is the last slide.
     *
     * @returns {boolean} If the slide is the last slide or not.
     */
    Slides.prototype.isEnd = function () {
        return this.isEnd();
    };
    /**
     * Get whether or not the current slide is the first slide.
     *
     * @returns {boolean} If the slide is the first slide or not.
     */
    Slides.prototype.isBeginning = function () {
        return this.isBeginning();
    };
    /**
     * Start auto play.
     */
    Slides.prototype.startAutoplay = function () {
        this.swiper.startAutoplay();
    };
    /**
     * Stop auto play.
     */
    Slides.prototype.stopAutoplay = function () {
        this.swiper.stopAutoplay();
    };
    /**
     * Lock or unlock the ability to slide to the next slides.
     */
    Slides.prototype.lockSwipeToNext = function (shouldLockSwipeToNext) {
        if (shouldLockSwipeToNext) {
            return this.swiper.lockSwipeToNext();
        }
        this.swiper.unlockSwipeToNext();
    };
    /**
     * Lock or unlock the ability to slide to the previous slides.
     */
    Slides.prototype.lockSwipeToPrev = function (shouldLockSwipeToPrev) {
        if (shouldLockSwipeToPrev) {
            return this.swiper.lockSwipeToPrev();
        }
        this.swiper.unlockSwipeToPrev();
    };
    /**
     * Lock or unlock the ability to slide to change slides.
     */
    Slides.prototype.lockSwipes = function (shouldLockSwipes) {
        if (shouldLockSwipes) {
            return this.swiper.lockSwipes();
        }
        this.swiper.unlockSwipes();
    };
    /**
     * Enable or disable keyboard control.
     */
    Slides.prototype.enableKeyboardControl = function (shouldEnableKeyboard) {
        if (shouldEnableKeyboard) {
            return this.swiper.enableKeyboardControl();
        }
        this.swiper.disableKeyboardControl();
    };
    /**
     * @hidden
     */
    Slides.prototype["componentDidunload"] = function () {
        this._init = false;
        this.swiper.destroy(true, true);
        this.enableKeyboardControl(false);
    };
    return Slides;
}());
export { Slides };
var slidesId = -1;
