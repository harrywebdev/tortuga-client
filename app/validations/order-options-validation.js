import { validatePresence, validateFormat } from 'ember-changeset-validations/validators';

export default {
    orderTime: [
        validatePresence({ presence: true, message: 'Vyberte čas vyzvednutí.' }),
        validateFormat({
            regex: /^([01][0-9]|2[0-3]):([0-5][0-9])$/,
            message: 'Čas v nesprávném formátu (formát hh:mm, např. 18:40)',
        }),
    ],
    orderTakeaway: [validatePresence({ presence: true, message: 'Vyberte zda-li chcete jídlo s sebou nebo ne.' })],
};
