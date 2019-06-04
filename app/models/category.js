import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
    sequence: attr('number'),
    title: attr('string'),
    slug: attr('string'),

    created_at: attr('date'),
    updated_at: attr('date'),
});
