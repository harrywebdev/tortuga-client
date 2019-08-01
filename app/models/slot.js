import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
    slot: attr('string'),
    datetime: attr('date'),
});
