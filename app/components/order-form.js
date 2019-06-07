import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import OrderValidation from 'tortuga-frontend/validations/order-validation';
import MobileCustomerOrderValidation from 'tortuga-frontend/validations/mobile-customer-order-validation';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default class OrderFormComponent extends Component {
    @service customerManager;
    @service facebookLogin;
    @service orderState;
    @service store;

    classNames = ['order-form'];

    constructor() {
        super(...arguments);
        this.changeset = new Changeset({ pickupTime: null }, lookupValidator(OrderValidation), OrderValidation);
    }

    didInsertElement() {
        super.didInsertElement(...arguments);
        this.get('changeset').validate();
    }

    isSubmitting = false;
    @computed('identityVerified', 'isSubmitting', 'changeset.isValid', 'orderState.hasCartItems')
    get isSubmitDisabled() {
        // submitting or no cart items
        if (this.get('isSubmitting') || !this.get('orderState.hasCartItems')) {
            return true;
        }

        // customer verified and pickup time filled - green light
        if (this.get('identityVerified') && this.get('changeset.isValid')) {
            return false;
        }

        // fallback
        return true;
    }

    @alias('changeset') inputChangeset;

    @computed('orderState.orderItems')
    get orderItems() {
        return this.orderState.get('orderItems');
    }

    @alias('orderState.hasIdentityVerified') identityVerified;
    @alias('orderState.customer.isFacebookLoginCustomer') isVerifiedViaFacebook;
    @alias('orderState.customer.isMobileCustomer') isVerifiedViaMobile;

    onSubmit() {
        // pass thru
    }

    _setVerificationType(verificationType) {
        // mobile - requires pickup time and name
        if (verificationType === 'mobile') {
            this.set(
                'changeset',
                new Changeset(
                    { pickupTime: null, name: null },
                    lookupValidator(MobileCustomerOrderValidation),
                    MobileCustomerOrderValidation
                )
            );
            this.get('changeset').validate();
        } else {
            // facebook - requires only pickup time
            this.set(
                'changeset',
                new Changeset({ pickupTime: null }, lookupValidator(OrderValidation), OrderValidation)
            );
            this.get('changeset').validate();
        }
    }

    @action
    resetCustomer() {
        this.customerManager.resetCustomer();
    }

    @action
    verifyAccountKitCustomer(registrationType, accountKitCode) {
        this.customerManager.verifyCustomerViaAccountKit(registrationType, accountKitCode).then(
            () => {
                this._setVerificationType('mobile');
            },
            reason => {
                // TODO: error reporting
                console.error('Could not save customer', reason);
            }
        );
    }

    @action
    verifyFacebookLoginCustomer(accessToken) {
        this.customerManager.verifyCustomerViaFacebookLogin(accessToken).then(
            () => {
                this._setVerificationType('facebook');
            },
            reason => {
                // TODO: error reporting
                console.error('Could not save customer', reason);
            }
        );
    }

    @action
    submit(changeset) {
        this.set('isSubmitting', true);
        this.onSubmit(changeset);
        this.set('isSubmitting', false);
    }
}
