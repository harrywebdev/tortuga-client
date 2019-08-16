import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import OrderOptionsValidation from 'tortuga-frontend/validations/order-options-validation';
import NameValidation from 'tortuga-frontend/validations/name-validation';

export default class OrderFormComponent extends Component {
    @service appLogger;
    @service cart;
    @service customerManager;
    @service facebookLogin;
    @service flashMessages;
    @service kitchenState;
    @service orderState;
    @service router;
    @service slots;
    @service store;

    classNames = ['order-form'];

    constructor() {
        super(...arguments);

        // default validation is against mobile customer
        this._setVerificationType('mobile');
    }

    didInsertElement() {
        super.didInsertElement(...arguments);

        this.changesetOptions.validate();
        this.changesetName.validate();
    }

    didReceiveAttrs() {
        super.didReceiveAttrs(...arguments);

        // when available slots change, check whether time
        // has been picked before -> alert customer
        if (this.changesetOptions.get('orderTime')) {
            this.changesetOptions.set('orderTime', null);
            this.changesetOptions.validate();
        }
    }

    availableSlots = [];
    yesNoOptions = [{ value: '1', label: 'Ano' }, { value: '0', label: 'Ne' }];

    @computed('availableSlots.[]')
    get timeSlots() {
        return this.availableSlots.map(slot => {
            return {
                value: slot.slot,
                label: slot.slot,
            };
        });
    }

    @computed('identityVerified', 'submitForm.isRunning', 'changesetOptions.isValid', 'orderState.hasCartItems')
    get isSubmitDisabled() {
        // submitting or no cart items
        if (this.submitForm.isRunning || !this.orderState.hasCartItems) {
            return true;
        }

        // customer verified and pickup time filled - green light
        if (this.identityVerified && this.changesetOptions.isValid) {
            return false;
        }

        // fallback
        return true;
    }

    @computed('changesetName.isValid', 'orderState.hasCartItems', 'verifyCustomer.isRunning')
    get isIdentityVerificationDisabled() {
        return !this.orderState.hasCartItems || !this.changesetName.isValid || this.verifyCustomer.isRunning;
    }

    @computed('orderState.orderItems')
    get orderItems() {
        return this.orderState.orderItems;
    }

    @alias('orderState.hasIdentityVerified') identityVerified;
    @alias('orderState.customer.isFacebookLoginCustomer') isVerifiedViaFacebook;
    @alias('orderState.customer.isMobileCustomer') isVerifiedViaMobile;

    @alias('changesetOptions.orderTime') isOrderTimePicked;
    @alias('changesetName.name') isNameFilled;

    _scrollToTop() {
        document.getElementById('header').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }

    _setVerificationType(verificationType) {
        // mobile - requires pickup time and name
        if (verificationType === 'mobile') {
            this.set(
                'changesetOptions',
                new Changeset(
                    { orderTime: '', orderTakeaway: '' },
                    lookupValidator(OrderOptionsValidation),
                    OrderOptionsValidation
                )
            );

            this.set(
                'changesetName',
                new Changeset(
                    {
                        name: this.identityVerified ? this.orderState.customer.name : null,
                    },
                    lookupValidator(NameValidation),
                    NameValidation
                )
            );

            this.changesetOptions.validate();
            this.changesetName.validate();
        }
    }

    @action
    resetCustomer() {
        this.customerManager.resetCustomer();
    }

    @action
    verifyAccountKitCustomer(registrationType, accountKitCode) {
        this.verifyCustomer.perform(registrationType, accountKitCode);
    }

    @(task(function*(registrationType, accountKitCode) {
        try {
            yield this.customerManager.verifyCustomerViaAccountKit(
                registrationType,
                accountKitCode,
                this.changesetName.get('name')
            );
        } catch (reason) {
            let serverError = null;
            if (reason.errors && reason.errors.length) {
                serverError = JSON.stringify(reason.errors[0]);
            }

            this.appLogger.error(reason, true, serverError);
            this.flashMessages.danger(
                `Nepodařilo se ověření :( Zkuste to prosím znovu. Pokud problém přetrvává, dejte nám prosím vědět, až se u nás příště zastavíte.`
            );
        }
    }).drop())
    verifyCustomer;

    @(task(function*() {
        this.changesetOptions.save();

        const customer = this.orderState.customer;

        // TODO: currency based on locale
        const order = this.store.createRecord('order', {
            customer,
            delivery_type: 'pickup',
            payment_type: 'cash',
            order_time: this.changesetOptions.get('orderTime'),
            is_takeaway: this.changesetOptions.get('orderTakeaway') * 1,
        });

        const orderItems = this.orderState.orderItems.map(orderLineItem => {
            const orderItem = this.store.createRecord('order-item', {
                order,
                product_variation_id: orderLineItem.variationId,
                quantity: orderLineItem.quantity,
            });

            return orderItem;
        });

        order.items.pushObjects(orderItems);

        try {
            const savedOrder = yield order.save();

            this.orderState.updateOrder(savedOrder);
            this.cart.resetCart();

            this._scrollToTop();
            this.flashMessages.clearMessages();

            this.router.transitionTo('confirmation');
        } catch (reason) {
            if (reason.errors.length && reason.errors[0].status === 409) {
                this.flashMessages.danger(
                    `Je nám líto, ale vybraný čas se mezitím už zaplnil :( Vyberte prosím nový před odesláním objednávky.`
                );
                this.slots.reloadSlots();
                this.appLogger.log('Order not saved - no slots.', JSON.stringify(reason.errors[0]));
                return;
            }

            let serverError = null;
            if (reason.errors && reason.errors.length) {
                serverError = JSON.stringify(reason.errors[0]);
            }

            this.appLogger.error(reason, true, serverError);
            this.flashMessages.danger(
                `Nepodařilo se dokončit objednávku :( Zkuste to prosím znovu. Pokud problém přetrvává, dejte nám prosím vědět, až se u nás příště zastavíte.`
            );
        }
    }).drop())
    submitForm;

    @action
    submitOrder() {
        this.submitForm.perform();
    }
}
