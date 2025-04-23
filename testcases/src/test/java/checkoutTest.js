const Checkout = require('./Checkout');

let checkout;

beforeEach(() => {
  checkout = new Checkout();
});

afterEach(() => {
  checkout = null;
});

test('Successful checkout', () => {
  const result = checkout.processCheckout("1234567891234567", "123", "08/30");
  expect(result).toBe("Successful Checkout");
});

test('Invalid card number', () => {
  const result = checkout.processCheckout("1234-5678-9123-4567", "123", "08/30");
  expect(result).toBe("Card Number is incorrect");
});

test('Invalid CVV', () => {
  const result = checkout.processCheckout("1234567891234567", "1234", "08/30");
  expect(result).toBe("CVV is incorrect");
});

test('Invalid expiration date', () => {
  const result = checkout.processCheckout("1234567891234567", "123", "07/24");
  expect(result).toBe("Insert a valid expiration date");
});
