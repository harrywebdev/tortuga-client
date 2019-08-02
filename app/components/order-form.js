import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import OrderOptionsValidation from 'tortuga-frontend/validations/order-options-validation';
import NameValidation from 'tortuga-frontend/validations/name-validation';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default class OrderFormComponent extends Component {
    @service customerManager;
    @service facebookLogin;
    @service flashMessages;
    @service kitchenState;
    @service orderState;
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
    isSubmitting = false;

    @computed('availableSlots.[]')
    get timeSlots() {
        return this.availableSlots.map(slot => {
            return {
                value: slot.slot,
                label: slot.slot,
            };
        });
    }

    @computed('identityVerified', 'isSubmitting', 'changesetOptions.isValid', 'orderState.hasCartItems')
    get isSubmitDisabled() {
        // submitting or no cart items
        if (this.isSubmitting || !this.orderState.hasCartItems) {
            return true;
        }

        // customer verified and pickup time filled - green light
        if (this.identityVerified && this.changesetOptions.isValid) {
            return false;
        }

        // fallback
        return true;
    }

    @computed('changesetName.isValid', 'orderState.hasCartItems')
    get isIdentityVerificationDisabled() {
        return !this.orderState.hasCartItems || !this.changesetName.isValid;
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

    onSubmit() {
        // pass thru
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
        this.customerManager
            .verifyCustomerViaAccountKit(registrationType, accountKitCode, this.changesetName.get('name'))
            .then(
                () => {
                    // nothing to do here
                },
                reason => {
                    // TODO: error reporting
                    console.error('Could not save customer', reason);
                    this.flashMessages.danger(
                        `Nepodařilo se ověření :( Zkuste to prosím znovu. Pokud problém přetrvává, dejte nám prosím vědět, až se u nás příště zastavíte ;)`
                    );
                }
            );
    }

    @action
    submit() {
        this.set('isSubmitting', true);
        this.changesetOptions.save();
        this.onSubmit(this.changesetOptions.get('orderTime'), this.changesetOptions.get('orderTakeaway'));
        this.set('isSubmitting', false);
    }
}
