import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    cart: service('cart'),

    tagName: 'li',

    classNames: ['list-group-item', 'variation-line'],
    classNameBindings: ['countInCart:list-group-item-success'],

    click() {
        this.get('cart').addToCart(this.get('variation.id'));
    },

    countInCart: computed('cart.items.[]', function() {
        return this.get('cart').howMuchOf(this.get('variation.id'));
    }),

    actions: {
        removeFromCart() {
            this.get('cart').removeFromCart(this.get('variation.id'));
        },
    },
});
