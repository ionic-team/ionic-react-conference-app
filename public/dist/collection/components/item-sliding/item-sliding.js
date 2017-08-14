import { swipeShouldReset } from '../../utils/helpers';
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
            this.rightOptions.ionSwipe.emit(this);
        }
        else if (this.state & 64 /* SwipeLeft */) {
            this.leftOptions.ionSwipe.emit(this);
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
                    : 8 /* Right */;
                this.setState(state);
            }
            else if (openAmount < 0) {
                var state = (openAmount <= (-this.optsWidthLeftSide - SWIPE_MARGIN))
                    ? 16 /* Left */ | 64 /* SwipeLeft */
                    : 16 /* Left */;
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
export { ItemSliding };
