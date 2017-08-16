import { EventEmitter } from '@stencil/core';
import { Config } from '../../index';
import { MenuController } from './menu-controller';
export declare class Menu {
    private el;
    private _backdropElm;
    private _ctrl;
    private _unregCntClick;
    private _unregBdClick;
    private _activeBlock;
    private _cntElm;
    private _type;
    private _init;
    private _isPane;
    mode: string;
    color: string;
    ionDrag: EventEmitter;
    ionOpen: EventEmitter;
    ionClose: EventEmitter;
    config: Config;
    /**
     * @hidden
     */
    isOpen: boolean;
    /**
     * @hidden
     */
    isAnimating: boolean;
    /**
     * @hidden
     */
    isRightSide: boolean;
    /**
     * @input {any} A reference to the content element the menu should use.
     */
    content: any;
    /**
     * @input {string} An id for the menu.
     */
    id: string;
    /**
     * @input {string} The display type of the menu. Default varies based on the mode,
     * see the `menuType` in the [config](../../config/Config). Available options:
     * `"overlay"`, `"reveal"`, `"push"`.
     */
    type: string;
    /**
     * @input {boolean} If true, the menu is enabled. Default `true`.
     */
    enabled: boolean;
    /**
     * @input {string} Which side of the view the menu should be placed. Default `"start"`.
     */
    side: string;
    /**
     * @input {boolean} If true, swiping the menu is enabled. Default `true`.
     */
    swipeEnabled: boolean;
    swipeEnabledChange(isEnabled: boolean): void;
    /**
     * @input {boolean} If true, the menu will persist on child pages.
     */
    persistent: boolean;
    /**
     * @hidden
     */
    maxEdgeStart: number;
    /**
     * @hidden
     */
    ionViewDidLoad(): void;
    hostData(): {
        attrs: {
            'role': string;
            'side': string;
            'type': string;
        };
        class: {
            'menu-enabled': boolean;
        };
    };
    render(): JSX.Element[];
    /**
     * @hidden
     */
    onBackdropClick(ev: UIEvent): void;
    /**
     * @hidden
     */
    private _getType();
    /**
     * @hidden
     */
    setOpen(shouldOpen: boolean, animated?: boolean): Promise<boolean>;
    _forceClosing(): void;
    /**
     * @hidden
     */
    canSwipe(): boolean;
    _swipeBeforeStart(): void;
    _swipeStart(): void;
    _swipeProgress(stepValue: number): void;
    _swipeEnd(shouldCompleteLeft: boolean, shouldCompleteRight: boolean, stepValue: number, velocity: number): void;
    private _before();
    private _after(isOpen);
    /**
     * @hidden
     */
    open(): Promise<boolean>;
    /**
     * @hidden
     */
    close(): Promise<boolean>;
    /**
     * @hidden
     */
    resize(): void;
    /**
     * @hidden
     */
    toggle(): Promise<boolean>;
    _canOpen(): boolean;
    /**
     * @hidden
     */
    _updateState(): void;
    /**
     * @hidden
     */
    enable(shouldEnable: boolean): Menu;
    /**
     * @internal
     */
    initPane(): boolean;
    /**
     * @internal
     */
    paneChanged(isPane: boolean): void;
    /**
     * @hidden
     */
    swipeEnable(shouldEnable: boolean): Menu;
    /**
     * @hidden
     */
    getMenuElement(): HTMLElement;
    /**
     * @hidden
     */
    getContentElement(): HTMLElement;
    /**
     * @hidden
     */
    getBackdropElement(): HTMLElement;
    /**
     * @hidden
     */
    width(): number;
    /**
     * @hidden
     */
    getMenuController(): MenuController;
    private _backdropClick(shouldAdd);
    /**
     * @hidden
     */
    ionViewDidUnload(): void;
}
