import Component from '@ember/component';
import { computed } from '@ember/object';

export default class ProductListComponent extends Component {
    classNames = ['product-list'];

    @computed('items.[]', 'category.id')
    get products() {
        return this.items.filter(item => item.category_id === this.category.id);
    }
}
