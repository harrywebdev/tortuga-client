import DS from 'ember-data';
const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
    items: hasMany('order-item'),
    customer: belongsTo('customer'),

    delivery_type: attr('string'),
    payment_type: attr('string'),
    pickup_time: attr('string'),

    status: attr('string'),
    subtotal_amount: attr('number'),
    delivery_amount: attr('number'),
    extra_amount: attr('number'),
    total_amount: attr('number'),
    currency: attr('string'),

    created_at: attr('date'),
    updated_at: attr('date'),
});
