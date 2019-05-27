import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    products: service(),

    model() {
        return RSVP.hash({
            categories: this.store.findAll('category'),
            products: this.store.findAll('product', { include: 'variations' }),
        });
    },

    afterModel(model) {
        this._super(...arguments);
        this.products.setProducts(model.products);
    },
});
