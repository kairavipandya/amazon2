const ShoppingCart = require('./ShoppingCart');

let cart;

beforeEach(() => {
  cart = new ShoppingCart();
});

afterEach(() => {
  cart = null;
});

test('Add product with valid amount', () => {
  const result = cart.addProduct("Apple", 1);
  expect(result).toBe("Product Added to Cart");
});

test('Add product with invalid amount', () => {
  const result = cart.addProduct("Banana", -1);
  expect(result).toBe("Please enter a valid amount");
});

test('Add duplicate product', () => {
  cart.addProduct("Orange", 1);
  const result = cart.addProduct("Orange", 1);
  expect(result).toBe("Product not available");
});

test('Remove product with full quantity', () => {
  cart.addProduct("Grapes", 1);
  const result = cart.removeProduct("Grapes", 1);
  expect(result).toBe("Product Removed from cart");
});

test('Remove product with zero quantity', () => {
  cart.addProduct("Mango", 1);
  const result = cart.removeProduct("Mango", 0);
  expect(result).toBe("Product Removed from cart");
});
