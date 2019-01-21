import Service from '@ember/service';
import { computed } from '@ember/object';
import { storageFor } from 'ember-local-storage';

export default Service.extend({
    cart: storageFor('cart'),

    items: computed('cart.[]', function() {
        return this.get('cart.items');
    }).volatile(),

    addToCart(variationId) {
        let variation = this.findInCart(variationId);

        if (!variation) {
            let newItems = this.get('cart.items');
            newItems.push({ variation_id: variationId, quantity: 1 });
            this.get('cart').set('items', newItems);
            this.notifyPropertyChange('items');
            return;
        }

        const newItems = this.get('cart.items').map(item => {
            if (item.variation_id === variationId) {
                item.quantity += 1;
            }

            return item;
        });
        this.get('cart').set('items', newItems);
        this.notifyPropertyChange('items');
    },

    removeFromCart(variationId) {
        const variation = this.findInCart(variationId);

        if (!variation) {
            return;
        }

        const newItems = this.get('cart.items')
            .map(item => {
                if (item.variation_id === variationId) {
                    item.quantity -= 1;
                }

                return item;
            })
            .filter(item => item.quantity > 0);
        this.get('cart').set('items', newItems);
        this.notifyPropertyChange('items');
    },

    howMuchOf(variationId) {
        const variation = this.findInCart(variationId);

        return variation ? variation.quantity : 0;
    },

    findInCart(variationId) {
        const found = this.get('cart.items').filter(item => item.variation_id === variationId);

        if (!found.length) {
            return null;
        }

        return found[0];
    },
});
