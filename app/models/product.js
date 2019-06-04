import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default Model.extend({
    variations: hasMany('variation'),

    category_id: attr('string'),
    title: attr('string'),
    slug: attr('string'),
    description: attr('string'),

    created_at: attr('date'),
    updated_at: attr('date'),
});
