import { EventEmitter } from '@stencil/core';
import { BooleanInputComponent } from '../../index';
export declare class Toggle implements BooleanInputComponent {
    activated: boolean;
    hasFocus: boolean;
    id: string;
    labelId: string;
    startX: number;
    styleTmr: any;
    ionChange: EventEmitter;
    ionStyle: EventEmitter;
    ionFocus: EventEmitter;
    ionBlur: EventEmitter;
    color: string;
    mode: string;
    checked: boolean;
    disabled: boolean;
    value: string;
    ionViewWillLoad(): void;
    changed(val: boolean): void;
    disableChanged(): void;
    private emitStyle();
    private canStart();
    private onDragStart(detail);
    private onDragMove(detail);
    private onDragEnd(detail);
    onSpace(ev: KeyboardEvent): void;
    toggle(): boolean;
    fireFocus(): void;
    fireBlur(): void;
    hostData(): {
        class: {
            'toggle-activated': boolean;
            'toggle-checked': boolean;
            'toggle-disabled': boolean;
        };
    };
    render(): JSX.Element;
}
