import Service from '@ember/service';
import { computed } from '@ember/object';
import { storageFor } from 'ember-local-storage';
import CartItem from 'tortuga-frontend/cart-item';

export default Service.extend({
    cartItems: storageFor('cart-items'),

    items: computed('cartItems.[]', function() {
        return this.cartItems;
    }),

    orderedItems: computed('cartItems.[]', function() {
        return this.cartItems.sortBy('sequence');
    }),

    totalQuantity: computed('items.[]', function() {
        return this.items.reduce((acc, item) => {
            acc += item.quantity;
            return acc;
        }, 0);
    }),

    addToCart(variationId) {
        const cartItem = this._findInCart(variationId);

        // first of its kind
        if (!cartItem) {
            return this.cartItems.addObject(new CartItem(variationId, 1, this._getLastSequence() + 1));
        }

        const newCartItem = new CartItem(cartItem.productVariationId, cartItem.quantity + 1, cartItem.sequence);

        this.cartItems.removeObject(cartItem);
        this.cartItems.addObject(newCartItem);
    },

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
    },

    howMuchOf(variationId) {
        const variation = this._findInCart(variationId);

        return variation ? variation.quantity : 0;
    },

    _findInCart(variationId) {
        const found = this.items.filter(item => item.productVariationId === variationId);

        if (!found.length) {
            return null;
        }

        return found[0];
    },

    _getLastSequence() {
        return this.get('orderedItems.length') ? this.get('orderedItems.lastObject.sequence') : 0;
    },
});
