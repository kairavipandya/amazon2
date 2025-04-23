const BrowsingAndCategorization = require('./BrowsingAndCategorization');

let browser;

beforeEach(() => {
  browser = new BrowsingAndCategorization();
});

afterEach(() => {
  browser = null;
});

test('clicking keyboard product', () => {
  expect(browser.clickProduct("Keyboard")).toBe("Keyboard - Product Information Displayed");
});

test('clicking out of stock mouse', () => {
  expect(browser.clickProduct("Mouse")).toBe("Mouse - Sorry this item is out of stock.");
});

test('clicking technology category', () => {
  expect(browser.clickCategory("Technology")).toBe("Products in Technology: Keyboard Mouse");
});

test('entering the website', () => {
  expect(browser.enterWebsite()).toBe("Product browsing page displayed");
});
