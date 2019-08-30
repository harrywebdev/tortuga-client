import DS from 'ember-data';
import { computed } from '@ember/object';
import moment from 'moment';
const { Model, attr } = DS;

export default Model.extend({
    slot: attr('date'),

    title: computed('slot', function() {
        return moment(this.get('slot')).format('HH:mm');
    }),
});
