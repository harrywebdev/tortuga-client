import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import OrderValidation from 'tortuga-frontend/validations/order';

export default Controller.extend(OrderValidation, {
    cart: service(),
    orderState: service(),
    store: service(),

    order: null,
    OrderValidation: OrderValidation,

    init() {
        this._super(...arguments);
        this.order = {
            name: null,
            pickupTime: null,
        };
    },

    actions: {
        submitOrder(changeset) {
            changeset.save();

            const customer = this.orderState.get('customer');

            // TODO: currency based on locale
            const order = this.store.createRecord('order', {
                customer,
                delivery_type: 'pickup',
                payment_type: 'cash',
                pickup_time: this.get('order.pickupTime'),
                subtotal_amount: this.orderState.totalPrice,
                delivery_amount: 0,
                extra_amount: 0,
                total_amount: this.orderState.totalPrice,
                currency: 'CZK',
            });

            const orderItems = this.orderState.get('orderItems').map(orderLineItem => {
                const orderItem = this.store.createRecord('order-item', {
                    order,
                    title: orderLineItem.title,
                    price: orderLineItem.variationPrice,
                    quantity: orderLineItem.quantity,
                    total_price: orderLineItem.totalPrice,
                    currency: 'CZK',
                });

                return orderItem;
            });

            order.get('items').pushObjects(orderItems);
            order.save().then(
                order => {
                    this.orderState.updateOrder(order);
                },
                reason => {
                    console.error('Order save failed', reason);
                }
            );
        },

        rollbackOrder(changeset) {
            return changeset.rollback();
        },
    },
});
