import DS from 'ember-data';

export default DS.Model.extend({
    product: DS.belongsTo('product'),

    title: DS.attr('string'),
    slug: DS.attr('string'),
    description: DS.attr('string'),
    price: DS.attr('string'),

    count: DS.attr('number', { defaultValue: 0 }),
});
