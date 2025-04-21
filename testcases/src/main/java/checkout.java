class Checkout {
    public String processCheckout(String cardNumber, String cvv, String expirationDate) {
        if (!cardNumber.matches("\\d{16}")) {
            return "Card Number is incorrect";
        }
        if (!cvv.matches("\\d{3}")) {
            return "CVV is incorrect";
        }
        if (!expirationDate.matches("\\d{2}/\\d{2}")) {
            return "Insert a valid expiration date";
        }

        String[] parts = expirationDate.split("/");
        int month = Integer.parseInt(parts[0]);
        int year = Integer.parseInt(parts[1]);

        if (month < 1 || month > 12 || year < 25) {
            return "Insert a valid expiration date";
        }

        return "Successful Checkout";
    }
}
