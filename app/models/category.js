import DS from 'ember-data';

export default DS.Model.extend({
    sequence: DS.attr('number'),
    title: DS.attr('string'),
    slug: DS.attr('string'),
});
