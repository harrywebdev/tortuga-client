import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    cart: service(),
    orderState: service(),
    store: service(),

    actions: {
        submitOrder(changeset) {
            changeset.save();

            const customer = this.orderState.get('customer');
            if (!customer.get('name') && changeset.get('name')) {
                customer.set('name', changeset.get('name'));
            }

            // TODO: currency based on locale
            const order = this.store.createRecord('order', {
                customer,
                delivery_type: 'pickup',
                payment_type: 'cash',
                pickup_time: changeset.get('pickupTime'),
            });

            const orderItems = this.orderState.get('orderItems').map(orderLineItem => {
                const orderItem = this.store.createRecord('order-item', {
                    order,
                    product_variation_id: orderLineItem.variationId,
                    quantity: orderLineItem.quantity,
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
