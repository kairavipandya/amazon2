class Checkout {
    processCheckout(cardNumber, cvv, expirationDate) {
      if (!/^\d{16}$/.test(cardNumber)) {
        return "Card Number is incorrect";
      }
  
      if (!/^\d{3}$/.test(cvv)) {
        return "CVV is incorrect";
      }
  
      if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
        return "Insert a valid expiration date";
      }
  
      const [month, year] = expirationDate.split("/").map(Number);
  
      if (month < 1 || month > 12 || year < 25) {
        return "Insert a valid expiration date";
      }
  
      return "Successful Checkout";
    }
  }
  
  module.exports = Checkout;
  