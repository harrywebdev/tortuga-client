import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    name: [
        validator('presence', {
            presence: true,
            message: 'Vyplnte jmeno.',
        }),
    ],
    email: [
        validator('presence', {
            presence: true,
            message: 'Vyplnte email.',
        }),
        validator('format', { type: 'email', message: 'Neplatny format emailu.' }),
    ],
    mobile: [
        validator('format', {
            type: 'number',
            message: 'Muze obsahovat pouze cisla.',
        }),
    ],
    pickup_time: [
        validator('presence', {
            presence: true,
            message: 'Vyplnte cas vyzvednuti.',
        }),
        validator('format', {
            regex: /^([01][0-9]|2[0-3]):([0-5][0-9])$/,
            message: 'Cas v nespravnem formatu (format hh:mm, napr. 21:35)',
        }),
    ],
});

export default Controller.extend(Validations, {
    cart: service(),
    orderState: service(),

    actions: {
        submitOrder(data) {
            // eslint-disable-next-line no-console
            console.info('submitting order...', data);

            // TODO: get [name, email, mobile, pickup_time, order items]
            // and POST them to Order endpoint on the API
        },
    },
});
