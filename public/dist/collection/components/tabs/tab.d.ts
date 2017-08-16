import { EventEmitter } from '@stencil/core';
export declare class Tab {
    /**
     * @prop {Page} Set the root component for this tab.
     */
    root: string;
    /**
     * @prop {object} Any nav-params to pass to the root componentof this tab.
     */
    rootParams: any;
    /**
     * @prop {boolean} If true, the tab is selected
     */
    isSelected: Boolean;
    /**
     * @prop {string} The title of the tab button.
     */
    tabTitle: string;
    /**
     * @prop {string} The icon for the tab button.
     */
    tabIcon: string;
    /**
     * @prop {string} The badge for the tab button.
     */
    tabBadge: string;
    /**
     * @prop {string} The badge color for the tab button.
     */
    tabBadgeStyle: string;
    /**
     * @prop {boolean} If true, enable the tab. If false,
     * the user cannot interact with this element.
     * Default: `true`.
     */
    enabled: boolean;
    /**
     * @prop {boolean} If true, the tab button is visible within the
     * tabbar. Default: `true`.
     */
    shown: boolean;
    /**
     * @prop {boolean} If true, hide the tabs on child pages.
     */
    tabsHideOnSubPages: boolean;
    /**
     * @prop {Tab} Emitted when the current tab is selected.
     */
    onSelected: Function;
    ionTabDidLoad: EventEmitter;
    hostData(): {
        style: {
            display: string;
        };
        attrs: {
            'role': string;
        };
        class: {};
    };
    ionViewDidLoad(): void;
    ionViewDidUnload(): void;
    render(): JSX.Element[];
}
