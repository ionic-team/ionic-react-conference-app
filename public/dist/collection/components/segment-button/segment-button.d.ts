import { EventEmitter } from '@stencil/core';
/**
 * @name SegmentButton
 * @description
 * The child buttons of the `ion-segment` component. Each `ion-segment-button` must have a value.
 *
 * @usage
 *
 * ```html
 * <ion-content>
 *   <!-- Segment buttons with icons -->
 *   <ion-segment [(ngModel)]="icons" color="secondary">
 *     <ion-segment-button value="camera">
 *       <ion-icon name="camera"></ion-icon>
 *     </ion-segment-button>
 *     <ion-segment-button value="bookmark">
 *       <ion-icon name="bookmark"></ion-icon>
 *     </ion-segment-button>
 *   </ion-segment>
 *
 *   <!-- Segment buttons with text -->
 *   <ion-segment [(ngModel)]="relationship" color="primary">
 *     <ion-segment-button value="friends" (ionSelect)="selectedFriends()">
 *       Friends
 *     </ion-segment-button>
 *     <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">
 *       Enemies
 *     </ion-segment-button>
 *   </ion-segment>
 * </ion-content>
 * ```
 *
 *
 * @demo /docs/demos/src/segment/
 * @see {@link /docs/components#segment Segment Component Docs}
 * @see {@link /docs/api/components/segment/Segment/ Segment API Docs}
 */
export declare class SegmentButton {
    styleTmr: any;
    mode: string;
    color: string;
    el: HTMLElement;
    ionClick: EventEmitter;
    activated: boolean;
    checked: boolean;
    disabled: boolean;
    /**
     * @input {string} the value of the segment button. Required.
     */
    value: string;
    segmentButtonClick(ev: UIEvent): void;
    /**
     * Emit the click event to the parent segment
     */
    private emitClick();
    /**
     * @hidden
     * Get the classes for the segment button state
     */
    getElementClassList(): any[];
    render(): JSX.Element[];
}
export interface SegmentButtonEvent {
    segmentButton: SegmentButton;
}
