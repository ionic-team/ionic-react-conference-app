import { Config, GestureDetail } from '../../index';
export declare class Scroll {
    private el;
    private gesture;
    private positions;
    private _l;
    private _t;
    private tmr;
    private queued;
    isScrolling: boolean;
    detail: ScrollDetail;
    config: Config;
    enabled: boolean;
    jsScroll: boolean;
    ionScrollStart: ScrollCallback;
    ionScroll: ScrollCallback;
    ionScrollEnd: ScrollCallback;
    ionViewDidLoad(): void;
    onNativeScroll(): void;
    onScroll(timeStamp: number): void;
    onEnd(timeStamp: number): void;
    enableJsScroll(contentTop: number, contentBottom: number): void;
    onTouchStart(): void;
    onTouchMove(): void;
    onTouchEnd(): void;
    /**
     * DOM READ
     */
    getTop(): number;
    /**
     * DOM READ
     */
    getLeft(): number;
    /**
     * DOM WRITE
     */
    setTop(top: number): void;
    /**
     * DOM WRITE
     */
    setLeft(left: number): void;
    scrollTo(x: number, y: number, duration: number, done?: Function): Promise<any>;
    scrollToTop(duration: number): Promise<void>;
    scrollToBottom(duration: number): Promise<void>;
    ionViewDidUnload(): void;
    render(): JSX.Element;
}
export interface ScrollDetail extends GestureDetail {
    scrollTop?: number;
    scrollLeft?: number;
    scrollHeight?: number;
    scrollWidth?: number;
    contentHeight?: number;
    contentWidth?: number;
    contentTop?: number;
    contentBottom?: number;
    contentElement?: HTMLElement;
    fixedElement?: HTMLElement;
    scrollElement?: HTMLElement;
    headerElement?: HTMLElement;
    footerElement?: HTMLElement;
}
export interface ScrollCallback {
    (detail?: ScrollDetail): boolean | void;
}
