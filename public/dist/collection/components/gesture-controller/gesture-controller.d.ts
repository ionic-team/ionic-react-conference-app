export declare class GestureController {
    private id;
    private requestedStart;
    private disabledGestures;
    private disabledScroll;
    private capturedID;
    createGesture(gestureName: string, gesturePriority: number, disableScroll: boolean): GestureDelegate;
    createBlocker(opts?: BlockerOptions): BlockerDelegate;
    newID(): number;
    start(gestureName: string, id: number, priority: number): boolean;
    capture(gestureName: string, id: number, priority: number): boolean;
    release(id: number): void;
    disableGesture(gestureName: string, id: number): void;
    enableGesture(gestureName: string, id: number): void;
    disableScroll(id: number): void;
    enableScroll(id: number): void;
    canStart(gestureName: string): boolean;
    isCaptured(): boolean;
    isScrollDisabled(): boolean;
    isDisabled(gestureName: string): boolean;
}
export declare class GestureDelegate {
    private ctrl;
    private id;
    private name;
    private priority;
    private disableScroll;
    constructor(ctrl: GestureController, id: number, name: string, priority: number, disableScroll: boolean);
    canStart(): boolean;
    start(): boolean;
    capture(): boolean;
    release(): void;
    destroy(): void;
}
export declare class BlockerDelegate {
    private id;
    private controller;
    private disable;
    private disableScroll;
    blocked: boolean;
    constructor(id: number, controller: GestureController, disable: string[], disableScroll: boolean);
    block(): void;
    unblock(): void;
    destroy(): void;
}
export interface BlockerOptions {
    disableScroll?: boolean;
    disable?: string[];
}
export declare const BLOCK_ALL: BlockerOptions;
