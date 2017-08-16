export declare class Tabs {
    tabs: any;
    /**
     * @state {number} The selected tab
     */
    selectedTab: any;
    /**
     * @state {number} The selected tab index
     */
    selectedIndex: number;
    /**
     * @prop {string} Set the tabbar layout: `icon-top`, `icon-start`, `icon-end`, `icon-bottom`, `icon-hide`, `title-hide`.
     */
    tabsLayout: string;
    /**
     * @prop {string} Set position of the tabbar: `top`, `bottom`.
     */
    tabsPlacement: string;
    /**
     * @prop {boolean} If true, show the tab highlight bar under the selected tab.
     */
    tabsHighlight: boolean;
    /**
     * @output {any} Emitted when the tab changes.
     */
    ionChange: Function;
    /**
     * If selectedIndex was changed, grab the reference to the tab it points to.
     */
    handleSelectedIndexChanged(): void;
    tabDidLoad(ev: any): void;
    tabDidUnload(ev: any): void;
    handleOnTabSelected(tab: any, index: number): void;
    render(): JSX.Element[];
}
