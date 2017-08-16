import { LoadingEvent, LoadingOptions, Loading } from '../../index';
export declare class LoadingController {
    private ids;
    private loadingResolves;
    private loadings;
    create(opts?: LoadingOptions): Promise<Loading>;
    protected viewDidLoad(ev: LoadingEvent): void;
    protected willPresent(ev: LoadingEvent): void;
    protected willDismiss(ev: LoadingEvent): void;
    protected escapeKeyUp(): void;
}
