import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IndexController extends Controller {
    @service cart;
    @service kitchenState;
    @service metrics;
    @service orderState;
    @service slots;

    currentTab = 'tabMenu';

    _scrollToTop() {
        document.getElementById('header').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }

    @action
    selectTab(tab) {
        if (this.currentTab !== tab) {
            this.set('currentTab', tab);
            this._scrollToTop();

            switch (tab) {
                case 'tabMenu':
                    this.metrics.trackPage({ page: '/', title: 'index' });
                    break;
                case 'tabOrder':
                    this.metrics.trackPage({ page: '/objednat', title: 'order' });
                    break;
            }
        }
    }
}
