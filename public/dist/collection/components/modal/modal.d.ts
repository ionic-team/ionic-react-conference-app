import { EventEmitter } from '@stencil/core';
import { AnimationBuilder, AnimationController } from '../../index';
export declare class Modal {
    private el;
    ionModalDidLoad: EventEmitter;
    ionModalWillPresent: EventEmitter;
    ionModalDidPresent: EventEmitter;
    ionModalWillDismiss: EventEmitter;
    ionModalDidDismiss: EventEmitter;
    ionModalDidUnload: EventEmitter;
    animationCtrl: AnimationController;
    mode: string;
    color: string;
    component: string;
    componentProps: any;
    cssClass: string;
    enableBackdropDismiss: boolean;
    enterAnimation: AnimationBuilder;
    exitAnimation: AnimationBuilder;
    id: string;
    showBackdrop: boolean;
    private animation;
    present(): Promise<void>;
    private _present(resolve);
    dismiss(): Promise<void>;
    protected onDismiss(ev: UIEvent): void;
    protected ionViewDidLoad(): void;
    protected ionViewDidUnload(): void;
    protected backdropClick(): void;
    protected render(): JSX.Element[];
}
export interface ModalOptions {
    component: string;
    componentProps?: any;
    showBackdrop?: boolean;
    enableBackdropDismiss?: boolean;
    enterAnimation?: AnimationBuilder;
    exitAnimation?: AnimationBuilder;
    cssClass?: string;
}
export interface ModalEvent extends Event {
    detail: {
        modal: Modal;
    };
}
