import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
    orderState: service(),

    classNames: ['order-form'],

    isSubmitting: false,
    isSubmitDisabled: computed('changeset.isInvalid', 'isSubmitting', function() {
        return this.isSubmitting || this.changeset.get('isInvalid');
    }),

    orderItems: computed('orderState.orderItems', function() {
        return this.orderState.get('orderItems');
    }),

    inputChangeset: alias('changeset'),

    didInsertElement() {
        this._super(...arguments);
        this.changeset.validate();
    },

    onSubmit() {
        //
    },
});
