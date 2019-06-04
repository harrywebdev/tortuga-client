import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
    order: belongsTo('order'),

    title: attr('string'),
    price: attr('number'),
    quantity: attr('number'),
    total_price: attr('number'),
    currency: attr('string'),

    created_at: attr('date'),
    updated_at: attr('date'),
});
