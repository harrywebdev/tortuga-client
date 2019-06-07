import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class FormInputComponent extends Component {
    classNames = ['form-group', 'row'];

    placeholder = '';
    label = '';
    type = 'text';
    @alias('type') inputType;
    disabled = false;

    @computed('name', 'changeset.change', 'hasError')
    get isValid() {
        return this.get(`changeset.change.${this.get('name')}`) && !this.get('hasError');
    }

    @computed('name', 'changeset.error')
    get hasError() {
        return this.get(`changeset.error.${this.get('name')}.value`);
    }

    @computed('name', 'changeset.error')
    get errorMessage() {
        return this.get(`changeset.error.${this.get('name')}.validation`);
    }
}
