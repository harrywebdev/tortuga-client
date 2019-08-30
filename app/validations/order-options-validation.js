import { validatePresence } from 'ember-changeset-validations/validators';

export default {
    orderTime: [validatePresence({ presence: true, message: 'Vyberte čas vyzvednutí.' })],
    orderTakeaway: [validatePresence({ presence: true, message: 'Vyberte zda-li chcete jídlo s sebou nebo ne.' })],
};
