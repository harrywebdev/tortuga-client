import Service from '@ember/service';

export default class ProductsService extends Service {
    constructor() {
        super(...arguments);
        this.products = [];
    }

    setProducts(products) {
        this.products = products;
    }
}
