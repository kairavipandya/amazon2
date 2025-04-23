class Product {
  constructor(name, inStock, category) {
    this.name = name;
    this.inStock = inStock;
    this.category = category;
  }
}

class BrowsingAndCategorization {
  constructor() {
    this.productCatalog = new Map();
    this.productCatalog.set("Keyboard", new Product("Keyboard", true, "Technology"));
    this.productCatalog.set("Mouse", new Product("Mouse", false, "Technology"));
    this.productCatalog.set("Shoes", new Product("Shoes", true, "Fashion"));
  }

  clickProduct(productName) {
    const product = this.productCatalog.get(productName);
    if (!product) return "Product not found";
    if (!product.inStock) return `${product.name} - Sorry this item is out of stock.`;
    return `${product.name} - Product Information Displayed`;
  }

  clickCategory(category) {
    const products = [];
    for (const product of this.productCatalog.values()) {
      if (product.category === category) {
        products.push(product.name);
      }
    }
    return `Products in ${category}: ${products.join(" ")}`;
  }

  enterWebsite() {
    return "Product browsing page displayed";
  }
}

module.exports = BrowsingAndCategorization;
