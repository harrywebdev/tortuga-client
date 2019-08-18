export default class OrderAttemptedEvent {
    constructor(value = 0) {
        this.category = 'order';
        this.action = 'purchase_attempt';
        this.label = '';
        this.value = parseInt(value, 10);
    }
}
