import EmberObject from '@ember/object';
import { computed } from '@ember/object';

export default EmberObject.extend({
    variationId: null,
    variationTitle: null,
    productTitle: null,
    variationPrice: null,
    quantity: null,

    title: computed('productTitle', 'variationTitle', 'quantity', function() {
        return `${this.productTitle} - ${this.variationTitle} x ${this.quantity}`;
    }),

    totalPrice: computed('variationPrice', 'quantity', function() {
        return this.variationPrice * this.quantity;
    }),

    formattedTotalPrice: computed('totalPrice', function() {
        return (this.totalPrice / 100).toLocaleString('cs-CZ', {
            style: 'currency',
            currency: 'CZK',
            minimumFractionDigits: 0,
        });
    }),
});
