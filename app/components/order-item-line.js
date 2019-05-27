import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    cart: service('cart'),

    tagName: 'li',

    classNames: ['list-group-item', 'variation-line'],
    classNameBindings: ['countInCart:list-group-item-success'],

    actions: {
        removeFromCart() {
            this.cart.removeFromCart(this.get('orderItem.variationId'));
        },
    },
});
