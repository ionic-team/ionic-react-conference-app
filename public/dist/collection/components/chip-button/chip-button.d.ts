export declare class ChipButton {
    private el;
    private mode;
    private color;
    href: string;
    /**
     * @Prop {boolean} If true, activates a transparent button style.
     */
    clear: boolean;
    /**
     * @Prop {boolean} If true, sets the button into a disabled state.
     */
    disabled: boolean;
    /**
     * @hidden
     * Get the classes based on the button type
     * e.g. alert-button, action-sheet-button
     */
    private getButtonClassList(buttonType, mode);
    /**
     * @hidden
     * Get the classes for the color
     */
    private getColorClassList(color, buttonType, style, mode);
    /**
     * @hidden
     * Get the classes for the style
     * Chip buttons can only be clear or default (solid)
     */
    private getStyleClassList(buttonType);
    render(): JSX.Element;
}
