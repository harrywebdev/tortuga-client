import DS from 'ember-data';

export default DS.Model.extend({
    variations: DS.hasMany('variation'),

    'category-id': DS.attr('string'),
    title: DS.attr('string'),
    slug: DS.attr('string'),
    description: DS.attr('string'),
});
