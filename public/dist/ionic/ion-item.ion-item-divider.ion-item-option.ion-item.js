/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.defineComponents(

/**** module id (dev mode) ****/
'ion-item.ion-item-divider.ion-item-option.ion-item',

/**** component modules ****/
function importComponent(exports, h, t, Core, publicPath) {
function createThemedClasses(mode, color, classList) {
    var allClassObj = {};
    return classList.split(' ')
        .reduce(function (classObj, classString) {
        classObj[classString] = true;
        if (mode) {
            classObj[classString + "-" + mode] = true;
            if (color) {
                classObj[classString + "-" + color] = true;
                classObj[classString + "-" + mode + "-" + color] = true;
            }
        }
        return classObj;
    }, allClassObj);
}

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Item = (function () {
    function Item() {
        this.childStyles = Object.create(null);
        // _ids: number = -1;
        // _inputs: Array<string> = [];
        // _label: Label;
        // _viewLabel: boolean = true;
        // _name: string = 'item';
        // _hasReorder: boolean;
        // /**
        //  * @hidden
        //  */
        // id: string;
        // /**
        //  * @hidden
        //  */
        // labelId: string = null;
        // constructor(
        //   form: Form,
        //   config: Config,
        //   elementRef: ElementRef,
        //   renderer: Renderer,
        //   @Optional() reorder: ItemReorder
        // ) {
        //   super(config, elementRef, renderer, 'item');
        //   this._setName(elementRef);
        //   this._hasReorder = !!reorder;
        //   this.id = form.nextId().toString();
        //   // auto add "tappable" attribute to ion-item components that have a click listener
        //   if (!(<any>renderer).orgListen) {
        //     (<any>renderer).orgListen = renderer.listen;
        //     renderer.listen = function(renderElement: HTMLElement, name: string, callback: Function): Function {
        //       if (name === 'click' && renderElement.setAttribute) {
        //         renderElement.setAttribute('tappable', '');
        //       }
        //       return (<any>renderer).orgListen(renderElement, name, callback);
        //     };
        //   }
        // }
        // /**
        //  * @hidden
        //  */
        // registerInput(type: string) {
        //   this._inputs.push(type);
        //   return this.id + '-' + (++this._ids);
        // }
        // /**
        //  * @hidden
        //  */
        // ngAfterContentInit() {
        //   if (this._viewLabel && this._inputs.length) {
        //     let labelText = this.getLabelText().trim();
        //     this._viewLabel = (labelText.length > 0);
        //   }
        //   if (this._inputs.length > 1) {
        //     this.setElementClass('item-multiple-inputs', true);
        //   }
        // }
        // /**
        //  * @hidden
        //  */
        // _updateColor(newColor: string, componentName?: string) {
        //   componentName = componentName || 'item'; // item-radio
        //   this._setColor(newColor, componentName);
        // }
        // /**
        //  * @hidden
        //  */
        // _setName(elementRef: ElementRef) {
        //   let nodeName = elementRef.nativeElement.nodeName.replace('ION-', '');
        //   if (nodeName === 'LIST-HEADER' || nodeName === 'ITEM-DIVIDER') {
        //     this._name = nodeName;
        //   }
        // }
        // /**
        //  * @hidden
        //  */
        // getLabelText(): string {
        //   return this._label ? this._label.text : '';
        // }
        // /**
        //  * @hidden
        //  */
        // @ContentChild(Label)
        // set contentLabel(label: Label) {
        //   if (label) {
        //     this._label = label;
        //     this.labelId = label.id = ('lbl-' + this.id);
        //     if (label.type) {
        //       this.setElementClass('item-label-' + label.type, true);
        //     }
        //     this._viewLabel = false;
        //   }
        // }
        // /**
        //  * @hidden
        //  */
        // @ViewChild(Label)
        // set viewLabel(label: Label) {
        //   if (!this._label) {
        //     this._label = label;
        //   }
        // }
        // /**
        //  * @hidden
        //  */
        // @ContentChildren(Button)
        // set _buttons(buttons: QueryList<Button>) {
        //   buttons.forEach(button => {
        //     if (!button._size) {
        //       button.setElementClass('item-button', true);
        //     }
        //   });
        // }
        // /**
        //  * @hidden
        //  */
        // @ContentChildren(Icon)
        // set _icons(icons: QueryList<Icon>) {
        //   icons.forEach(icon => {
        //     icon.setElementClass('item-icon', true);
        //   });
        // }
    }
    Item.prototype.itemStyle = function (ev) {
        ev.stopPropagation();
        var hasChildStyleChange = false;
        var updatedStyles = ev.detail;
        for (var key in updatedStyles) {
            if (updatedStyles[key] !== this.childStyles['item-' + key]) {
                this.childStyles['item-' + key] = updatedStyles[key];
                hasChildStyleChange = true;
            }
        }
        // returning true tells the renderer to queue an update
        return hasChildStyleChange;
    };
    Item.prototype["componentDidLoad"] = function () {
        // Add item-button classes to each ion-button in the item
        var buttons = this.el.querySelectorAll('ion-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].itemButton = true;
        }
    };
    Item.prototype.render = function () {
        var themedClasses = __assign({}, this.childStyles, createThemedClasses(this.mode, this.color, 'item'), { 'item-block': true });
        // TODO add support for button items
        var TagType = this.href ? 'a' : 'div';
        return (h(TagType, { "c": themedClasses },
            h(0, { "a": { "name": 'start' } }),
            h("div", { "c": { "item-inner": true } },
                h("div", { "c": { "input-wrapper": true } },
                    h(0, 0)),
                h(0, { "a": { "name": 'end' } }))));
        // template:
        //   '<ng-content select="[slot="start"],ion-checkbox:not([slot="end"])"></ng-content>' +
        //   '<div class="item-inner">' +
        //     '<div class="input-wrapper">' +
        //       '<ng-content select="ion-label"></ng-content>' +
        //       '<ion-label *ngIf="_viewLabel">' +
        //         '<ng-content></ng-content>' +
        //       '</ion-label>' +
        //       '<ng-content select="ion-select,ion-input,ion-textarea,ion-datetime,ion-range,[item-content]"></ng-content>' +
        //     '</div>' +
        //     '<ng-content select="[slot="end"],ion-radio,ion-toggle"></ng-content>' +
        //     '<ion-reorder *ngIf="_hasReorder"></ion-reorder>' +
        //   '</div>' +
        //   '<div class="button-effect"></div>',
    };
    return Item;
}());

var ItemDivider = (function () {
    function ItemDivider() {
    }
    ItemDivider.prototype.render = function () {
        return [
            h(0, { "a": { "name": 'start' } }),
            h("div", { "c": { "item-inner": true } },
                h("div", { "c": { "input-wrapper": true } },
                    h(0, 0)),
                h(0, { "a": { "name": 'end' } }))
        ];
    };
    return ItemDivider;
}());

var ItemOption = (function () {
    function ItemOption() {
        /**
         * @Prop {boolean} If true, sets the button into a disabled state.
         */
        this.disabled = false;
    }
    ItemOption.prototype.notCaptured = function () {
        // if (!clickedOptionButton(ev)) {
        //   this.closeOpened();
        // }
    };
    ItemOption.prototype.clickedOptionButton = function (ev) {
        var ele = ev.target.closest('ion-item-option');
        return !!ele;
    };
    ItemOption.prototype.render = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, 'item-option-button');
        var TagType = this.href ? 'a' : 'button';
        return (h(TagType, { "c": themedClasses, "o": { "click": this.clickedOptionButton.bind(this) }, "a": { "disabled": this.disabled } },
            h("span", { "c": { "button-inner": true } },
                h(0, 0)),
            h("div", { "c": { "button-effect": true } })));
    };
    return ItemOption;
}());

/**
 * @hidden
 * Given a side, return if it should be on the right
 * based on the value of dir
 * @param side the side
 * @param isRTL whether the application dir is rtl
 * @param defaultRight whether the default side is right
 */
function isRightSide(side, isRTL, defaultRight) {
    if (defaultRight === void 0) { defaultRight = false; }
    switch (side) {
        case 'right': return true;
        case 'left': return false;
        case 'end': return !isRTL;
        case 'start': return isRTL;
        default: return defaultRight ? !isRTL : isRTL;
    }
}
/** @hidden */
function swipeShouldReset(isResetDirection, isMovingFast, isOnResetZone) {
    // The logic required to know when the sliding item should close (openAmount=0)
    // depends on three booleans (isCloseDirection, isMovingFast, isOnCloseZone)
    // and it ended up being too complicated to be written manually without errors
    // so the truth table is attached below: (0=false, 1=true)
    // isCloseDirection | isMovingFast | isOnCloseZone || shouldClose
    //         0        |       0      |       0       ||    0
    //         0        |       0      |       1       ||    1
    //         0        |       1      |       0       ||    0
    //         0        |       1      |       1       ||    0
    //         1        |       0      |       0       ||    0
    //         1        |       0      |       1       ||    1
    //         1        |       1      |       0       ||    1
    //         1        |       1      |       1       ||    1
    // The resulting expression was generated by resolving the K-map (Karnaugh map):
    var shouldClose = (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast);
    return shouldClose;
}

var ItemOptions = (function () {
    function ItemOptions() {
        /**
         * @input {string} The side the option button should be on. Defaults to `"right"`.
         * If you have multiple `ion-item-options`, a side must be provided for each.
         */
        this.side = 'right';
    }
    /**
     * @output {event} Emitted when the item has been fully swiped.
     */
    // @Event() ionSwipe: EventEmitter;
    /**
     * @hidden
     */
    ItemOptions.prototype.isRightSide = function () {
        var isRTL = document.dir === 'rtl';
        return isRightSide(this.side, isRTL, true);
    };
    /**
     * @hidden
     */
    ItemOptions.prototype.width = function () {
        return this.el.offsetWidth;
    };
    ItemOptions.prototype.render = function () {
        return h(0, 0);
    };
    return ItemOptions;
}());

// import { ItemOptions } from './item-options';
var SWIPE_MARGIN = 30;
var ELASTIC_FACTOR = 0.55;
var ITEM_SIDE_FLAG_NONE = 0;
var ITEM_SIDE_FLAG_LEFT = 1 << 0;
var ITEM_SIDE_FLAG_RIGHT = 1 << 1;
var ITEM_SIDE_FLAG_BOTH = ITEM_SIDE_FLAG_LEFT | ITEM_SIDE_FLAG_RIGHT;
var ItemSliding = (function () {
    function ItemSliding() {
        this.openAmount = 0;
        this.startX = 0;
        this.optsWidthRightSide = 0;
        this.optsWidthLeftSide = 0;
        this.tmr = null;
        this.optsDirty = true;
        this.state = 2 /* Disabled */;
        this.preSelectedContainer = null;
        this.selectedContainer = null;
        this.openContainer = null;
    }
    ItemSliding.prototype["componentDidLoad"] = function () {
        var options = this.el.querySelectorAll('ion-item-options');
        var sides = 0;
        // Reset left and right options in case they were removed
        this.leftOptions = this.rightOptions = null;
        for (var i = 0; i < options.length; i++) {
            var option = options[i].$instance;
            if (option.isRightSide()) {
                this.rightOptions = option;
                sides |= ITEM_SIDE_FLAG_RIGHT;
            }
            else {
                this.leftOptions = option;
                sides |= ITEM_SIDE_FLAG_LEFT;
            }
        }
        this.optsDirty = true;
        this.sides = sides;
        this.item = this.el.querySelector('ion-item');
        // Get the parent list to close open containers
        this.list = this.el.closest('ion-list');
    };
    ItemSliding.prototype.canStart = function (gesture) {
        if (this.selectedContainer) {
            return false;
        }
        // Get swiped sliding container
        var container = this;
        // Close open container if it is not the selected one.
        if (this.list && container !== this.list.$instance.openContainer) {
            this.closeOpened();
        }
        this.preSelectedContainer = container;
        this.firstCoordX = gesture.currentX;
        this.firstTimestamp = Date.now();
        return true;
    };
    ItemSliding.prototype.onDragStart = function (gesture) {
        this.selectedContainer = this.list.$instance.openContainer = this.preSelectedContainer;
        this.selectedContainer.startSliding(gesture.currentX);
    };
    ItemSliding.prototype.onDragMove = function (gesture) {
        this.selectedContainer && this.selectedContainer.moveSliding(gesture.currentX);
    };
    ItemSliding.prototype.onDragEnd = function (gesture) {
        var coordX = gesture.currentX;
        var deltaX = (coordX - this.firstCoordX);
        var deltaT = (Date.now() - this.firstTimestamp);
        this.selectedContainer.endSliding(deltaX / deltaT);
        this.selectedContainer = null;
        this.preSelectedContainer = null;
    };
    ItemSliding.prototype.closeOpened = function () {
        this.selectedContainer = null;
        if (this.list.$instance.openContainer) {
            this.list.$instance.closeSlidingItems();
            return true;
        }
        return false;
    };
    /**
     * @hidden
     */
    ItemSliding.prototype.getOpenAmount = function () {
        return this.openAmount;
    };
    /**
     * @hidden
     */
    ItemSliding.prototype.getSlidingPercent = function () {
        var openAmount = this.openAmount;
        if (openAmount > 0) {
            return openAmount / this.optsWidthRightSide;
        }
        else if (openAmount < 0) {
            return openAmount / this.optsWidthLeftSide;
        }
        else {
            return 0;
        }
    };
    /**
     * @hidden
     */
    ItemSliding.prototype.startSliding = function (startX) {
        if (this.tmr) {
            clearTimeout(this.tmr);
            this.tmr = null;
        }
        if (this.openAmount === 0) {
            this.optsDirty = true;
            this.setState(4 /* Enabled */);
        }
        this.startX = startX + this.openAmount;
        this.item.style.transition = 'none';
    };
    /**
     * @hidden
     */
    ItemSliding.prototype.moveSliding = function (x) {
        if (this.optsDirty) {
            this.calculateOptsWidth();
            return 0;
        }
        var openAmount = (this.startX - x);
        switch (this.sides) {
            case ITEM_SIDE_FLAG_RIGHT:
                openAmount = Math.max(0, openAmount);
                break;
            case ITEM_SIDE_FLAG_LEFT:
                openAmount = Math.min(0, openAmount);
                break;
            case ITEM_SIDE_FLAG_BOTH: break;
            case ITEM_SIDE_FLAG_NONE: return 0;
            default:
                console.warn('invalid ItemSideFlags value', this.sides);
                break;
        }
        if (openAmount > this.optsWidthRightSide) {
            var optsWidth = this.optsWidthRightSide;
            openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
        }
        else if (openAmount < -this.optsWidthLeftSide) {
            var optsWidth = -this.optsWidthLeftSide;
            openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
        }
        this.setOpenAmount(openAmount, false);
        return openAmount;
    };
    /**
     * @hidden
     */
    ItemSliding.prototype.endSliding = function (velocity) {
        var restingPoint = (this.openAmount > 0)
            ? this.optsWidthRightSide
            : -this.optsWidthLeftSide;
        // Check if the drag didn't clear the buttons mid-point
        // and we aren't moving fast enough to swipe open
        var isResetDirection = (this.openAmount > 0) === !(velocity < 0);
        var isMovingFast = Math.abs(velocity) > 0.3;
        var isOnCloseZone = Math.abs(this.openAmount) < Math.abs(restingPoint / 2);
        if (swipeShouldReset(isResetDirection, isMovingFast, isOnCloseZone)) {
            restingPoint = 0;
        }
        this.setOpenAmount(restingPoint, true);
        this.fireSwipeEvent();
        return restingPoint;
    };
    /**
     * @hidden
     * Emit the ionSwipe event on the child options
     */
    ItemSliding.prototype.fireSwipeEvent = function () {
        if (this.state & 32 /* SwipeRight */) {
            this.rightOptions.ionSwipe(this);
        }
        else if (this.state & 64 /* SwipeLeft */) {
            this.leftOptions.ionSwipe(this);
        }
    };
    /**
     * @hidden
     */
    ItemSliding.prototype.calculateOptsWidth = function () {
        if (!this.optsDirty) {
            return;
        }
        this.optsWidthRightSide = 0;
        if (this.rightOptions) {
            this.optsWidthRightSide = this.rightOptions.width();
            this.optsWidthRightSide == 0 && console.warn('optsWidthRightSide should not be zero');
        }
        this.optsWidthLeftSide = 0;
        if (this.leftOptions) {
            this.optsWidthLeftSide = this.leftOptions.width();
            this.optsWidthLeftSide == 0 && console.warn('optsWidthLeftSide should not be zero');
        }
        this.optsDirty = false;
    };
    ItemSliding.prototype.setOpenAmount = function (openAmount, isFinal) {
        var _this = this;
        if (this.tmr) {
            clearTimeout(this.tmr);
            this.tmr = null;
        }
        this.openAmount = openAmount;
        if (isFinal) {
            this.item.style.transition = '';
        }
        else {
            if (openAmount > 0) {
                var state = (openAmount >= (this.optsWidthRightSide + SWIPE_MARGIN))
                    ? 8 /* Right */ | 32 /* SwipeRight */
                    : 8;
                this.setState(state);
            }
            else if (openAmount < 0) {
                var state = (openAmount <= (-this.optsWidthLeftSide - SWIPE_MARGIN))
                    ? 16 /* Left */ | 64 /* SwipeLeft */
                    : 16;
                this.setState(state);
            }
        }
        if (openAmount === 0) {
            this.tmr = setTimeout(function () {
                _this.setState(2 /* Disabled */);
                _this.tmr = null;
            }, 600);
            this.item.style.transform = '';
            return;
        }
        this.item.style.transform = "translate3d(" + -openAmount + "px,0,0)";
        this.ionDrag.emit();
    };
    ItemSliding.prototype.setState = function (state) {
        if (state === this.state) {
            return;
        }
        this.state = state;
    };
    /**
     * Close the sliding item. Items can also be closed from the [List](../../list/List).
     *
     * The sliding item can be closed by grabbing a reference to `ItemSliding`. In the
     * below example, the template reference variable `slidingItem` is placed on the element
     * and passed to the `share` method.
     *
     * ```html
     * <ion-list>
     *   <ion-item-sliding #slidingItem>
     *     <ion-item>
     *       Item
     *     </ion-item>
     *     <ion-item-options>
     *       <ion-button (click)="share(slidingItem)">Share</ion-button>
     *     </ion-item-options>
     *   </ion-item-sliding>
     * </ion-list>
     * ```
     *
     * ```ts
     * import { Component } from '@angular/core';
     * import { ItemSliding } from 'ionic-angular';
     *
     * @Component({...})
     * export class MyClass {
     *   constructor() { }
     *
     *   share(slidingItem: ItemSliding) {
     *     slidingItem.close();
     *   }
     * }
     * ```
     */
    ItemSliding.prototype.close = function () {
        this.setOpenAmount(0, true);
    };
    ItemSliding.prototype.hostData = function () {
        return {
            class: {
                'item-wrapper': true,
                'active-slide': (this.state !== 2 /* Disabled */),
                'active-options-right': !!(this.state & 8 /* Right */),
                'active-options-left': !!(this.state & 16 /* Left */),
                'active-swipe-right': !!(this.state & 32 /* SwipeRight */),
                'active-swipe-left': !!(this.state & 64 /* SwipeLeft */)
            }
        };
    };
    ItemSliding.prototype.render = function () {
        return (h("ion-gesture", { "p": { "canStart": this.canStart.bind(this), "onStart": this.onDragStart.bind(this), "onMove": this.onDragMove.bind(this), "onEnd": this.onDragEnd.bind(this), "gestureName": 'item-swipe', "gesturePriority": -10, "type": 'pan', "direction": 'x', "maxAngle": 20, "threshold": 5, "attachTo": 'parent' } },
            h(0, 0)));
    };
    return ItemSliding;
}());

var Label = (function () {
    function Label() {
        /**
         * @output {event} If true, the label will sit alongside an input. Defaults to `false`.
         */
        this.fixed = false;
        /**
         * @output {event} If true, the label will float above an input when the value is empty or the input is focused. Defaults to `false`.
         */
        this.floating = false;
        /**
         * @output {event} If true, the label will be stacked above an input. Defaults to `false`.
         */
        this.stacked = false;
    }
    Label.prototype["componentDidLoad"] = function () {
        this.emitStyle();
    };
    Label.prototype.emitStyle = function () {
        var _this = this;
        clearTimeout(this.styleTmr);
        var styles = {
            'label-fixed': this.fixed,
            'label-floating': this.floating,
            'label-stacked': this.stacked
        };
        this.styleTmr = setTimeout(function () {
            _this.ionStyle.emit(styles);
        });
    };
    Label.prototype.render = function () {
        return h(0, 0);
    };
    return Label;
}());

var List = (function () {
    function List() {
    }
    List.prototype.render = function () {
        return h(0, 0);
    };
    /**
     * Close any sliding items that are open.
     */
    List.prototype.closeSlidingItems = function () {
        this.openContainer.close();
        this.openContainer = null;
    };
    return List;
}());

var ListHeader = (function () {
    function ListHeader() {
    }
    ListHeader.prototype.render = function () {
        return h(0, 0);
    };
    return ListHeader;
}());

var SkeletonText = (function () {
    function SkeletonText() {
        this.width = '100%';
    }
    SkeletonText.prototype.render = function () {
        return h("span", { "s": { "width": this.width } }, t("\u00A0"));
    };
    return SkeletonText;
}());

exports['ION-ITEM'] = Item;
exports['ION-ITEM-DIVIDER'] = ItemDivider;
exports['ION-ITEM-OPTION'] = ItemOption;
exports['ION-ITEM-OPTIONS'] = ItemOptions;
exports['ION-ITEM-SLIDING'] = ItemSliding;
exports['ION-LABEL'] = Label;
exports['ION-LIST'] = List;
exports['ION-LIST-HEADER'] = ListHeader;
exports['ION-SKELETON-TEXT'] = SkeletonText;
},


/***************** ion-item *****************/
[
/** ion-item: [0] tag **/
'ION-ITEM',

/** ion-item: [1] host **/
{},

/** ion-item: [2] states **/
0 /* no states */,

/** ion-item: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-item: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-item: [5] events **/
0 /* no events */,

/** ion-item: [6] methods **/
0 /* no methods */,

/** ion-item: [7] hostElementMember **/
'el'

],

/***************** ion-item-divider *****************/
[
/** ion-item-divider: [0] tag **/
'ION-ITEM-DIVIDER',

/** ion-item-divider: [1] host **/
{"theme":"item item-divider"}

],

/***************** ion-item-option *****************/
[
/** ion-item-option: [0] tag **/
'ION-ITEM-OPTION',

/** ion-item-option: [1] host **/
{}

],

/***************** ion-item-options *****************/
[
/** ion-item-options: [0] tag **/
'ION-ITEM-OPTIONS',

/** ion-item-options: [1] host **/
{},

/** ion-item-options: [2] states **/
0 /* no states */,

/** ion-item-options: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-item-options: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-item-options: [5] events **/
0 /* no events */,

/** ion-item-options: [6] methods **/
0 /* no methods */,

/** ion-item-options: [7] hostElementMember **/
'el'

],

/***************** ion-item-sliding *****************/
[
/** ion-item-sliding: [0] tag **/
'ION-ITEM-SLIDING',

/** ion-item-sliding: [1] host **/
{},

/** ion-item-sliding: [2] states **/
['state'],

/** ion-item-sliding: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-item-sliding: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-item-sliding: [5] events **/
[
  [
    /*****  ion-item-sliding ionDrag ***** /
    /* [0] event name ***/ 'ionDrag',
    /* [1] method name **/ 'ionDrag',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ]
],

/** ion-item-sliding: [6] methods **/
['close'],

/** ion-item-sliding: [7] hostElementMember **/
'el'

],

/***************** ion-label *****************/
[
/** ion-label: [0] tag **/
'ION-LABEL',

/** ion-label: [1] host **/
{"theme":"label"},

/** ion-label: [2] states **/
0 /* no states */,

/** ion-label: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-label: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-label: [5] events **/
[
  [
    /*****  ion-label ionStyle ***** /
    /* [0] event name ***/ 'ionStyle',
    /* [1] method name **/ 'ionStyle',
    /* [2] bubbles ******/ '1 /* true **/',
    /* [3] cancelable ***/ '1 /* true **/',
    /* [4] composed *****/ '1 /* true **/'
  ]
]

],

/***************** ion-list *****************/
[
/** ion-list: [0] tag **/
'ION-LIST',

/** ion-list: [1] host **/
{"theme":"list"},

/** ion-list: [2] states **/
['openContainer'],

/** ion-list: [3] propWillChanges **/
0 /* no prop will change methods */,

/** ion-list: [4] propDidChanges **/
0 /* no prop did change methods */,

/** ion-list: [5] events **/
0 /* no events */,

/** ion-list: [6] methods **/
['closeSlidingItems']

],

/***************** ion-list-header *****************/
[
/** ion-list-header: [0] tag **/
'ION-LIST-HEADER',

/** ion-list-header: [1] host **/
{"theme":"list-header"}

],

/***************** ion-skeleton-text *****************/
[
/** ion-skeleton-text: [0] tag **/
'ION-SKELETON-TEXT',

/** ion-skeleton-text: [1] host **/
{}

]
)