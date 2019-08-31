import { validatePresence } from 'ember-changeset-validations/validators';
import validateCheckbox from 'tortuga-frontend/validations/checkbox-validator';

export default {
    orderTime: [validatePresence({ presence: true, message: 'Vyberte čas vyzvednutí.' })],
    tosAgreement: validateCheckbox({ message: 'Musíte souhlasit s podmínkami služby.' }),
    orderTakeaway: [validatePresence({ presence: true, message: 'Vyberte zda-li chcete jídlo s sebou nebo ne.' })],
};
