export declare class TabButton {
    tab: any;
    layout: string;
    selectedIndex: number;
    index: number;
    hostData(): {} | {
        attrs: {
            'aria-selected': boolean;
        };
        class: {
            'has-title': boolean;
            'has-icon': boolean;
            'has-title-only': boolean;
            'has-icon-only': boolean;
            'has-badge': boolean;
        };
    };
    render(): any[];
}
