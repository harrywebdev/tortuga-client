import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            categories: this.store.findAll('category'),
            products: this.store.findAll('product', { include: 'variations' }),
        });
    },
});
