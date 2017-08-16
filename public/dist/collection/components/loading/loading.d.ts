import { AnimationBuilder, AnimationController, Config } from '../../index';
export declare class Loading {
    private animation;
    private durationTimeout;
    private el;
    private ionLoadingDidLoad;
    private ionLoadingDidPresent;
    private ionLoadingWillPresent;
    private ionLoadingWillDismiss;
    private ionLoadingDidDismiss;
    private ionLoadingDidUnload;
    private showSpinner;
    private spinner;
    animationCtrl: AnimationController;
    config: Config;
    cssClass: string;
    content: string;
    dismissOnPageChange: boolean;
    duration: number;
    enterAnimation: AnimationBuilder;
    exitAnimation: AnimationBuilder;
    id: string;
    showBackdrop: boolean;
    present(): Promise<void>;
    private _present(resolve);
    dismiss(): Promise<{}>;
    protected ionViewDidUnload(): void;
    protected onDismiss(ev: UIEvent): void;
    protected ionViewDidLoad(): void;
    protected ionViewDidEnter(): void;
    protected render(): JSX.Element[];
}
export interface LoadingOptions {
    spinner?: string;
    content?: string;
    cssClass?: string;
    showBackdrop?: boolean;
    dismissOnPageChange?: boolean;
    duration?: number;
}
export interface LoadingEvent extends Event {
    detail: {
        loading: Loading;
    };
}
