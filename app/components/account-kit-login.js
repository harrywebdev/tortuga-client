import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    accountKit: service(),

    classNames: ['account-kit-login'],

    disabled: false,

    onFinish() {
        //
    },

    // TODO: load this from localStorage if there has been previous order
    // TODO: this should get set by locale
    countryCode: '+420',
    mobileNumber: '',
    email: '',

    actions: {
        smsLogin() {
            this.accountKit.loginViaMobile(this.get('countryCode'), this.get('mobileNumber')).then(
                code => {
                    this.onFinish('mobile', code);
                },
                reason => {
                    if (reason === 'BAD_PARAMS') {
                        // TODO: error reporting
                        return console.error('AccountKit SMS login error.');
                    }

                    // nothing to do here
                }
            );
        },

        emailLogin() {
            this.accountKit.loginViaEmail(this.get('email')).then(
                code => {
                    this.onFinish('email', code);
                },
                reason => {
                    if (reason === 'BAD_PARAMS') {
                        // TODO: error reporting
                        return console.error('AccountKit email login error.');
                    }

                    // nothing to do here
                }
            );
        },
    },
});
