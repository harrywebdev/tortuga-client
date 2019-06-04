import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
    customerManager: service(),
    facebookLogin: service(),
    orderState: service(),
    store: service(),

    classNames: ['order-form'],

    isSubmitting: false,
    isSubmitDisabled: computed(
        'identityVerified',
        'isSubmitting',
        'changeset.isInvalid',
        'orderState.hasCartItems',
        function() {
            return (
                this.isSubmitting ||
                !this.get('identityVerified') ||
                this.get('changeset.isInvalid') ||
                !this.get('orderState.hasCartItems')
            );
        }
    ),

    hasNameAndPickupTimeMissing: computed('changeset.isInvalid', function() {
        return this.changeset.get('isInvalid');
    }),

    orderItems: computed('orderState.orderItems', function() {
        return this.orderState.get('orderItems');
    }),

    inputChangeset: alias('changeset'),

    identityVerified: alias('orderState.hasIdentityVerified'),

    didInsertElement() {
        this._super(...arguments);
        this.changeset.validate();
    },

    onSubmit() {
        //
    },

    actions: {
        resetCustomer() {
            this.customerManager.resetCustomer().then(() => {
                this.changeset.set('name', '');
            });
        },

        verifyAccountKitCustomer(registrationType, accountKitCode) {
            this.customerManager.verifyCustomerViaAccountKit(registrationType, accountKitCode).catch(reason => {
                // TODO: error reporting
                console.error('Could not save customer', reason);
            });
        },

        verifyFacebookLoginCustomer(accessToken) {
            this.customerManager.verifyCustomerViaFacebookLogin(accessToken).catch(reason => {
                // TODO: error reporting
                console.error('Could not save customer', reason);
            });
        },
    },
});
