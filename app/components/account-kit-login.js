import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountKitLoginComponent extends Component {
    @service accountKit;

    classNames = ['account-kit-login'];

    disabled = false;

    onFinish() {
        //
    }

    // TODO: load this from localStorage if there has been previous order
    // TODO: this should get set by locale
    countryCode = '+420';
    mobileNumber = '';
    email = '';

    @action
    smsLogin() {
        this.accountKit.loginViaMobile(this.countryCode, this.mobileNumber).then(
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
    }

    @action
    emailLogin() {
        this.accountKit.loginViaEmail(this.email).then(
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
    }
}
