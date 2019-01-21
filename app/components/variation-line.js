import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    cart: service('cart'),

    tagName: 'li',

    classNames: ['list-group-item', 'variation-line'],
    classNameBindings: ['countInCart:list-group-item-success'],

    // for Order Item
    readonly: false,

    click() {
        if (this.get('readonly') === true) {
            return;
        }
        this.get('cart').addToCart(this.get('variation.id'));
    },

    countInCart: computed('cart.items.[]', function() {
        if (this.get('readonly') === true) {
            return false;
        }

        return this.get('cart').howMuchOf(this.get('variation.id'));
    }),

    actions: {
        removeFromCart() {
            this.get('cart').removeFromCart(this.get('variation.id'));
        },
    },
});
