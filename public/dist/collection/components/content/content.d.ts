import { Config, Scroll, ScrollDetail } from '../../index';
export declare class Content {
    private mode;
    private color;
    private el;
    config: Config;
    $scroll: Scroll;
    $scrollDetail: ScrollDetail;
    $fixed: HTMLElement;
    $siblingHeader: HTMLElement;
    $siblingFooter: HTMLElement;
    /**
     * @output {ScrollEvent} Emitted when the scrolling first starts.
     */
    ionScrollStart: Function;
    /**
     * @output {ScrollEvent} Emitted on every scroll event.
     */
    ionScroll: Function;
    /**
     * @output {ScrollEvent} Emitted when scrolling ends.
     */
    ionScrollEnd: Function;
    headerHeight: string;
    ionViewDidUnload(): void;
    enableJsScroll(): void;
    /**
     * Scroll to the top of the content component.
     *
     * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
     * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
     */
    scrollToTop(duration?: number): Promise<void>;
    /**
     * Scroll to the bottom of the content component.
     *
     * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
     * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
     */
    scrollToBottom(duration?: number): Promise<void>;
    /**
     * @input {boolean} If true, the content will scroll behind the headers
     * and footers. This effect can easily be seen by setting the toolbar
     * to transparent.
     */
    fullscreen: boolean;
    render(): JSX.Element;
}
