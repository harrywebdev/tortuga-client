import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    products: computed('items.[]', 'category.id', function() {
        return this.get('items').filter(item => {
            return item['category-id'] === this.get('category.id');
        });
    }),
});
