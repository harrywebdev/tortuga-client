import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Service.extend({
    cart: service(),

    // flags
    hasCartItems: computed('cart.items.[]', function() {
        return this.get('cart.items.length');
    }),

    isReadyForCustomerDetails: alias('hasCartItems'),

    orderHasBeenMade: computed(function() {
        return false;
    }),
});
