import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    cart: service(),
    customerManager: service(),
    orderState: service(),
    store: service(),

    currentTab: 'tabMenu',

    actions: {
        selectTab(tab) {
            this.set('currentTab', tab);
        },

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
                order_time: changeset.get('orderTime'),
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
                    this.set('currentTab', 'tabConfirmation');
                    this.cart.resetCart();
                },
                reason => {
                    console.error('Order save failed', reason);
                }
            );
        },

        reset() {
            this.customerManager.resetCustomer();
            this.orderState.resetOrder();
            this.set('currentTab', 'tabMenu');
        },
    },
});
