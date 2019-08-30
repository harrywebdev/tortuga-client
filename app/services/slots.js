import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class SlotsService extends Service {
    @service flashMessages;
    @service kitchenState;
    @service store;

    slots = [];

    setSlots(slots) {
        this.set('slots', slots);
    }

    reloadSlots() {
        this.store.unloadAll('slot');

        this.store.findAll('slot', { reload: true }).then(
            slots => {
                this.setSlots(slots);

                if (!slots.length) {
                    this._noSlotsErrorHandling();
                }
            },
            () => {
                this._noSlotsErrorHandling();
            }
        );
    }

    findSlot(slotId) {
        const foundSlots = this.slots.filter(slot => slot.id === slotId);

        return foundSlots.length ? foundSlots[0] : null;
    }

    _noSlotsErrorHandling() {
        this.flashMessages.danger(
            `Zdá se, že teď nepřijímáme objednávky. Buď máme zavřeno, anebo plné ruce práce. Zkuste to později anebo se u nás zastavte osobně a objednejte si jako za starých časů.`
        );
        this.kitchenState.closeShop();
    }
}
