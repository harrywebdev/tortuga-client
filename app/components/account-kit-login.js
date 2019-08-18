import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import CustomerVerificationAttemptedEvent from 'tortuga-frontend/events/customer-verification-attempted';

export default class AccountKitLoginComponent extends Component {
    @service accountKit;
    @service appLogger;
    @service appLogger;

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
        this.appLogger.reportToAnalytics(new CustomerVerificationAttemptedEvent('mobile'));

        this.accountKit.loginViaMobile(this.countryCode, this.mobileNumber).then(
            code => {
                this.onFinish('mobile', code);
            },
            reason => {
                this.appLogger.error(new Error(`AccountKit SMS login error: ${reason}`), true);
                return;
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
                this.appLogger.error(new Error(`AccountKit email login error: ${reason}`), true);
                return;
            }
        );
    }
}
