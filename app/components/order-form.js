import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
    facebookLogin: service(),
    orderState: service(),
    store: service(),

    classNames: ['order-form'],

    isSubmitting: false,
    isSubmitDisabled: computed('identityVerified', 'isSubmitting', function() {
        return this.isSubmitting || !this.get('identityVerified');
    }),

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
        this.facebookLogin.checkStatus().then(accessToken => {
            this.send('verifyFacebookLoginCustomer', accessToken);
        });
    },

    onSubmit() {
        //
    },

    actions: {
        resetCustomer() {
            this.orderState.resetCustomer();
            this.changeset.set('name', '');
        },

        verifyAccountKitCustomer(registrationType, accountKitCode) {
            const customer = this.store.createRecord('customer', {
                reg_type: registrationType,
                name: this.changeset.get('name'),
                code: accountKitCode,
            });

            customer.save().then(
                customer => {
                    this.orderState.updateCustomer(customer);
                },
                reason => {
                    // TODO: error reporting
                    console.error('Could not save customer', reason);
                }
            );
        },

        verifyFacebookLoginCustomer(accessToken) {
            const customer = this.store.createRecord('customer', {
                reg_type: 'facebook',
                access_token: accessToken,
            });

            customer.save().then(
                customer => {
                    this.orderState.updateCustomer(customer);
                },
                reason => {
                    // TODO: error reporting
                    console.error('Could not save customer', reason);
                }
            );
        },
    },
});
