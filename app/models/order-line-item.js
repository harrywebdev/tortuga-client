import { computed } from '@ember/object';

class OrderLineItem {
    constructor(variationId, variationTitle, productTitle, variationPrice, quantity) {
        this.variationId = variationId;
        this.variationTitle = variationTitle;
        this.productTitle = productTitle;
        this.variationPrice = parseInt(variationPrice, 10);
        this.quantity = parseInt(quantity, 10);

        Object.freeze(this);
    }

    @computed('productTitle', 'variationTitle')
    get title() {
        return `${this.productTitle} - ${this.variationTitle}`;
    }

    @computed('variationPrice', 'quantity')
    get totalPrice() {
        return this.variationPrice * this.quantity;
    }

    @computed('totalPrice')
    get formattedTotalPrice() {
        return (this.totalPrice / 100).toLocaleString('cs-CZ', {
            style: 'currency',
            currency: 'CZK',
            minimumFractionDigits: 0,
        });
    }
}

export default OrderLineItem;
