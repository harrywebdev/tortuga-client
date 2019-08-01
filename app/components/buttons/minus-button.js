import Component from '@ember/component';

export default class MinusButtonComponent extends Component {
    tagName = 'button';
    classNames = ['minus-button'];

    click() {
        this.onClick();
    }
}
