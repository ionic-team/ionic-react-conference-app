/**
 * @name ItemOption
 * @description
 * The option button for an `ion-item-sliding`. Must be placed inside of an `<ion-item-options>`.
 * You can combine the `(ionSwipe)` event and the `expandable` directive to create a full swipe
 * action for the item.
 */
export declare class ItemOption {
    mode: string;
    color: string;
    href: string;
    /**
     * @Prop {boolean} If true, sets the button into a disabled state.
     */
    disabled: boolean;
    notCaptured(): void;
    clickedOptionButton(ev: any): boolean;
    render(): JSX.Element;
}
