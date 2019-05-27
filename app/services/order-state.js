import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import OrderItem from 'tortuga-frontend/models/order-item';

export default Service.extend({
    cart: service(),
    products: service(),

    // flags
    hasCartItems: computed('cart.items.[]', function() {
        return this.get('cart.items.length');
    }),

    isReadyForCustomerDetails: alias('hasCartItems'),

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

            let orderItem = OrderItem.create({
                variationId: variation.get('id'),
                variationTitle: variation.get('title'),
                variationPrice: variation.get('price'),
                productTitle: productInCart.get('title'),
                quantity: item.quantity,
            });

            return orderItem;
        });
    }),
});
