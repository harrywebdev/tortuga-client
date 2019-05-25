import EmberObject from '@ember/object';
import { computed } from '@ember/object';

export default EmberObject.extend({
    variationId: null,
    variationTitle: null,
    productTitle: null,
    variationPrice: null,
    quantity: null,

    title: computed('productTitle', 'variationTitle', 'quantity', function() {
        return `${this.get('productTitle')} - ${this.get('variationTitle')} x ${this.get('quantity')}`;
    }),

    totalPrice: computed('variationPrice', 'quantity', function() {
        return this.get('variationPrice') * this.get('quantity');
    }),

    formattedTotalPrice: computed('totalPrice', function() {
        return (this.get('totalPrice') / 100).toLocaleString('cs-CZ', {
            style: 'currency',
            currency: 'CZK',
            minimumFractionDigits: 0,
        });
    }),
});
