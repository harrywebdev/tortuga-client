export default class OrderCreatedEvent {
    constructor(value = 0) {
        this.category = 'order';
        this.action = 'purchase_success';
        this.label = '';
        this.value = parseInt(value, 10);
    }
}
