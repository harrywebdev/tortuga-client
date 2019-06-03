import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import OrderItem from 'tortuga-frontend/models/order-item';

export default Service.extend({
    cart: service(),
    products: service(),

    customer: null,

    // flags
    hasCartItems: computed('cart.items.[]', function() {
        return this.get('cart.items.length');
    }),

    isReadyForCustomerDetails: alias('hasCartItems'),

    hasIdentityVerified: computed('customer', function() {
        return this.get('customer') !== null;
    }),

    orderHasBeenMade: computed(function() {
        return false;
    }),

    //
    orderItems: computed('cart.orderedItems.[]', 'products.products.[]', function() {
        const products = this.get('products.products');
        return this.get('cart.orderedItems').map(item => {
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

            let orderItem = new OrderItem(
                variation.get('id'),
                variation.get('title'),
                productInCart.get('title'),
                variation.get('price'),
                item.quantity
            );

            return orderItem;
        });
    }),

    updateCustomer(customer) {
        this.set('customer', customer);
    },

    resetCustomer() {
        this.set('customer', null);
    },
});
