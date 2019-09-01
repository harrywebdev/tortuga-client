import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    @service flashMessages;
    @service kitchenState;
    @service orderState;
    @service products;
    @service slots;
    @service websocket;

    beforeModel() {
        super.beforeModel(...arguments);

        this.websocket.connect();
        this.orderState.resetOrder();
    }

    model() {
        return RSVP.hash({
            categories: this.store.findAll('category'),
            products: this.store.findAll('product', { include: 'variations' }),
            slots: this.store.findAll('slot'),
        });
    }

    afterModel(model) {
        super.afterModel(...arguments);
        this.products.setProducts(model.products);
        this.slots.setSlots(model.slots);

        this._susbcribeToKitchen();

        if (!model.slots.length) {
            this.kitchenState.closeShop();
        }
    }

    resetController(controller) {
        super.resetController(...arguments);

        controller.set('currentTab', 'tabMenu');
    }

    /**
     * Listen on socket `kitchen.opened` events that open the shop
     * Don't close the shop on purpose (might be unnecessarily puttting
     * off a customer)
     */
    _susbcribeToKitchen() {
        this.websocket.subscribe('kitchen', [
            {
                eventName: 'kitchen.opened',
                eventHandler: () => {
                    this.slots.reloadSlots().then(slots => {
                        if (slots && slots.length) {
                            this.kitchenState.openShop();
                            this.flashMessages.clearMessages();
                        }
                    });
                },
            },
        ]);
    }
}
