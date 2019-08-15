/* global FB */
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Promise as EmberPromise } from 'rsvp';

export default class FacebookLoginService extends Service {
    @service customerManager;

    constructor() {
        super(...arguments);

        // HACK: not used
        return;
        // window.fbAsyncInit = () => {
        //     FB.init({
        //         appId: config.facebookLogin.appId,
        //         version: config.facebookLogin.version,
        //         cookie: true,
        //         xfbml: true,
        //     });

        //     FB.AppEvents.logPageView();

        //     // instantly load customer if it exists
        //     this.checkStatus().then(accessToken => {
        //         this.customerManager.verifyCustomerViaFacebookLogin(accessToken).catch(reason => {
        //             // TODO: error reporting
        //             console.error('verifyCustomerViaFacebookLogin error', reason);
        //         });
        //     });
        // };
    }

    /**
     * Check whether user is logged in and resolve with accessToken if they are "connected"
     * @returns {Promise}
     */
    checkStatus() {
        return new EmberPromise(resolve => {
            FB.getLoginStatus(response => {
                if (response.status !== 'connected') {
                    return;
                }

                resolve(response.authResponse.accessToken);
            });
        });
    }

    /**
     * Log user in and resolve with accessToken or reject with a reason
     * @returns {Promise}
     */
    login() {
        return new EmberPromise((resolve, reject) => {
            FB.login(
                response => {
                    if (!response.authResponse) {
                        return reject('User cancelled login or did not fully authorize.');
                    }

                    resolve(response.authResponse.accessToken);
                },
                { scope: 'email,user_link', auth_type: 'rerequest' }
            );
        });
    }

    /**
     * Log user out
     * @returns {void}
     */
    logout() {
        FB.logout();
    }
}
