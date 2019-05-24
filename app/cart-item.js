class CartItem {
    constructor(productVariationId, quantity) {
        this.productVariationId = '' + productVariationId;
        this.quantity = parseInt(quantity, 10);

        Object.freeze(this);
    }
}

export default CartItem;
