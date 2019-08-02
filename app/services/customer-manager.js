import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Promise as EmberPromise } from 'rsvp';
import { storageFor } from 'ember-local-storage';

export default class CustomerManagerService extends Service {
    @storageFor('current-customer') currentCustomer;

    @service facebookLogin;
    @service orderState;
    @service store;

    /**
     *
     * @param {string} registrationType email|mobile
     * @param {string} accountKitCode Facebook Account Kit code
     * @param {string} customerName
     * @returns {Promise}
     */
    verifyCustomerViaAccountKit(registrationType, accountKitCode, customerName) {
        return new EmberPromise((resolve, reject) => {
            const customer = this.store.createRecord('customer', {
                reg_type: registrationType,
                code: accountKitCode,
                name: customerName,
            });

            customer.save().then(
                customer => {
                    this.orderState.updateCustomer(customer);

                    // save to localStorage for next time
                    // TODO: based on RememberMe flag
                    this.currentCustomer.set('data', {
                        account_id: customer.account_kit_id,
                        reg_type: customer.reg_type,
                        name: customer.name,
                    });

                    resolve(customer);
                },
                reason => {
                    reject(reason);
                }
            );
        });
    }

    /**
     *
     * @param {string} accessToken Facebook Login access token
     * @returns {Promise}
     */
    verifyCustomerViaFacebookLogin(accessToken) {
        return new EmberPromise((resolve, reject) => {
            const customer = this.store.createRecord('customer', {
                reg_type: 'facebook',
                code: accessToken,
            });

            customer.save().then(
                customer => {
                    this.orderState.updateCustomer(customer);
                    resolve(customer);
                },
                reason => {
                    reject(reason);
                }
            );
        });
    }

    /**
     * @returns {Promise}
     */
    resetCustomer() {
        return new EmberPromise(resolve => {
            const customer = this.orderState.customer;

            if (customer) {
                if (customer.isFacebookLoginCustomer) {
                    // log in out of facebook login
                    this.facebookLogin.logout();
                }

                // unload record from store to prevent store error when creating
                // new record (while returning existing record) has the same id
                this.store.unloadRecord(customer);
            }

            this.orderState.resetCustomer();

            resolve();
        });
    }
}
