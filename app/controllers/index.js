import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IndexController extends Controller {
    @service cart;
    @service customerManager;
    @service kitchenState;
    @service orderState;
    @service store;

    currentTab = 'tabMenu';

    @action
    selectTab(tab) {
        this.set('currentTab', tab);
        document.getElementById('header').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }

    @action
    submitOrder(orderTime, orderTakeaway) {
        const customer = this.orderState.get('customer');

        // TODO: currency based on locale
        const order = this.store.createRecord('order', {
            customer,
            delivery_type: 'pickup',
            payment_type: 'cash',
            order_time: orderTime,
            is_takeaway: orderTakeaway * 1,
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
                this.flashMessages.danger(
                    `Nepodařilo se dokončit objednávku :( Zkuste to prosím znovu. Pokud problém přetrvává, dejte nám prosím vědět, až se u nás příště zastavíte ;)`
                );
            }
        );
    }

    @action
    reset() {
        this.orderState.resetOrder();
        this.set('currentTab', 'tabMenu');
    }
}
