import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ShoppingCartTest {
    private ShoppingCart cart;

    @BeforeEach
    void setUp() {
        cart = new ShoppingCart();
    }

    @AfterEach
    void tearDown() {
        cart = null;
    }

    @Test
    void testAddProductValid() {
        String result = cart.addProduct("Apple", 1);
        assertEquals("Product Added to Cart", result);  // Test case 1
    }

    @Test
    void testAddInvalidAmount() {
        String result = cart.addProduct("Banana", -1);
        assertEquals("Please enter a valid amount", result);  // Test case 2
    }

    @Test
    void testAddDuplicateProduct() {
        cart.addProduct("Orange", 1);
        String result = cart.addProduct("Orange", 1);
        assertEquals("Product not available", result);  // Test case 3
    }

    @Test
    void testRemoveProductValid() {
        cart.addProduct("Grapes", 1);
        String result = cart.removeProduct("Grapes", 1);
        assertEquals("Product Removed from cart", result);  // Test case 4
    }

    @Test
    void testRemoveProductWithZero() {
        cart.addProduct("Mango", 1);
        String result = cart.removeProduct("Mango", 0);
        assertEquals("Product Removed from cart", result);  // Test case 5
    }
}
