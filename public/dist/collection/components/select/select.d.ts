import { EventEmitter } from '@stencil/core';
export declare class Select {
    text: any;
    id: any;
    labelId: any;
    /**
     * @input {boolean} If true, the user cannot interact with this element. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * @input {string} The text to display on the cancel button. Default: `Cancel`.
     */
    cancelText: string;
    /**
     * @input {string} The text to display on the ok button. Default: `OK`.
     */
    okText: string;
    /**
     * @input {string} The text to display when the select is empty.
     */
    placeholder: string;
    /**
     * @input {any} Any additional options that the `alert` or `action-sheet` interface can take.
     * See the [AlertController API docs](../../alert/AlertController/#create) and the
     * [ActionSheetController API docs](../../action-sheet/ActionSheetController/#create) for the
     * create options for each interface.
     */
    selectOptions: any;
    /**
     * @input {string} The interface the select should use: `action-sheet`, `popover` or `alert`. Default: `alert`.
     */
    interface: string;
    /**
     * @input {string} The text to display instead of the selected option's value.
     */
    selectedText: string;
    /**
     * @input {boolean} If true, the element can accept multiple values.
     */
    multiple: boolean;
    /**
     * @output {EventEmitter} Emitted when the selection is cancelled.
     */
    ionCancel: EventEmitter;
    hostData(): {
        class: {
            'select-disabled': boolean;
        };
    };
    render(): JSX.Element[];
}
