import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Order from 'tortuga-frontend/models/order';
import OrderValidation from 'tortuga-frontend/validations/order';

export default Controller.extend(OrderValidation, {
    cart: service(),
    orderState: service(),

    order: null,
    OrderValidation: OrderValidation,

    init() {
        this._super(...arguments);
        this.order = new Order();
    },

    actions: {
        submitOrder(changeset) {
            changeset.save();
            return changeset.get('data');
        },

        rollbackOrder(changeset) {
            return changeset.rollback();
        },
    },
});
