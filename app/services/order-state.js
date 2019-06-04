import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import OrderLineItem from 'tortuga-frontend/models/order-line-item';

export default class OrderStateService extends Service {
    @service cart;
    @service products;

    customer = null;
    order = null;

    // flags
    @computed('cart.items.[]')
    get hasCartItems() {
        return this.cart.get('items.length');
    }

    @alias('hasCartItems') isReadyForCustomerDetails;

    @computed('customer')
    get hasIdentityVerified() {
        return this.customer !== null;
    }

    @computed('order')
    get orderHasBeenMade() {
        return this.order !== null;
    }

    @computed('orderItems.[]')
    get totalPrice() {
        return this.orderItems.reduce((acc, orderItem) => {
            acc += orderItem.totalPrice;
            return acc;
        }, 0);
    }

    @computed('totalPrice')
    get formattedTotalPrice() {
        // TODO: currency etc based on locale
        return (this.totalPrice / 100).toLocaleString('cs-CZ', {
            style: 'currency',
            currency: 'CZK',
            minimumFractionDigits: 0,
        });
    }

    @computed('cart.orderedItems.[]', 'products.products.[]')
    get orderItems() {
        const products = this.products.get('products');
        return this.cart.get('orderedItems').map(item => {
            let productInCart = products.filter(product => {
                return product.variations.filter(variation => variation.id === item.productVariationId).length;
            });

            if (!productInCart.length) {
                // TODO: report error, filter this item out, handle empty cart if that happens
                throw new Error(
                    `CartItem with productVariationId: ${item.productVariationId} not found in products of length ${
                        products.length
                    }`
                );
            }

            productInCart = productInCart[0];
            const variation = productInCart.variations.filter(variation => variation.id === item.productVariationId)[0];

            let orderItem = new OrderLineItem(
                variation.get('id'),
                variation.get('title'),
                productInCart.get('title'),
                variation.get('price'),
                item.quantity
            );

            return orderItem;
        });
    }

    updateCustomer(customer) {
        this.set('customer', customer);
    }

    resetCustomer() {
        this.set('customer', null);
    }

    updateOrder(order) {
        this.set('order', order);
    }
}
