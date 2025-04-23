class ShoppingCart {
    constructor() {
      this.cart = new Map();
    }
  
    addProduct(product, amount) {
      if (amount <= 0) {
        return "Please enter a valid amount";
      }
  
      if (this.cart.has(product)) {
        return "Product not available";
      }
  
      this.cart.set(product, amount);
      return "Product Added to Cart";
    }
  
    removeProduct(product, amount) {
      if (!this.cart.has(product)) {
        return "Product not in cart";
      }
  
      const currentAmount = this.cart.get(product);
      if (amount <= 0 || amount >= currentAmount) {
        this.cart.delete(product);
        return "Product Removed from cart";
      }
  
      this.cart.set(product, currentAmount - amount);
      return "Product quantity updated";
    }
  
    clearCart() {
      this.cart.clear();
    }
  }
  
  module.exports = ShoppingCart;
  