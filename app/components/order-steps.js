import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class OrderStepsComponent extends Component {
    @service kitchenState;
    @service orderState;

    classNames = ['order-steps'];

    @computed('orderState.orderHasBeenMade')
    get isMenuEnabled() {
        return !this.orderState.orderHasBeenMade;
    }

    @computed('kitchenState.isOpen', 'orderState.isReadyForCustomerDetails')
    get isOrderEnabled() {
        return this.kitchenState.isOpen && this.orderState.isReadyForCustomerDetails;
    }
}
