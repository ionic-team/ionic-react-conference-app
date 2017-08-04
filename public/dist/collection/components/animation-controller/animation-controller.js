import { Animator } from './animator';
import { Ionic } from '../../index';
var AnimationController = (function () {
    function AnimationController() {
    }
    AnimationController.prototype["componentWillLoad"] = function () {
        debugger;
        ;
        ;
        Ionic.registerController('animation', this);
    };
    AnimationController.prototype.load = function () {
        return new Promise(function (resolve) {
            debugger;
            resolve(Animator);
        });
    };
    return AnimationController;
}());
export { AnimationController };
