import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import moment from 'moment';

export default class ConfirmationController extends Controller {
    @service router;
    @service orderState;

    currentTab = 'tabConfirmation';

    @computed('orderState.order_time')
    get orderTimeFormatted() {
        return moment(this.orderState.order_time).format('HH:mm');
    }

    @action
    reset() {
        this.orderState.resetOrder();
        this.router.transitionTo('index');
    }

    @action
    doNothing() {
        //
    }
}
