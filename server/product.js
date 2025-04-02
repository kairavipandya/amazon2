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
      console.log("Please enter a valid name for your product.");
      return;
    }
  }
  else {
    console.log("Please enter a valid name for your product.");
    return;
  }
  
  //Tests if Price is a number, if not then sends a message
  if (typeof Price !== "number" || Price < 0 || !Number.isFinite(Price) || Price == null) {
    console.log("Please enter a valid price for your product.");
    return;
  }
  
  //Tests if Quantity is a whole number, if not then sends a message
  if (!Number.isInteger(Quantity) || Quantity === null) {
    console.log("Please enter a valid quantity for your product.");
    return;
  }
  
  productList.push(new product(Name, Price, Quantity));
  console.log("Success!");
}

//Searches for products by keyword in the name
function productSearch(keyword) {
  if (keyword === "" || keyword === " " || keyword === null) {
      console.log("Please enter a valid keyword.");
      return;
  }
  const results = productList.filter(product => 
    product.getName().toLowerCase().includes(keyword.toLowerCase())
  );

  if (results.length > 0) {
    console.log('Products found:');
    results.forEach(product => {
      console.log(`${product.getName()} - $${product.getPrice()}`);
    });
  } else {
    console.log('No products match your search.');
  }
}
