var Slide = (function () {
    function Slide() {
    }
    Slide.prototype.hostData = function () {
        return {
            class: {
                'slide-zoom': true,
                'swiper-slide': true
            }
        };
    };
    Slide.prototype.render = function () {
        return h(0, 0);
    };
    return Slide;
}());
export { Slide };
