import { validatePresence, validateFormat } from 'ember-changeset-validations/validators';

export default {
    name: [validatePresence({ presence: true, message: 'Vyplnte jmeno.' })],
    email: [
        validatePresence({ presence: true, message: 'Vyplnte email.' }),
        validateFormat({ type: 'email', message: 'Neplatny format emailu.' }),
    ],
    mobile: validatePresence({ presence: true, message: 'Vyplnte cas vyzvednuti.' }),
    pickupTime: validateFormat({
        regex: /^([01][0-9]|2[0-3]):([0-5][0-9])$/,
        message: 'Cas v nespravnem formatu (format hh:mm, napr. 18:40)',
    }),
};
