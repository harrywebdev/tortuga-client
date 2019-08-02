import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';

export default class MessageComponent extends Component {
    classNames = ['message'];
    classNameBindings = ['contextClass'];

    context = null;
    title = '';
    body = '';

    @computed('body')
    get formattedBody() {
        return htmlSafe(this.body);
    }

    @computed('context')
    get contextClass() {
        return `is-${this.context}`;
    }
}
