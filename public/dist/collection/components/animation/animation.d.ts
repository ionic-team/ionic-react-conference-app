import { Animation, AnimationBuilder } from './animation-interface';
export declare class AnimationController {
    create(animationBuilder?: AnimationBuilder, baseElm?: any): Promise<Animation>;
}
