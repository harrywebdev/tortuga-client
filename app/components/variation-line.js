import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class VariationLineComponent extends Component {
    @service cart;
    @service kitchenState;

    classNames = ['variation-line'];
    classNameBindings = ['countInCart:variation-line--selected'];

    @computed('cart.items.[]', 'variation.id')
    get countInCart() {
        return this.cart.howMuchOf(this.variation.id);
    }

    @not('countInCart') missingInCart;

    @action
    addToCart() {
        this.cart.addToCart(this.variation.id);
    }

    @action
    removeFromCart() {
        this.cart.removeFromCart(this.variation.id);
    }
}
