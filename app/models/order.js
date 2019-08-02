import DS from 'ember-data';
import { computed } from '@ember/object';
import moment from 'moment';
const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
    items: hasMany('order-item'),
    customer: belongsTo('customer'),

    delivery_type: attr('string'),
    payment_type: attr('string'),
    order_time: attr('string'),
    is_takeaway: attr('boolean'),

    status: attr('string'),
    subtotal_amount: attr('number'),
    delivery_amount: attr('number'),
    extra_amount: attr('number'),
    total_amount: attr('number'),
    currency: attr('string'),

    created_at: attr('date'),
    updated_at: attr('date'),

    orderTimeFormatted: computed('order_time', function() {
        return moment(this.order_time).format('HH:mm');
    }),
});
