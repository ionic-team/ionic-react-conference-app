import { Config } from '../../index';
export declare class Fixed {
    private el;
    config: Config;
    mode: string;
    hostData(): {
        class: {
            'statusbar-padding': boolean;
        };
        style: {
            'margin-top': string;
            'margin-bottom': string;
        };
    };
    render(): JSX.Element;
}
