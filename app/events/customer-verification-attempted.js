export default class CustomerVerificationAttemptedEvent {
    constructor(method = '') {
        this.category = 'customer';
        this.action = 'verification_attempt';
        this.label = method;
        this.value = 0;
    }
}
