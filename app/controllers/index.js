import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IndexController extends Controller {
    @service cart;
    @service kitchenState;
    @service orderState;
    @service slots;

    currentTab = 'tabMenu';

    _scrollToTop() {
        document.getElementById('header').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }

    @action
    selectTab(tab) {
        this.set('currentTab', tab);
        this._scrollToTop();
    }
}
