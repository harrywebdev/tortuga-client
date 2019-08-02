import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    @service products;
    @service slots;
    @service kitchenState;

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

        if (!model.slots.length) {
            this.kitchenState.closeShop();
        }
    }

    resetController(controller) {
        super.resetController(...arguments);

        controller.set('currentTab', 'tabMenu');
    }
}
