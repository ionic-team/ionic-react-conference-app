import { Animation } from '../../index';
/**
 * @hidden
 * Menu Type
 * Base class which is extended by the various types. Each
 * type will provide their own animations for open and close
 * and registers itself with Menu.
 */
export declare class MenuType {
    ani: Animation;
    isOpening: boolean;
    constructor();
    setOpen(shouldOpen: boolean, animated: boolean, done: (animation: Animation) => void): void;
    setProgressStart(isOpen: boolean): void;
    setProgessStep(stepValue: number): void;
    setProgressEnd(shouldComplete: boolean, currentStepValue: number, velocity: number, done: Function): void;
    destroy(): void;
}
/**
 * @hidden
 * Menu Reveal Type
 * The content slides over to reveal the menu underneath.
 * The menu itself, which is under the content, does not move.
 */
export declare class MenuRevealType extends MenuType {
}
/**
 * @hidden
 * Menu Push Type
 * The content slides over to reveal the menu underneath.
 * The menu itself also slides over to reveal its bad self.
 */
export declare class MenuPushType extends MenuType {
}
/**
 * @hidden
 * Menu Overlay Type
 * The menu slides over the content. The content
 * itself, which is under the menu, does not move.
 */
export declare class MenuOverlayType extends MenuType {
}
