import { ItemSliding } from '../item-sliding/item-sliding';
export declare class List {
    openContainer: ItemSliding;
    render(): JSX.Element;
    /**
     * Close any sliding items that are open.
     */
    closeSlidingItems(): void;
}
