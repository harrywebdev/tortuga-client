export default class CustomerVerificationDiscardedEvent {
    constructor(method = '') {
        this.category = 'customer';
        this.action = 'verification_discarded';
        this.label = method;
        this.value = 0;
    }
}
