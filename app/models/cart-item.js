class CartItem {
    constructor(productVariationId, quantity = 1, sequence = 1) {
        this.productVariationId = '' + productVariationId;
        this.quantity = parseInt(quantity, 10);
        this.sequence = parseInt(sequence, 10);

        Object.freeze(this);
    }
}

export default CartItem;
