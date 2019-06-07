import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class VariationLineComponent extends Component {
    @service cart;

    tagName = 'li';

    classNames = ['list-group-item', 'variation-line'];
    classNameBindings = ['countInCart:variation-line--selected'];

    @computed('cart.items.[]', 'variation.id')
    get countInCart() {
        return this.cart.howMuchOf(this.get('variation.id'));
    }

    @action
    addToCart() {
        this.cart.addToCart(this.get('variation.id'));
    }

    @action
    removeFromCart() {
        this.cart.removeFromCart(this.get('variation.id'));
    }
}
