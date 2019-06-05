import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
    classNames: ['form-group', 'row'],

    placeholder: '',
    label: '',
    type: 'text',
    inputType: alias('type'),
    disabled: false,

    isValid: computed('name', 'changeset.change', function() {
        return this.get(`changeset.change.${this.get('name')}`);
    }),

    hasError: computed('name', 'changeset.error', function() {
        return this.get(`changeset.error.${this.get('name')}.value`);
    }),

    errorMessage: computed('name', 'changeset.error', function() {
        return this.get(`changeset.error.${this.get('name')}.validation`);
    }),
});
