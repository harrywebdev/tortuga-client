import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrderItemLineComponent extends Component {
    @service cart;

    classNames = ['variation-line'];
    classNameBindings = ['countInCart:list-group-item-success'];

    countInCart = false;

    @action
    removeFromCart() {
        this.cart.removeFromCart(this.orderItem.variationId);
    }

    @action
    addToCart() {
        this.cart.addToCart(this.orderItem.variationId);
    }
}
