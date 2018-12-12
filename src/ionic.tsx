import React from 'react';
import ReactDOM from 'react-dom';
import { IonicConfig, Components } from '@ionic/core';
import { Components as IoniconsComponents } from 'ionicons';
// import '@ionic/core/dist/ionic/svg';
import { defineCustomElements } from '@ionic/core/loader';

export interface IonicGlobal {
  config?: any;
  ael?: (elm: any, eventName: string, cb: (ev: Event) => void, opts: any) => void;
  raf?: (ts: number) => void;
  rel?: (elm: any, eventName: string, cb: (ev: Event) => void, opts: any) => void;
}

export interface IonicWindow extends Window {
  Ionic: IonicGlobal;
}

function syncEvent(node: Element, eventName: string, newEventHandler: () => any) {
  const eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
  const eventStore = (node as any).__events || ((node as any).__events = {});
  const oldEventHandler = eventStore[eventNameLc];

  // Remove old listener so they don't double up.
  if (oldEventHandler) {
    node.removeEventListener(eventNameLc, oldEventHandler);
  }

  // Bind new listener.
  if (newEventHandler) {
    node.addEventListener(eventNameLc, eventStore[eventNameLc] = function handler(e: Event) {
      newEventHandler.call(this, e);
    });
  }
}

const dashToPascalCase = (str: string) => str.toLowerCase().split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join('');

function registerIonic(config: IonicConfig = {}) {
  console.log(process.env.PUBLIC_URL);
  const win: IonicWindow = window as any;
  const Ionic = (win.Ionic = win.Ionic || {});

  Ionic.config = config;
  defineCustomElements(window);
}

function createReactComponent<T>(tagName: string) {
  const displayName = dashToPascalCase(tagName);

  interface IonicReactBaseProps {
    className?: string;
  }

  return class ReactComponent extends React.Component<T & IonicReactBaseProps> {
    constructor(props: T & IonicReactBaseProps) {
      super(props);
    }

    static get displayName() {
      return displayName;
    }

    componentDidMount() {
      this.componentWillReceiveProps(this.props);
    }
    componentWillReceiveProps(props: any) {
      const node = ReactDOM.findDOMNode(this) as Element | null

      if (node == null) {
        return;
      }

      Object.keys(props).forEach(name => {
        if (name === 'children' || name === 'style') {
          return;
        }

        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          syncEvent(node, name.substring(2), props[name]);
        } else {
          (node as any)[name] = props[name];
        }
      });
    }
    render() {
      const { children, className, ...cProps } = this.props as any;
      cProps.class = className || cProps.class;
      return React.createElement(tagName, cProps, children);
    }
  }
}

registerIonic();

export const IonIcon = createReactComponent<IoniconsComponents.IonIconAttributes>('ion-icon');
export const IonApp = createReactComponent<Components.IonAppAttributes>('ion-app');
export const IonPage = createReactComponent<{}>('ion-page');
export const IonMenu = createReactComponent<Components.IonMenuAttributes>('ion-menu');
export const IonHeader = createReactComponent<Components.IonHeaderAttributes>('ion-header');
export const IonTitle = createReactComponent<Components.IonTitleAttributes>('ion-title');
export const IonNav = createReactComponent<Components.IonNavAttributes>('ion-nav');
export const IonToolbar = createReactComponent<Components.IonToolbarAttributes>('ion-toolbar');
export const IonButtons = createReactComponent<Components.IonButtonsAttributes>('ion-buttons');
export const IonSelect = createReactComponent<Components.IonSelectAttributes>('ion-select');
export const IonSelectOption = createReactComponent<Components.IonSelectOptionAttributes>('ion-select-option');
export const IonButton = createReactComponent<Components.IonButtonAttributes>('ion-button');
export const IonContent = createReactComponent<Components.IonContentAttributes>('ion-content');
export const IonList = createReactComponent<Components.IonListAttributes>('ion-list');
export const IonListHeader = createReactComponent<Components.IonListHeaderAttributes>('ion-list-header');
export const IonItem = createReactComponent<Components.IonItemAttributes>('ion-item');
export const IonLabel = createReactComponent<Components.IonLabelAttributes>('ion-label');
export const IonDatetime = createReactComponent<Components.IonDatetimeAttributes>('ion-datetime');
export const IonMenuButton = createReactComponent<Components.IonMenuButtonAttributes>('ion-menu-button');
export const IonItemGroup = createReactComponent<Components.IonItemGroupAttributes>('ion-item-group');
export const IonItemDivider = createReactComponent<Components.IonItemDividerAttributes>('ion-item-divider');
export const IonItemSliding = createReactComponent<Components.IonItemSlidingAttributes>('ion-item-sliding');
export const IonItemOption = createReactComponent<Components.IonItemOptionAttributes>('ion-item-option');
export const IonItemOptions = createReactComponent<Components.IonItemOptionsAttributes>('ion-item-options');
export const IonInput = createReactComponent<Components.IonInputAttributes>('ion-input');
export const IonGrid = createReactComponent<Components.IonGridAttributes>('ion-grid');
export const IonRow = createReactComponent<Components.IonRowAttributes>('ion-row');
export const IonCol = createReactComponent<Components.IonColAttributes>('ion-col');
export const IonSegment= createReactComponent<Components.IonSegmentAttributes>('ion-segment');
export const IonSegmentButton= createReactComponent<Components.IonSegmentButtonAttributes>('ion-segment-button');
export const IonSearchbar= createReactComponent<Components.IonSearchbarAttributes>('ion-searchbar');
export const IonRefresher= createReactComponent<Components.IonRefresherAttributes>('ion-refresher');
export const IonRefresherContent= createReactComponent<Components.IonRefresherContentAttributes>('ion-refresher-content');
export const IonFab= createReactComponent<Components.IonFabAttributes>('ion-fab');
export const IonFabList = createReactComponent<Components.IonFabListAttributes>('ion-fab-list');
export const IonFabButton= createReactComponent<Components.IonFabButtonAttributes>('ion-fab-button');
export const IonAvatar = createReactComponent<Components.IonAvatarAttributes>('ion-avatar');
export const IonCard = createReactComponent<Components.IonCardAttributes>('ion-card');
export const IonCardHeader = createReactComponent<Components.IonCardHeaderAttributes>('ion-card-header');
export const IonCardContent = createReactComponent<Components.IonCardContentAttributes>('ion-card-content');
export const IonTextarea = createReactComponent<Components.IonTextareaAttributes>('ion-textarea');
export const IonTabs = createReactComponent<Components.IonTabsAttributes>('ion-tabs');
export const IonTab = createReactComponent<Components.IonTabAttributes>('ion-tab');
export const IonTabBar = createReactComponent<Components.IonTabBarAttributes>('ion-tab-bar');
export const IonTabButton = createReactComponent<Components.IonTabButtonAttributes>('ion-tab-button');
export const IonSlides = createReactComponent<Components.IonSlidesAttributes>('ion-slides');
export const IonSlide = createReactComponent<Components.IonSlideAttributes>('ion-slide');
export const IonSplitPane = createReactComponent<Components.IonSplitPaneAttributes>('ion-split-pane');
export const IonMenuToggle = createReactComponent<Components.IonMenuToggleAttributes>('ion-menu-toggle');
