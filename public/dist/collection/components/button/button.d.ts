/**
  * @name Button
  * @module ionic
  * @description
  * Buttons are simple components in Ionic. They can consist of text and icons
  * and be enhanced by a wide range of attributes.
  *
  * @usage
  *
  * ```html
  *
  *  <!-- Colors -->
  *  <ion-button>Default</ion-button>
  *
  *  <ion-button color="secondary">Secondary</ion-button>
  *
  *  <ion-button color="danger">Danger</ion-button>
  *
  *  <ion-button color="light">Light</ion-button>
  *
  *  <ion-button color="dark">Dark</ion-button>
  *
  *  <!-- Shapes -->
  *  <ion-button full>Full Button</ion-button>
  *
  *  <ion-button block>Block Button</ion-button>
  *
  *  <ion-button round>Round Button</ion-button>
  *
  *  <!-- Outline -->
  *  <ion-button full outline>Outline + Full</ion-button>
  *
  *  <ion-button block outline>Outline + Block</ion-button>
  *
  *  <ion-button round outline>Outline + Round</ion-button>
  *
  *  <!-- Icons -->
  *  <ion-button>
  *    <ion-icon slot="start" name="star"></ion-icon>
  *    Left Icon
  *  </ion-button>
  *
  *  <ion-button>
  *    Right Icon
  *    <ion-icon slot="end" name="star"></ion-icon>
  *  </ion-button>
  *
  *  <ion-button>
  *    <ion-icon slot="icon-only" name="star"></ion-icon>
  *  </ion-button>
  *
  *  <!-- Sizes -->
  *  <ion-button large>Large</ion-button>
  *
  *  <ion-button>Default</ion-button>
  *
  *  <ion-button small>Small</ion-button>
  * ```
  *
  */
export declare class Button {
    private el;
    itemButton: boolean;
    href: string;
    /**
     * @Prop {string} The type of button.
     * Possible values are: `"button"`, `"bar-button"`.
     */
    buttonType: string;
    /**
     * @Prop {boolean} If true, activates the large button size.
     * Type: size
     */
    large: boolean;
    /**
     * @Prop {boolean} If true, activates the small button size.
     * Type: size
     */
    small: boolean;
    /**
     * @Prop {boolean} If true, activates the default button size. Normally the default, useful for buttons in an item.
     * Type: size
     */
    default: boolean;
    /**
     * @Prop {boolean} If true, sets the button into a disabled state.
     */
    disabled: boolean;
    /**
     * @Prop {boolean} If true, activates a transparent button style with a border.
     * Type: style
     */
    outline: boolean;
    /**
     * @Prop {boolean} If true, activates a transparent button style without a border.
     * Type: style
     */
    clear: boolean;
    /**
     * @Prop {boolean} If true, activates a solid button style. Normally the default, useful for buttons in a toolbar.
     * Type: style
     */
    solid: boolean;
    /**
     * @Prop {boolean} If true, activates a button with rounded corners.
     * Type: shape
     */
    round: boolean;
    /**
     * @Prop {boolean} If true, activates a button style that fills the available width.
     * Type: display
     */
    block: boolean;
    /**
     * @Prop {boolean} If true, activates a button style that fills the available width without
     * a left and right border.
     * Type: display
     */
    full: boolean;
    /**
     * @Prop {boolean} If true, activates a button with a heavier font weight.
     * Type: decorator
     */
    strong: boolean;
    /**
     * @Prop {string} The mode determines which platform styles to use.
     * Possible values are: `"ios"`, `"md"`, or `"wp"`.
     * For more information, see [Platform Styles](/docs/theming/platform-specific-styles).
     */
    mode: 'ios' | 'md' | 'wp';
    /**
     * @Prop {string} The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/theming/theming-your-app).
     */
    color: string;
    render(): JSX.Element;
}
