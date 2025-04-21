import java.util.HashMap;
import java.util.Map;

public class ShoppingCart {
    private Map<String, Integer> cart;

    public ShoppingCart() {
        cart = new HashMap<>();
    }

    public String addProduct(String product, int amount) {
        if (amount <= 0) {
            return "Please enter a valid amount";
        }

        if (cart.containsKey(product)) {
            return "Product not available";
        }

        cart.put(product, amount);
        return "Product Added to Cart";
    }

    public String removeProduct(String product, int amount) {
        if (!cart.containsKey(product)) {
            return "Product not in cart";
        }

        if (amount <= 0 || amount >= cart.get(product)) {
            cart.remove(product);
            return "Product Removed from cart";
        } else {
            cart.put(product, cart.get(product) - amount);
            return "Product quantity updated";
        }
    }

    public void clearCart() {
        cart.clear();
    }
}
