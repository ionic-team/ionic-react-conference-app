import { Config } from '../../index';
export declare class Spinner {
    mode: string;
    color: string;
    config: Config;
    duration: number;
    name: string;
    paused: boolean;
    ionViewDidLoad(): void;
    hostData(): {
        class: {
            [className: string]: boolean;
        };
    };
    render(): any[];
}
