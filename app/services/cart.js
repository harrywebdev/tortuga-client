import Service from '@ember/service';
import { computed } from '@ember/object';
import { storageFor } from 'ember-local-storage';
import CartItem from 'tortuga-frontend/models/cart-item';

export default class CartService extends Service {
    @storageFor('cart-items') cartItems;

    @computed('cartItems.[]')
    get items() {
        return this.cartItems;
    }

    @computed('cartItems.[]')
    get orderedItems() {
        return this.cartItems.sortBy('sequence');
    }

    @computed('items.[]')
    get totalQuantity() {
        return this.items.reduce((acc, item) => {
            acc += item.quantity;
            return acc;
        }, 0);
    }

    addToCart(variationId) {
        const cartItem = this._findInCart(variationId);

        // first of its kind
        if (!cartItem) {
            return this.cartItems.addObject(new CartItem(variationId, 1, this._getLastSequence() + 1));
        }

        const newCartItem = new CartItem(cartItem.productVariationId, cartItem.quantity + 1, cartItem.sequence);

        this.cartItems.removeObject(cartItem);
        this.cartItems.addObject(newCartItem);
    }

    removeFromCart(variationId) {
        const cartItem = this._findInCart(variationId);

        if (!cartItem) {
            return;
        }

        const newCartItem = new CartItem(cartItem.productVariationId, cartItem.quantity - 1, cartItem.sequence);
        this.cartItems.removeObject(cartItem);

        if (newCartItem.quantity > 0) {
            this.cartItems.addObject(newCartItem);
        }
    }

    resetCart() {
        this.cartItems.clear();
    }

    howMuchOf(variationId) {
        const variation = this._findInCart(variationId);

        return variation ? variation.quantity : 0;
    }

    _findInCart(variationId) {
        const found = this.items.filter(item => item.productVariationId === variationId);

        if (!found.length) {
            return null;
        }

        return found[0];
    }

    _getLastSequence() {
        return this.orderedItems.length ? this.orderedItems.get('lastObject.sequence') : 0;
    }
}
