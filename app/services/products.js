import Service from '@ember/service';

export default Service.extend({
    init() {
        this._super(...arguments);
        this.products = [];
    },

    setProducts(products) {
        this.set('products', products);
    },
});
