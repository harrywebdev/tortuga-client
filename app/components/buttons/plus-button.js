import Component from '@ember/component';

export default class PlusButtonComponent extends Component {
    tagName = 'button';
    classNames = ['plus-button'];

    click() {
        this.onClick();
    }
}
