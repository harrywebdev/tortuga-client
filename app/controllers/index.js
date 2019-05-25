import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';
import OrderItem from 'tortuga-frontend/models/order-item';

const Validations = buildValidations({
    name: [
        validator('presence', {
            presence: true,
            message: 'Vyplnte jmeno.',
        }),
    ],
    email: [
        validator('presence', {
            presence: true,
            message: 'Vyplnte email.',
        }),
        validator('format', { type: 'email', message: 'Neplatny format emailu.' }),
    ],
    mobile: [
        validator('format', {
            type: 'number',
            message: 'Muze obsahovat pouze cisla.',
        }),
    ],
    pickup_time: [
        validator('presence', {
            presence: true,
            message: 'Vyplnte cas vyzvednuti.',
        }),
        validator('format', {
            regex: /^([01][0-9]|2[0-3]):([0-5][0-9])$/,
            message: 'Cas v nespravnem formatu (format hh:mm, napr. 21:35)',
        }),
    ],
});

export default Controller.extend(Validations, {
    cart: service(),
    orderState: service(),

    name: null,
    email: null,
    mobile: '',
    pickup_time: null,

    orderSummary: computed('cart.items.[]', 'model.products', function() {
        const variations = this.get('model.products').reduce((acc, product) => {
            acc = [...acc, ...product.variations.toArray()];
            return acc;
        }, []);

        const summary = this.get('cart.items').map(item => {
            const variation = variations.filter(variation => variation.id === item.productVariationId)[0];
            let orderItem = OrderItem.create({
                title: `${variation.title} × ${item.quantity}`,
                price: variation.price * item.quantity,
            });

            orderItem.formattedPrice = (orderItem.price / 100).toLocaleString('cs-CZ', {
                style: 'currency',
                currency: 'CZK',
                minimumFractionDigits: 0,
            });

            return orderItem;
        });

        return summary;
    }),

    actions: {
        submitOrder() {
            console.log("submitting order...");

            // TODO: get [name, email, mobile, pickup_time, order items]
            // and POST them to Order endpoint on the API
        },
    },
});
