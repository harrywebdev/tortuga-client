import Service from '@ember/service';

export default class ProductsService extends Service {
    products = [];

    setProducts(products) {
        this.set('products', products);
    }
}
