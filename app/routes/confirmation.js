import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ConfirmationRoute extends Route {
    @service orderState;

    beforeModel() {
        super.beforeModel();

        if (!this.orderState.orderHasBeenMade) {
            return this.transitionTo('index');
        }
    }
}
