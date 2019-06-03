/* global FB */
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Promise as EmberPromise } from 'rsvp';
import config from 'tortuga-frontend/config/environment';

export default class FacebookLoginService extends Service {
    constructor() {
        super(...arguments);

        window.fbAsyncInit = function() {
            FB.init({
                appId: config.facebookLogin.appId,
                version: config.facebookLogin.version,
                cookie: true,
                xfbml: true,
            });

            FB.AppEvents.logPageView();
        };
    }

    checkStatus() {
        return new EmberPromise((resolve, reject) => {
            FB.getLoginStatus(response => {
                if (response.status !== 'connected') {
                    return;
                }

                resolve(response.authResponse.accessToken);
            });
        });
    }

    login() {
        return new EmberPromise((resolve, reject) => {
            FB.login(
                response => {
                    if (!response.authResponse) {
                        return reject('User cancelled login or did not fully authorize.');
                    }

                    resolve(response.authResponse.accessToken);
                },
                { scope: 'email' }
            );
        });
    }
}
