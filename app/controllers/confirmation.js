import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ConfirmationController extends Controller {
    @service router;
    @service orderState;

    currentTab = 'tabConfirmation';

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
