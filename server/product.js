//Product Class includes name, price, and quantity with getters for the three variables
class product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getName(){
    return this.name;
  }

  getPrice(){
    return this.price;
  }

  getQuantity(){
    return this.quantity;
  }
}

let productList = [];
//addProduct function takes in string Name, numbers Price and Quantity
function addProduct(Name, Price, Quantity) {
  //Tests if Name is a string, if not then sends a message
  if (typeof Name === 'string' || Name instanceof String) {
    if (Name === "" || Name === " " || Name === null) {
      console.log('Please enter a valid name for your product.');
      return 'Please enter a valid name for your product.';
    }
  }
  else {
    console.log('Please enter a valid name for your product.');
    return 'Please enter a valid name for your product.';
  }
  
  //Tests if Price is a number, if not then sends a message
  if (typeof Price !== "number" || Price < 0 || !Number.isFinite(Price) || Price == null) {
    console.log('Please enter a valid price for your product.');
    return 'Please enter a valid price for your product.';
  }
  
  //Tests if Quantity is a whole number, if not then sends a message
  if (!Number.isInteger(Quantity) || Quantity === null || Quantity < 0) {
    console.log('Please enter a valid quantity for your product.');
    return 'Please enter a valid quantity for your product.';
  }
  
  productList.push(new product(Name, Price, Quantity));
  console.log('Success!');
  return 'Success!';
}

//Searches for products by keyword in the name
function productSearch(keyword) {
  if (keyword === "" || keyword === " " || keyword === null) {
    console.log('Invalid Search Query, Please Try Again');
    return 'Invalid Search Query, Please Try Again';
  }
  
  const results = productList.filter(product => 
    product.getName().toLowerCase().includes(keyword.toLowerCase())
  );

  if (results.length > 0) {
    let message = 'Products found:\n';
    results.forEach(product => {
      const productInfo = `${product.getName()} - $${product.getPrice()}\n`;
      message += productInfo;
      console.log(message);
    });
    return message;
  } else {
    console.log('No products match your search.');
    return 'No products match your search.';
  }
}

//tests if the actual equals the expected
function assertEquals(actual, expected) {
  if (actual === expected) {
    console.log('Passed!');
  } else {
    console.log('Failed!');
  }
}

function runTests() {
    //addProduct Test Cases
    //All 3 variables are valid
    assertEquals(addProduct('Chair', 40, 50), 'Success!');
    //Quantity is a string
    assertEquals(addProduct('Chair', 40, 'fifty'), 'Please enter a valid quantity for your product.');
    //Quantity is negative
    assertEquals(addProduct('Chair', 40, -50), 'Please enter a valid quantity for your product.');
    //Price is a string
    assertEquals(addProduct('Chair', 'Fourty', 50), 'Please enter a valid price for your product.');
    //Price is negative
    assertEquals(addProduct('Chair', -40, 50), 'Please enter a valid price for your product.');
    //Name is a space
    assertEquals(addProduct(' ', 40, 50), 'Please enter a valid name for your product.');
    //Name is null
    assertEquals(addProduct(null, 40, 50), 'Please enter a valid name for your product.');

    
    //searchProduct Test Cases
    //Valid search query
    addProduct("Dog Toy", 10, 30);
    assertEquals(productSearch('Dog Toy'), 'Products found:\nDog Toy - $10\n');
    //Search query does not exist
    assertEquals(productSearch('asdf'), 'No products match your search.');
    //Search for an empty string
    assertEquals(productSearch(''), 'Invalid Search Query, Please Try Again');
}
runTests();

module.exports = { addProduct, productSearch };