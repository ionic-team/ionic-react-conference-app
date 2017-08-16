import { EventEmitter } from '@stencil/core';
export declare class Label {
    styleTmr: any;
    /**
     * @output {event} Emitted when the styles change.
     */
    ionStyle: EventEmitter;
    /**
     * @output {event} If true, the label will sit alongside an input. Defaults to `false`.
     */
    fixed: boolean;
    /**
     * @output {event} If true, the label will float above an input when the value is empty or the input is focused. Defaults to `false`.
     */
    floating: boolean;
    /**
     * @output {event} If true, the label will be stacked above an input. Defaults to `false`.
     */
    stacked: boolean;
    ionViewDidLoad(): void;
    emitStyle(): void;
    render(): JSX.Element;
}
