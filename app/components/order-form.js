import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, equal, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import OrderValidation from 'tortuga-frontend/validations/order-validation';
import MobileCustomerOrderValidation from 'tortuga-frontend/validations/mobile-customer-order-validation';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default Component.extend({
    customerManager: service(),
    facebookLogin: service(),
    orderState: service(),
    store: service(),

    classNames: ['order-form'],

    init() {
        this._super(...arguments);
        this.changeset = new Changeset({ pickupTime: null }, lookupValidator(OrderValidation), OrderValidation);
    },

    didInsertElement() {
        this._super(...arguments);
        this.get('changeset').validate();
    },

    isSubmitting: false,
    isSubmitDisabled: computed(
        'identityVerified',
        'isSubmitting',
        'changeset.isValid',
        'orderState.hasCartItems',
        function() {
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
    ),

    inputChangeset: alias('changeset'),
    orderItems: computed('orderState.orderItems', function() {
        return this.orderState.get('orderItems');
    }),

    verificationType: null,
    identityVerified: alias('orderState.hasIdentityVerified'),
    hasCustomerName: alias('orderState.customer.name'),
    hasCustomerMobile: alias('orderState.customer.mobile_number'),

    isPickupTimeSelected: computed('changeset.{pickupTime,isValid}', 'showVerificationSelect', function() {
        return this.changeset.get('pickupTime') && this.changeset.get('isValid') && !this.get('showVerificationSelect');
    }),

    hasPickupTimeMissing: not('isPickupTimeSelected'),

    showVerificationSelect: equal('verificationType', null),
    showMobileVerification: equal('verificationType', 'mobile'),

    onSubmit() {
        //
    },

    _setVerificationType(verificationType) {
        this.set('verificationType', verificationType);

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
                new Changeset(
                    { pickupTime: null },
                    lookupValidator(OrderValidation),
                    OrderValidation
                )
            );
            this.get('changeset').validate();
        }
    },

    actions: {
        resetCustomer() {
            this.customerManager.resetCustomer();
        },

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
        },

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
        },
    },
});
