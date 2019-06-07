import Component from '@ember/component';
import { computed } from '@ember/object';

export default class ProductListComponent extends Component {
    @computed('items.[]', 'category.id')
    get products() {
        return this.items.filter(item => item.category_id === this.get('category.id'));
    }
}
