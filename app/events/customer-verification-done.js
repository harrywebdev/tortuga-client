export default class CustomerVerificationDoneEvent {
    constructor(method = '') {
        this.category = 'customer';
        this.action = 'verification_done';
        this.label = method;
        this.value = 0;
    }
}
