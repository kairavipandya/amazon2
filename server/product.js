const mongoose = require('mongoose');

// Schema definition
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Model
const ProductModel = mongoose.model('Product', productSchema);

// Add a product with validation
async function addProduct(name, price, quantity) {
  if (typeof name !== 'string' || !name.trim()) {
    return 'Please enter a valid name for your product.';
  }
  if (typeof price !== 'number' || price < 0 || !Number.isFinite(price)) {
    return 'Please enter a valid price for your product.';
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    return 'Please enter a valid quantity for your product.';
  }

  try {
    const newProduct = new ProductModel({ name, price, quantity });
    await newProduct.save();
    return 'Success!';
  } catch (err) {
    console.error('Error saving product:', err);
    return 'Failed to save product.';
  }
}

// Search for products by keyword
async function productSearch(keyword) {
  if (!keyword || !keyword.trim()) {
    return 'Invalid Search Query, Please Try Again';
  }

  try {
    const results = await ProductModel.find({
      name: { $regex: keyword, $options: 'i' },
    });

    if (results.length > 0) {
      let message = 'Products found:\n';
      results.forEach((product) => {
        message += `${product.name} - $${product.price}\n`;
      });
      return message;
    } else {
      return 'No products match your search.';
    }
  } catch (err) {
    console.error('Search error:', err);
    return 'Failed to perform search.';
  }
}

module.exports = { addProduct, productSearch };
