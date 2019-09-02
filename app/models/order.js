import DS from 'ember-data';
const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
    items: hasMany('order-item'),
    customer: belongsTo('customer'),

    hash_id: attr('string'),

    delivery_type: attr('string'),
    payment_type: attr('string'),
    order_time: attr('date'),
    is_takeaway: attr('boolean'),

    status: attr('string'),
    subtotal_amount: attr('number'),
    delivery_amount: attr('number'),
    extra_amount: attr('number'),
    total_amount: attr('number'),
    currency: attr('string'),

    created_at: attr('date'),
    updated_at: attr('date'),
});
