/* global AccountKit */
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Promise as EmberPromise } from 'rsvp';
import config from 'tortuga-frontend/config/environment';

export default class AccountKitService extends Service {
    @service appLogger;
    @service jsLoader;
    @service orderState;
    @service store;

    constructor() {
        super(...arguments);

        this.state =
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15);

        // first set up the hook
        window.AccountKit_OnInteractive = () => {
            AccountKit.init({
                appId: config.accountKit.appId,
                version: config.accountKit.version,
                redirect: config.accountKit.redirectUrl,
                debug: config.accountKit.debug,
                state: this.state,
                fbAppEventsEnabled: true,
            });
        };

        // then load the SDK
        this.jsLoader
            .load({
                src: 'https://sdk.accountkit.com/cs_CZ/sdk.js',
                crossorigin: 'anonymous',
            })
            .catch(error => {
                this.appLogger.error(error, true);
            });
    }

    /**
     * AccountKit login via mobile number
     * @param {string} countryCode with plus sign, e.g. +420
     * @param {string} mobileNumber national number, e.g. 731222333
     */
    loginViaMobile(countryCode, mobileNumber) {
        return this._login('PHONE', {
            countryCode: countryCode,
            phoneNumber: mobileNumber,
        });
    }

    /**
     * AccountKit login via email
     * @param {string} email
     */
    loginViaEmail(email) {
        return this._login('EMAIL', { emailAddress: email });
    }

    /**
     * AccountKit login, for details see
     * https://developers.facebook.com/docs/accountkit/webjs/reference/
     * @param {string} method PHONE|EMAIL
     * @param {object} data
     */
    _login(method, data) {
        return new EmberPromise((resolve, reject) => {
            AccountKit.login(method, data, response => {
                if (response.status !== 'PARTIALLY_AUTHENTICATED') {
                    return reject(response.status);
                }

                if (response.state !== this.state) {
                    return reject('Invalid request state.');
                }

                resolve(response.code);
            });
        });
    }
}
