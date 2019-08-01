import Service from '@ember/service';
import { not } from '@ember/object/computed';

export default class KitchenStateService extends Service {
    isOpen = true;

    @not('isOpen') isClosed;

    closeShop() {
        this.set('isOpen', false);
    }

    openShop() {
        this.set('isOpen', true);
    }
}
