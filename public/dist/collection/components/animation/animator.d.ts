import { AnimationOptions, PlayOptions } from './animation-interface';
export declare class Animator {
    private _afterAddClasses;
    private _afterRemoveClasses;
    private _afterStyles;
    private _beforeAddClasses;
    private _beforeRemoveClasses;
    private _beforeStyles;
    private _childAnimations;
    private _childAnimationTotal;
    private _duration;
    private _easingName;
    private _elements;
    private _elementTotal;
    private _fxProperties;
    private _hasDur;
    private _hasTweenEffect;
    private _isAsync;
    private _isReverse;
    private _onFinishCallbacks;
    private _onFinishOneTimeCallbacks;
    private _readCallbacks;
    private _reversedEasingName;
    private _timerId;
    private _unregisterTrnsEnd;
    private _writeCallbacks;
    private _destroyed;
    parent: Animator;
    opts: AnimationOptions;
    hasChildren: boolean;
    isPlaying: boolean;
    hasCompleted: boolean;
    addElement(elm: Node | Node[] | NodeList): Animator;
    /**
     * NO DOM
     */
    private _addElm(elm);
    /**
     * Add a child animation to this animation.
     */
    add(childAnimation: Animator): Animator;
    /**
     * Get the duration of this animation. If this animation does
     * not have a duration, then it'll get the duration from its parent.
     */
    getDuration(opts?: PlayOptions): number;
    /**
     * Returns if the animation is a root one.
     */
    isRoot(): boolean;
    /**
     * Set the duration for this animation.
     */
    duration(milliseconds: number): Animator;
    /**
     * Get the easing of this animation. If this animation does
     * not have an easing, then it'll get the easing from its parent.
     */
    getEasing(): string;
    /**
     * Set the easing for this animation.
     */
    easing(name: string): this;
    /**
     * Set the easing for this reversed animation.
     */
    easingReverse(name: string): this;
    /**
     * Add the "from" value for a specific property.
     */
    from(prop: string, val: any): Animator;
    /**
     * Add the "to" value for a specific property.
     */
    to(prop: string, val: any, clearProperyAfterTransition?: boolean): Animator;
    /**
     * Shortcut to add both the "from" and "to" for the same property.
     */
    fromTo(prop: string, fromVal: any, toVal: any, clearProperyAfterTransition?: boolean): Animator;
    /**
     * @hidden
     * NO DOM
     */
    private _getProp(name);
    private _addProp(state, prop, val);
    /**
     * Add CSS class to this animation's elements
     * before the animation begins.
     */
    beforeAddClass(className: string): Animator;
    /**
     * Remove CSS class from this animation's elements
     * before the animation begins.
     */
    beforeRemoveClass(className: string): Animator;
    /**
     * Set CSS inline styles to this animation's elements
     * before the animation begins.
     */
    beforeStyles(styles: {
        [property: string]: any;
    }): Animator;
    /**
     * Clear CSS inline styles from this animation's elements
     * before the animation begins.
     */
    beforeClearStyles(propertyNames: string[]): Animator;
    /**
     * Add a function which contains DOM reads, which will run
     * before the animation begins.
     */
    beforeAddRead(domReadFn: Function): Animator;
    /**
     * Add a function which contains DOM writes, which will run
     * before the animation begins.
     */
    beforeAddWrite(domWriteFn: Function): Animator;
    /**
     * Add CSS class to this animation's elements
     * after the animation finishes.
     */
    afterAddClass(className: string): Animator;
    /**
     * Remove CSS class from this animation's elements
     * after the animation finishes.
     */
    afterRemoveClass(className: string): Animator;
    /**
     * Set CSS inline styles to this animation's elements
     * after the animation finishes.
     */
    afterStyles(styles: {
        [property: string]: any;
    }): Animator;
    /**
     * Clear CSS inline styles from this animation's elements
     * after the animation finishes.
     */
    afterClearStyles(propertyNames: string[]): Animator;
    /**
     * Play the animation.
     */
    play(opts?: PlayOptions): void;
    syncPlay(): void;
    /**
     * @hidden
     * DOM WRITE
     * RECURSION
     */
    _playInit(opts: PlayOptions): void;
    /**
     * @hidden
     * DOM WRITE
     * NO RECURSION
     * ROOT ANIMATION
     */
    _playDomInspect(opts: PlayOptions): void;
    /**
     * @hidden
     * DOM WRITE
     * RECURSION
     */
    _playProgress(opts: PlayOptions): void;
    /**
     * @hidden
     * DOM WRITE
     * RECURSION
     */
    _playToStep(stepValue: number): void;
    /**
     * @hidden
     * DOM WRITE
     * NO RECURSION
     * ROOT ANIMATION
     */
    _asyncEnd(dur: number, shouldComplete: boolean): void;
    /**
     * @hidden
     * DOM WRITE
     * RECURSION
     */
    _playEnd(stepValue?: number): void;
    /**
     * @hidden
     * NO DOM
     * RECURSION
     */
    _hasDuration(opts: PlayOptions): boolean;
    /**
     * @hidden
     * NO DOM
     * RECURSION
     */
    _hasDomReads(): boolean;
    /**
     * Immediately stop at the end of the animation.
     */
    stop(stepValue?: number): void;
    /**
     * @hidden
     * NO DOM
     * NO RECURSION
     */
    _clearAsync(): void;
    /**
     * @hidden
     * DOM WRITE
     * NO RECURSION
     */
    _progress(stepValue: number): void;
    /**
     * @hidden
     * DOM WRITE
     * NO RECURSION
     */
    _setTrans(dur: number, forcedLinearEasing: boolean): void;
    /**
     * @hidden
     * DOM READ
     * DOM WRITE
     * RECURSION
     */
    _beforeAnimation(): void;
    /**
     * @hidden
     * DOM WRITE
     * RECURSION
     */
    _setBeforeStyles(): void;
    /**
     * @hidden
     * DOM READ
     * RECURSION
     */
    _fireBeforeReadFunc(): void;
    /**
     * @hidden
     * DOM WRITE
     * RECURSION
     */
    _fireBeforeWriteFunc(): void;
    /**
     * @hidden
     * DOM WRITE
     */
    _setAfterStyles(): void;
    /**
     * @hidden
     * DOM WRITE
     * NO RECURSION
     */
    _willChange(addWillChange: boolean): void;
    /**
     * Start the animation with a user controlled progress.
     */
    progressStart(): void;
    /**
     * @hidden
     * DOM WRITE
     * RECURSION
     */
    _progressStart(): void;
    /**
     * Set the progress step for this animation.
     * progressStep() is not debounced, so it should not be called faster than 60FPS.
     */
    progressStep(stepValue: number): void;
    /**
     * End the progress animation.
     */
    progressEnd(shouldComplete: boolean, currentStepValue: number, dur: number): void;
    /**
     * @hidden
     * DOM WRITE
     * RECURSION
     */
    _progressEnd(shouldComplete: boolean, stepValue: number, dur: number, isAsync: boolean): void;
    /**
     * Add a callback to fire when the animation has finished.
     */
    onFinish(callback: (animation?: any) => void, opts?: {
        oneTimeCallback?: boolean;
        clearExistingCallacks?: boolean;
    }): Animator;
    /**
     * @hidden
     * NO DOM
     * RECURSION
     */
    _didFinishAll(hasCompleted: boolean, finishAsyncAnimations: boolean, finishNoDurationAnimations: boolean): void;
    /**
     * @hidden
     * NO RECURSION
     */
    _didFinish(hasCompleted: boolean): void;
    /**
     * Reverse the animation.
     */
    reverse(shouldReverse?: boolean): Animator;
    /**
     * Recursively destroy this animation and all child animations.
     */
    destroy(): void;
    /**
     * @hidden
     * NO DOM
     */
    _transEl(): HTMLElement;
}
