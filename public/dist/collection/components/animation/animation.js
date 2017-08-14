import { Animator } from './animator';
var AnimationController = (function () {
    function AnimationController() {
    }
    AnimationController.prototype.create = function (animationBuilder, baseElm) {
        return new Promise(function (resolve) {
            if (animationBuilder) {
                resolve(animationBuilder(Animator, baseElm));
            }
            else {
                resolve(new Animator());
            }
        });
    };
    return AnimationController;
}());
export { AnimationController };
