import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    orderState: service(),

    classNames: ['order-form'],

    name: null,
    email: null,
    mobile: '',
    pickup_time: null,

    orderItems: computed('orderState.orderItems', function() {
        return this.orderState.get('orderItems');
    }),

    onSubmit() {
        //
    },
});
